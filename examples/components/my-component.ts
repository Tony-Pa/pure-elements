import { Element, Input, Listener, PureElement } from '@PureElements';
import iosCSS from './notification.ios.scss';

@Element({
  tag: 'pure-notification',
  waitForAttribute: 'lang',
})
export class MyComponent extends PureElement {
  private logoUrl?: string;

  @Input()
  lang!: string;

  @Input()
  header!: string;

  @Input('desc')
  description!: string;

  stateButton = false;

  constructor() {
    super();
  }

  @Listener('click')
  @Listener('click', '.header')
  onClick(event: Event, element: HTMLElement) {
    console.log(event, element);
  }

  @Listener('click', '.state-button')
  onClickStateButton(_: Event, element: HTMLElement) {
    this.stateButton = !this.stateButton;
    element.innerHTML = this.stateButton ? 'Open' : 'Close';
    console.log(_, element);
  }

  @Listener('pure-header-click', 'pure-header')
  onClickHeader(e: CustomEvent<string>) {
    console.log('>>>>>>>>>>', e.detail);
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    console.log('attributeChangedCallback', name, oldValue, newValue);
    if (name === 'lang') {
      console.log('lang');
    }
  }

  render() {
    return this.html`
<style>${iosCSS}</style>
<div class="notification">
  ${this.logoUrl ? `<div aria-hidden="true" class="logo"><img src="${this.logoUrl}" alt="${this.header}"></div>` : ``}
  <div class="content">
    <pure-header class="header" title="${'title'}" data="${{ header: this.header }}"></pure-header>
    <div class="desc" prop="${{ a: 1 }}">${this.description}</div>
    <button class="state-button" type="button">${this.stateButton ? 'Open' : 'Close'}</button>
  </div>
</div>`;
  }
}
