/** @jsx Meact.createElement */

import Meact from '_src/core';

const Root = {
  type: 'div',
  props: {
    children: [
      {
        type: 'TEXT ELEMENT',
        props: { nodeValue: 'Foo' },
      },
      {
        type: 'span',
        props: {
          children: [
            {
              type: 'TEXT ELEMENT',
              props: { nodeValue: 'Foo2' },
            },
          ],
        },
      },
      {
        type: 'div',
        props: {
          children: [
            {
              type: 'TEXT ELEMENT',
              props: { nodeValue: 'Foo3' },
            },
            { type: 'TEXT ELEMENT', props: { nodeValue: 'Foo4' } },
          ],
        },
      },
    ],
  },
};

let count = 0;

const Root2 = (
  <div>
    <h1 onClick={handleOnClickAdd}>hahah - {count}</h1>
    <ul>
      <li>wowoowow</li>
      <li>hohohoho</li>
      <li>dodododo</li>
    </ul>
    <a href="#">xxxx</a>
  </div>
);

function handleOnClickAdd() {
  count++;
  Meact.render(Root2, document.getElementById('root'));
}

Meact.render(Root2, document.getElementById('root'));
