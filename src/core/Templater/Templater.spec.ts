import { assert } from 'chai';
import Shaft from '.';

describe('Test Templator', () => {
  it('Compile template', () => {
    assert.equal(
      Shaft.compile(
        `<div class="{{ className }}">
          <h1>{{ name }}</h1>
          <p>{{info.age}}</p>
        <div>`,
        {
          className: 'example',
          name: 'Dima',
          info: {
            age: 28,
          },
        },
      ),
      `<div class="example">
          <h1>Dima</h1>
          <p>28</p>
        <div>`,
    );
  });
});
