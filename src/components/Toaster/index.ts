import { Block } from '@/core/Block';
import { render } from '@/utils/render';
import { template } from './tmpl';

interface ToasterProps {
  reason?: 'error' | 'info';
  title: string;
  text: string;
}

export class Toaster extends Block<ToasterProps> {
  static instance: Toaster;

  constructor(props: ToasterProps) {
    super({
      ...props,
      reason: props.reason ?? 'error',
    });

    if (Toaster.instance) {
      Toaster.instance.remove();
    }

    Toaster.instance = this;
  }

  renderInRoot(timeout = 5000) {
    const element = this.compile(template, this.props);

    render('#app', element);

    setTimeout(() => {
      element.remove();
    }, timeout);
  }
}
