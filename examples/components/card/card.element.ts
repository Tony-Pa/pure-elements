import { Element, Input, PureElement } from '@PureElements';
import CSS from './card.element.scss';

@Element({
  tag: 'pure-card',
})
export class Card extends PureElement {
  @Input()
  card: any = {};

  render() {
    return this.html`
<style>${CSS}</style>
<h3>${this.card.header}</h3>
<p>${this.card.text}</p>
`;
  }
}
