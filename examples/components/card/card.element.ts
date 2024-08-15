import { Element, Input, PureElement } from '@PureElements';
import css from './card.element.scss';

@Element({
  tag: 'pure-card',
  css,
})
export class Card extends PureElement {
  @Input()
  card: { header?: string; text?: string } = {};

  render() {
    return this.html`
<h3>${this.card.header}</h3>
<p>${this.card.text}</p>
`;
  }
}
