import { expect } from 'chai';
import { Block } from '../Block';
import Router from '.';

describe('Test Router', () => {
  const router = new Router('.app');

  class FirstPage extends Block<any> {}
  class SecondPage extends Block<any> {}
  class ThirdPage extends Block<any> {}

  router
    .setProtectedPaths(['/about'])
    .use('/', FirstPage)
    .use('/second', SecondPage)
    .use('/third', ThirdPage)
    .start();

  it('Change route', () => {
    router.go('/');
    router.go('/about');
    router.go('/');
    expect(router.history.length).to.eq(4);
  });

  it('Get pathname', () => {
    router.go('/second');
    const { pathname } = router.currentRoute || {};
    expect(pathname).to.eq('/second');
  });
});
