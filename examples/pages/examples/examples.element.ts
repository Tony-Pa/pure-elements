import { Element, PureElement } from '@PureElements';
import css from './examples.element.scss';

@Element({
  tag: 'examples-page',
  css,
})
export class ExamplesPage extends PureElement {

  render() {
    return this.html`
<pure-header></pure-header>


<pure-footer></pure-footer>`;
  }
}
