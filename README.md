# Introduction
This framework "Pure elements" allows you easily create web components.

`pure-elements` let you write simple, declarative and beautiful web components without the boilerplate.

# Examples
`pure-elements` are plain ES6 classes with decorators.

```typescript
import { Element, Input, PureElement } from '@PureElements';
import css from './my-component.element.scss';

@Element({
  tag: 'my-component', // the name of the element's custom HTML tag
  css,                 // css styles to apply to the component
})
export class MyComponent extends PureElement {
  // The component accepts two argument:
  @Input() firstName: string;
  @Input() lastName: string;

  //The following HTML is rendered when our component is used
  render() {
    return this.html`
<div>
  Hello, my name is ${this.firstName} ${this.lastName}
</div>`;
  }
}
```



