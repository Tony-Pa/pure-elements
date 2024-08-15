import { IInput, IOutput } from '../decorators';
import { getElement, getProp } from './helpers';

export abstract class PureElement extends HTMLElement {
  root!: ShadowRoot;

  listeners: (() => void)[] = [];

  static $$bindings: { event: string; selector: string; method: string }[] = [];

  static $$inputs: IInput[] = [];

  static $$outputs: IOutput[] = [];

  static is: string;

  static css?: string;

  protected $$childrenProps: { prop: string | null; value: any; element: string | null }[] = [];

  connectedCallback() {}

  disconnectedCallback() {}

  static observedAttributes: string[] = [];

  // @ts-ignore
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {}

  cleanup() {
    for (const listener of this.listeners) listener();
    this.listeners = [];
  }

  render() {
    return '';
  }

  html(strings: TemplateStringsArray, ...values: Array<any>): string {
    let result = '';

    for (let i = 0; i < strings.length; i++) {
      result += strings[i] !== null && strings[i] !== undefined ? strings[i] : '';
      result += values[i] !== null && values[i] !== undefined ? values[i] : '';

      if (values[i] && typeof values[i] === 'object') {
        this.$$childrenProps.push({
          element: getElement(result),
          prop: getProp(strings[i]),
          value: values[i]
        });
      }
    }

    return result;
  }

  attachListeners() {}

  protected processChildrenProps() {
    this.$$childrenProps.forEach((child, index) => {
      if (!child.element || !child.prop) {
        return;
      }
      const el = this.root.querySelectorAll<PureElement>(child.element)[index];
      // @ts-ignore
      el?.attributeChangedCallback?.(child.prop, el[child.prop], child.value);
    })
  }

  setAttribute(name: string, value: any) {
    super.setAttribute(name, value.toString());
    // @ts-ignore
    this.attributeChangedCallback(name, this[name], value);
  }
}