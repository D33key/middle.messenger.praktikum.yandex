import { expect } from 'chai';
import { Block } from '.';

describe('Test Block', () => {
  let isRender = false;
  let isMount = false;
  let isRenderAfterUpdateProps = false;

  class FakeComp extends Block<{ className: string }> {
    constructor(props?: { className: string }) {
      super({
        className: props?.className ?? 'fake',
      });
    }

    componentDidMount() {
      isMount = true;
    }

    render() {
      isRender = true;
      if (this.props.className === 'changed') {
        isRenderAfterUpdateProps = true;
      }
      return this.compile(
        '<button class={{className}}>click</button>',
        this.props,
      );
    }
  }

  const fakeComp = new FakeComp();
  fakeComp.dispatchComponentDidMount();

  it('Component did render', () => {
    expect(isRender).to.eq(true);
  });

  it('Component did mount', () => {
    expect(isMount).to.eq(true);
  });

  it('Update prop', () => {
    fakeComp.setProps({
      className: 'changed',
    });
    expect(fakeComp.getProps().className).to.eq('changed');
  });

  it('Create instance of Block with no prop', () => {
    const componentWithNoProps = new FakeComp();
    expect(componentWithNoProps.getProps().className).to.eq('fake');
  });

  it('Render after update props', () => {
    expect(isRenderAfterUpdateProps).to.eq(true);
  });

  it('Create instance of Block with some prop', () => {
    const componentWithSomeProps = new FakeComp({
      className: 'setClassName',
    });
    expect(componentWithSomeProps.getProps().className).to.eq('setClassName');
  });
});
