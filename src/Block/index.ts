import { EventBus } from '@/EventBus';
import Shaft from '@/Templater/Shaft';
import { v4 as uniqueKey } from 'uuid';

interface Meta<Props> {
	props: Props & { events?: BlockEvents };
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
	protected children: Record<string, Block<object>>;

	constructor(rawProps: Meta<Props>['props'] = {} as Props) {
		const eventBus = new EventBus();

		const { children, props } = this.getChildren(rawProps);

		this.children = children;

		this.meta = {
			props,
		};

		this.id = uniqueKey();

		this.props = this.makePropsProxy({ ...props, __id: this.id });
		this.eventBus = () => eventBus;

		this.registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	protected getChildren(propsAndChildren: Meta<Props>['props']) {
		const children: Record<string, Block<object>> = {};
		const props = {} as Meta<Props>['props'];

		Object.entries(propsAndChildren).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { children, props };
	}

	private registerEvents(eventBus: EventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
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

	protected addEvents() {
		const { events = {} } = this.props;

		Object.keys(events).forEach((eventName) => {
			const eventHandler = events[eventName as keyof typeof events];

			// TODO Костыль
			if (eventHandler && eventName !== 'blur') {
				this.element?.addEventListener(
					eventName,
					eventHandler as EventListenerOrEventListenerObject,
				);
			} else if (eventHandler && eventName === 'blur') {
				this.element?.addEventListener(
					eventName,
					eventHandler as EventListenerOrEventListenerObject,
					true,
				);
			}
		});
	}

	protected removeEvents() {
		const { events = {} } = this.props;

		Object.keys(events).forEach((eventName) => {
			const eventHandler = events[eventName as keyof typeof events];
			this.element?.removeEventListener(
				eventName,
				eventHandler as EventListenerOrEventListenerObject,
			);
		});
	}

	protected _componentDidMount() {
		this.componentDidMount();

		Object.values(this.children).forEach((child) => {
			child.dispatchComponentDidMount();
		});
	}

	componentDidMount() {}

	private _componentDidUpdate(newProps?: Meta<Props>['props']) {
		this.componentDidUpdate(newProps);

		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	componentDidUpdate(newProps?: Meta<Props>['props']) {
		return true;
	}

	dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	setProps = (nextProps: Partial<Meta<Props>['props']>) => {
		if (!nextProps) {
			return;
		}
		Object.assign(this.props, nextProps);
	};

	compile(template: string, props: Meta<Props>['props']) {
		const propsAndStubs = { ...props };

		Object.entries(this.children).forEach(([key, child]) => {
			propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
		});

		const fragment = document.createElement('template');

		fragment.innerHTML = Shaft.compile(template, propsAndStubs);

		const newElement = fragment.content.firstElementChild!;

		Object.values(this.children).forEach((child) => {
			const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
			const getElement = child.getContent();
			if (getElement) {
				stub?.replaceWith(getElement);
			} else {
				throw new Error('Cannot create child element');
			}
		});

		this.element?.replaceWith(newElement);
		this.element = newElement;
		this.addEvents();

		return newElement;
	}

	protected _render() {
		this.render();
	}

	render() {}

	protected init() {
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	getContent() {
		return this.element;
	}
}
