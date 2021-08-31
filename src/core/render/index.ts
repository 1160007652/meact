export interface IMeact {
  type: string | 'TEXT_ELEMENT';
  props: {
    children?: IMeact[];
    nodeValue?: string | number;
  };
}

const TEXT_ELEMENT = 'TEXT ELEMENT'; // 类型

function render(element: IMeact, parentDom) {
  const { type, props } = element;

  const isTextElement = type === TEXT_ELEMENT;
  const dom = isTextElement ? document.createTextNode('') : document.createElement(type);

  const isListener = (name) => name.startsWith('on');
  Object.keys(props)
    .filter(isListener)
    .forEach((name) => {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, props[name]);
    });

  const isAttribute = (name) => !isListener(name) && name != 'children';
  Object.keys(props)
    .filter(isAttribute)
    .forEach((name) => {
      dom[name] = props[name];
    });

  const childElements = props.children || [];
  childElements.forEach((childElement) => render(childElement, dom));

  parentDom.appendChild(dom);
}

function createElement(type, config, ...args) {
  const props = Object.assign({}, config);

  // 是否有子组件
  const hasChildren = args.length > 0;

  const rawChildren = hasChildren ? [].concat(...args) : [];
  props.children = rawChildren
    .filter((c) => c != null && c !== false)
    .map((c) => (c instanceof Object ? c : createTextElement(c)));
  // 过滤-空-值, 剩下的-不属于-Object的值 -> createTextElement -> 变为 类型为TEXT_ELEMENT- Meact元素
  return { type, props };
}

function createTextElement(value) {
  // 规范数据
  return createElement(TEXT_ELEMENT, { nodeValue: value });
}

export default render;
