import { v4 as uniqueKey } from 'uuid';
import { EventBus } from '@/core/EventBus';
import Shaft from '../Templater';

export type TypeOfProps = Record<string, unknown>;
interface Meta<Props extends TypeOfProps> {
  props: Props & { events?: BlockEvents };
}

export type BlockEvents = Partial<{
  [key in keyof GlobalEventHandlersEventMap]: (
    event: GlobalEventHandlersEventMap[key],
  ) => void;
}>;

export abstract class Block<
  Props extends TypeOfProps & { events?: BlockEvents },
> {
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
  public children: Record<string, Block<TypeOfProps> | Block<TypeOfProps>[]>;

  constructor(rawProps: Meta<Props>['props'] = {} as Props) {
    const eventBus = new EventBus();

    const { children, props } = this.getChildrenAndProps(rawProps);

    this.children = this.makePropsProxy(children);

    this.meta = {
      props,
    };

    this.id = uniqueKey();

    this.props = this.makePropsProxy({ ...props, __id: this.id });
    this.eventBus = () => eventBus;

    this.registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  protected getChildrenAndProps(propsAndChildren: Meta<Props>['props']) {
    const children: Record<string, Block<TypeOfProps> | Block<TypeOfProps>[]> =
      {};
    const props = {} as Record<string, unknown>;

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const propsFromArray: Props[] = [];
        const childrenFromArray: Block<TypeOfProps>[] = [];
        value.forEach((val) => {
          if (val instanceof Block) {
            childrenFromArray.push(val);
          } else {
            propsFromArray.push(val);
          }
        });
        children[key] = childrenFromArray;
        props[key] = propsFromArray;
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props } as {
      children: Record<string, Block<TypeOfProps> | Block<TypeOfProps>[]>;
      props: Meta<Props>['props'];
    };
  }

  private registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
  }

  private makePropsProxy<T extends object>(props: T) {
    const self = this;

    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof T];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop as keyof T] = value;

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
      if (Array.isArray(child)) {
        child.forEach((item) => item.dispatchComponentDidMount());
      } else child.dispatchComponentDidMount();
    });
  }

  forceUpdate<T>(props?: T) {
    this._componentDidUpdate(props);
  }

  componentDidMount() {}

  private _componentDidUpdate<T>(newProps?: T) {
    const isUpdated = this.componentDidUpdate(newProps);
    if (isUpdated) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(newProps?: unknown) {
    if (newProps) {
      return true;
    }
    return false;
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  setProps = (nextProps: Partial<Meta<Props>['props']>) => {
    Object.assign(this.props, nextProps);
  };

  setChildren = (nextChild: unknown) => {
    if (!nextChild) {
      return;
    }
    Object.assign(this.children, nextChild);
  };

  getMeta() {
    return this.meta;
  }

  getProps() {
    return this.props;
  }

  getChildren() {
    return this.children;
  }

  compile(template: string, props: Record<string, unknown>) {
    const propsAndStubs = { ...props };

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        const mappedChild = child.map(
          (item) => `<div data-id="${item.id}"></div>`,
        );
        propsAndStubs[key] = mappedChild.join('');
      } else {
        propsAndStubs[key] = `<div data-id="${child.id}"></div>`;
      }
    });

    const fragment = document.createElement('template');

    fragment.innerHTML = Shaft.compile(template, propsAndStubs);

    const newElement = fragment.content.firstElementChild!;

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((item) => {
          const stub = fragment.content.querySelector(`[data-id="${item.id}"]`);
          const getElement = item.getContent();
          if (getElement) {
            stub?.replaceWith(getElement);
          } else {
            throw new Error('Cannot create child element');
          }
        });
      } else {
        const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
        const getElement = child.getContent();
        if (getElement) {
          stub?.replaceWith(getElement);
        } else {
          throw new Error('Cannot create child element or element = null');
        }
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

  show() {
    const getElement = this.getContent();
    if (getElement && getElement instanceof HTMLElement) {
      getElement.style.display = 'block';
    }
  }

  hide() {
    const getElement = this.getContent();
    if (getElement && getElement instanceof HTMLElement) {
      getElement.style.display = 'none';
    }
  }

  remove() {
    this.element?.remove();
  }
}
