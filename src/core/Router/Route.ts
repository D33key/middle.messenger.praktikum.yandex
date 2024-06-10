import { isEqual } from '@/utils/isEqual';
import { render } from '@/utils/render';
import { Block } from '../Block';

export default class Route {
  protected pathname: string;
  protected blockClass: { new (): Block<any> };
  protected block: Block<any> | null;
  protected props;

  constructor(
    pathname: string,
    view: { new (): Block<any> },
    props: Record<string, any>,
  ) {
    this.pathname = pathname;
    this.blockClass = view;
    this.block = null;
    this.props = props;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this.block) {
      this.block.remove();
    }
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    this.block = new this.blockClass();
    render(this.props.rootQuery, this.block!);
  }
}
