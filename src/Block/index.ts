import { EventBus } from '@/EventBus';
import Shaft from '@/Templater/Shaft';
import { v4 as uniqueKey } from 'uuid';

interface Meta<Props> {
	tagName: keyof HTMLElementTagNameMap;
	props: Props;
}

export type BlockEvents = Partial<{
	[key in keyof GlobalEventHandlersEventMap]: (
		event: GlobalEventHandlersEventMap[key],
	) => void;
}>;

export abstract class Block<Props extends object & { events?: BlockEvents }> {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};
	protected id: string | null = null;
	protected element: HTMLElement | Element | null = null;
	protected meta: Meta<Props> | null = null;
	protected props: Meta<Props>['props'];
	protected eventBus: () => EventBus;
	//TODO remove any
	protected children: Record<string, any>;

	constructor(
		tagName: Meta<Props>['tagName'] = 'div',
		rawProps: Meta<Props>['props'] = {} as Props,
	) {
		const eventBus = new EventBus();

		const { children, props } = this.getChildren(rawProps);

		this.children = children;

		this.meta = {
			tagName,
			props,
		};

		this.id = uniqueKey();

		this.props = this.makePropsProxy({ ...props, __id: this.id });
		this.eventBus = () => eventBus;

		this.registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	protected getChildren(propsAndChildren: Meta<Props>['props']) {
		//TODO REPLACE any
		const children: Record<string, any> = {};
		const props: Props = {} as Props;

		Object.entries(propsAndChildren).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { children, props };
	}

	// TODO: create fragment like <></>
	compile(template: string, props: Meta<Props>['props']) {
		const propsAndStubs = { ...props };

		Object.entries(this.children).forEach(([key, child]) => {
			propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
		});

		const fragment = this.createDocumentElement(
			'template',
		) as HTMLTemplateElement;

		fragment.innerHTML = Shaft.compile(template, propsAndStubs);

		Object.values(this.children).forEach((child) => {
			const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
			stub?.replaceWith(child.getContent());
		});

		this.element = fragment.content.firstElementChild;
		this.addEvents();

		return fragment.content;
	}

	private registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this.render.bind(this));
		// eventBus.on(Block.EVENTS.FLOW_CDM, this.componentDidMount.bind(this));
		// eventBus.on(Block.EVENTS.FLOW_CDU, this.componentDidUpdate.bind(this));
	}

	private makePropsProxy(props: Meta<Props>['props']) {
		const self = this;

		return new Proxy(props, {
			get(target, prop) {
				const value = target[prop as keyof Props];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target, prop, value) {
				target[prop as keyof Props] = value;

				self.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target }, target);
				return true;
			},
			deleteProperty() {
				throw new Error('Нет доступа');
			},
		});
	}

	private createDocumentElement(tagName: Meta<Props>['tagName']) {
		return document.createElement(tagName);
	}

	private createResources() {
		if (this.meta) {
			const { tagName } = this.meta;
			this.element = this.createDocumentElement(tagName);
		} else {
			throw new Error('Problem with execution meta');
		}
	}

	protected addEvents() {
		const { events = {} } = this.props;
		Object.keys(events).forEach((eventName) => {
			this.element?.addEventListener(eventName, events[eventName]);
		});
	}

	protected createKey() {}

	render() {}

	protected init() {
		this.createResources();
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	getContent() {
		return this.element;
	}
}
