import { HTTPTransport } from '.';

const http = new HTTPTransport('', '');

describe('Test HTTPTransport', () => {
  it('Get method', (done) => {
    http
      .get('https://jsonplaceholder.typicode.com/todos', {
        data: { userId: 1 },
      })
      .then(({ response }) => {
        const [{ userId }] = JSON.parse(response) ?? [];

        if (userId === 1) {
          done();
        } else {
          done(new Error('Не удалось получить UserId === 1'));
        }
      })
      .catch(done);
  });

  it('Post method', (done) => {
    http
      .post('https://jsonplaceholder.typicode.com/posts', {
        data: {
          title: 'foo',
          body: 'bar',
          userId: 1,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(({ response }) => {
        const { title } = JSON.parse(response) ?? {};

        if (title === 'foo') {
          done();
        } else {
          done(new Error('Не удалось получить Title === foo'));
        }
      })
      .catch(done);
  });

  it('Put method', (done) => {
    http
      .put('https://jsonplaceholder.typicode.com/posts/1', {
        data: {
          id: 1,
          title: 'foo',
          body: 'bar',
          userId: 1,
        },
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(({ response }) => {
        const { title } = JSON.parse(response) ?? {};

        if (title === 'foo') {
          done();
        } else {
          done(new Error('Не удалось получить Title === foo'));
        }
      })
      .catch(done);
  });
});
