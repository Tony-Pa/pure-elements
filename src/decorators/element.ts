import { PureElement } from '../core';

export interface IComponentDecoratorProps {
  tag: string;
  css?: string;
  mode?: 'open' | 'closed';
  delegatesFocus?: boolean;
  waitForAttribute?: string;
}

export function Element(params: IComponentDecoratorProps): (constructor: typeof PureElement) => any {
  return (constructor: typeof PureElement) => {
    class PureElementDecorated extends constructor {
      static is = params.tag;

      static css = params.css;

      static observedAttributes = params.waitForAttribute
        ? [
          params.waitForAttribute,
          ...super.observedAttributes,
          ...PureElementDecorated.$$inputs.map(({ attr, prop }) => attr ?? prop),
        ]
        : [...super.observedAttributes, ...PureElementDecorated.$$inputs.map(({ attr, prop }) => attr ?? prop)];

      constructor() {
        super();
        const { mode, delegatesFocus, waitForAttribute } = params;
        this.root = this.attachShadow({ mode: mode ?? 'open', delegatesFocus: delegatesFocus ?? true });
        if (!waitForAttribute) {
          this._render();
        }

        for (let i = 0; i < PureElementDecorated.$$outputs.length; i++) {
          const output = PureElementDecorated.$$outputs[i];
          // @ts-ignore
          this[output.prop] = {
            emit: (detail: any) => {
              const event = new CustomEvent(output.eventName || output.prop, {
                bubbles: output && typeof output.bubbles === 'boolean' ? output.bubbles : true,
                cancelable: output && typeof output.cancelable === 'boolean' ? output.cancelable : true,
                composed: output && typeof output.composed === 'boolean' ? output.composed : true,
                detail,
              });

              this.dispatchEvent(event);

              return event;
            }
          };
        }
      }

      connectedCallback() {
        super.connectedCallback();
      }

      disconnectedCallback() {
        super.disconnectedCallback();
        this.cleanup();
      }

      attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        const input = PureElementDecorated.$$inputs.find(({ attr, prop }) => attr ?? prop === name);
        if (input && this[input.prop as keyof PureElementDecorated] !== newValue) {
          // @ts-ignore
          this[input.prop] = newValue;

          if (input.reRender || input.reRender === undefined && !input.renderFunction && !input.bind) {
            this._render();
          } else {
            if (input.renderFunction) {
              // @ts-ignore
              this[input.renderFunction]?.();
            }

            if (input.bind) {
              const bind = this.root.querySelector(input.bind);
              if (bind) {
                bind.textContent = newValue;
              }
            }
          }
        }

        super.attributeChangedCallback(name, oldValue, newValue);

        if (name === params.waitForAttribute && newValue) {
          this._render();
        }
      }

      attachListeners() {
        // eslint-disable-next-line @typescript-eslint/no-this-alias,unicorn/no-this-assignment
        const component = this;
        for (const { event, selector, method } of PureElementDecorated.$$bindings) {
          const eventListener = function (e: Event) {
            // @ts-ignore
            component[method]?.call(component, e, this);
          };

          if (selector === 'host') {
            this.addEventListener(event, eventListener);
            this.listeners.push(() => this.removeEventListener(event, eventListener));
            continue;
          }

          this.root.querySelector(selector)?.addEventListener(event, eventListener);
          this.listeners.push(() => this.root.querySelector(selector)?.removeEventListener(event, eventListener));
        }
      }

      _render() {
        this.cleanup();

        this.root.innerHTML = (PureElementDecorated.css ? `<style>${PureElementDecorated.css}</style>` : '') + this.render();

        this.processChildrenProps();
        this.attachListeners();
      }
    }

    customElements.define(params.tag, PureElementDecorated);

    return PureElementDecorated;
  };
}
