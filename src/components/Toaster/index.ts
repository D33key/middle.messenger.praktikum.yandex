import { Block } from '@/core/Block';
import { render } from '@/utils/render';
import { template } from './tmpl';

interface ToasterProps {
  reason?: 'error' | 'info';
  title: string;
  text: string;
}

export class Toaster extends Block<ToasterProps> {
  constructor(props: ToasterProps) {
    super({
      reason: props.reason ?? 'error',
      title: props.title,
      text: props.text,
    });
  }

  renderInRoot(timeout = 5000) {
    const element = this.compile(template, this.props);

    render('#app', element);

    setTimeout(() => {
      element.remove();
    }, timeout);
  }
}
