import { Block } from '@/core/Block';
import { EventsProps } from '@/templates/button';
import { render } from '@/utils/render';
import { template } from './tmpl';

interface ModalProps extends EventsProps {
  title: string;
  inputs: unknown[];
}

export class Modal extends Block<ModalProps> {
  static instance: Modal;

  constructor(props: ModalProps) {
    super(props);

    Modal.instance = this;

    Modal.instance.setProps({
      events: {
        ...props.events,
        click: (event) => {
          if ((event.target as HTMLElement).classList.contains('modal-wrapper'))
            Modal.instance.element?.remove();
        },
      },
    });
  }

  static close() {
    Modal.instance.element?.remove();
  }

  renderInRoot() {
    const element = this.compile(template, this.props);

    render('#app', element);
  }
}
