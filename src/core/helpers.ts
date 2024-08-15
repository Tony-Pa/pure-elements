import { PureElement } from './element';

export function getProp(string: string): string | null {
  return string.match(/([\w\-]+)=\W?$/)?.[1] || null;
}

export function getElement(string: string): string | null {
  return string.match(/<([\w\-]+)\W[^<]*$/)?.[1] || null;
}

export function mapElements<T>(array: T[], predicate: (item: T) => string): string {
  return array.map(predicate).join('');
}

export function createPureElement(constructor: typeof PureElement, props?: Record<string, any>): PureElement;
export function createPureElement(name: string, props?: Record<string, any>): PureElement;
export function createPureElement(a: string | typeof PureElement, props?: Record<string, any>): PureElement {
  const element = typeof a === 'string' ? a : a.is;
  const component = document.createElement(element) as PureElement;

  if (props) {
    const entries = Object.entries(props);
    for (let i = 0; i < entries.length; i++) {
      component.setAttribute(entries[i][0], entries[i][1]);
    }
  }

  return component;
}