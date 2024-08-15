import { Element, Input, Listener, PureElement } from '@PureElements';
import iosCSS from './notification.ios.scss';

@Element({
  tag: 'pure-notification2',
})
export class MyComponent2 extends PureElement {
  logoUrl?: string;

  @Input({
    bind: '.header',
    // renderFunction: 'onHeaderUpdate',
    reRender: false,
  })
  header = '111';

  description!: string;

  stateButton = false;

  constructor() {
    super();
    // @ts-ignore
    console.log('MyComponent.is', MyComponent2.is);
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

  onHeaderUpdate() {
    this.root.querySelector('.header')!.textContent = this.header;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    super.attributeChangedCallback(name, oldValue, newValue);

    console.log('attributeChangedCallback', name, oldValue, newValue);
    // if (name === 'header') {
    //   this.root.querySelector('.header')!.textContent = this.header;
    // }
  }

  render() {
    return `
<style>${iosCSS}</style>
<div class="notification">
  ${this.logoUrl ? `<div aria-hidden="true" class="logo"><img src="${this.logoUrl}" alt="${this.header}"></div>` : ``}
  <div class="content">
    <h2 class="header">${this.header}</h2>
    <div class="desc">${this.description}</div>
    <button class="state-button" type="button">${this.stateButton ? 'Open' : 'Close'}</button>
  </div>
</div>`;
  }
}
