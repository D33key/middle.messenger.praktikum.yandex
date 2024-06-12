import { Block } from '@/core/Block';
import { render } from '@/utils/render';
import { template } from './tmpl';

export class Loader extends Block<any> {
  constructor() {
    super();
  }

  renderInRoot() {
    const element = this.compile(template, this.props);

    render('#app', element);
  }
}
