import Link from '@/components/link';
import { Block } from '@/core/Block';
import { template } from './tmpl';

interface Error {
  link: Link;
}

export class ErrorPage extends Block<Error> {
  constructor() {
    super({
      link: new Link({
        linkClass: '',
        linkText: 'Упс, что-то пошло не так. Вернуться назад',
        linkHref: '/messenger',
      }),
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
