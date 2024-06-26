import { isEqual } from '../../utils/isEqual';
import { render } from '../../utils/render';
import { Block, TypeOfProps } from '../Block';

export default class Route {
  public pathname: string;
  protected blockClass: { new (): Block<TypeOfProps> };
  protected block: Block<TypeOfProps> | null;
  protected props;

  constructor(
    pathname: string,
    view: { new (): Block<TypeOfProps> },
    props: Record<string, unknown>,
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
    render(this.props.rootQuery as string, this.block!);
  }
}
