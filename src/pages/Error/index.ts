import Link from '@/components/link';
import { Block } from '@/core/Block';
import { router } from '../router';
import { template } from './tmpl';

interface Error {
  link: Link;
}
console.log(router.history.length);
export class ErrorPage extends Block<Error> {
  constructor() {
    super({
      link: new Link({
        linkClass: '',
        linkText: 'Упс, что-то пошло не так. Вернуться назад',
        events: {
          click: () => {
            if (router.history.length === 1) {
              router.go('/');
            } else {
              router.back();
            }
          },
        },
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
