import { Block, TypeOfProps } from '../../core/Block/index';
import { render } from '../../utils/render';
import { template } from './tmpl';

export class Loader extends Block<TypeOfProps> {
  constructor() {
    super();
  }

  renderInRoot() {
    const element = this.compile(template, this.props);

    render('#app', element);
  }
}
