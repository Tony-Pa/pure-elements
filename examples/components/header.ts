import { Element, EventEmitter, Input, Listener, Output, PureElement } from '@PureElements';

@Element({
  tag: 'pure-header',
})
export class MyHeader extends PureElement {
  @Input()
  data: any = {};

  @Output('pure-header-click')
  onClickEvent!: EventEmitter<string>

  @Listener('click', '.header')
  onClick(event: Event, element: HTMLElement) {
    console.log('!!!!>>', event, element);
    this.onClickEvent.emit('cool')
  }

  render() {
    return this.html`
<h2 class="header">
  ${this.data.header}
</h2>`;
  }
}
