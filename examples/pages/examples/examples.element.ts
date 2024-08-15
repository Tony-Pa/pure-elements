import { Element, PureElement } from '@PureElements';
import CSS from './examples.element.scss';

@Element({
  tag: 'examples-page',
})
export class ExamplesPage extends PureElement {

  render() {
    return this.html`
<style>${CSS}</style>

<pure-header></pure-header>


<pure-footer></pure-footer>`;
  }
}
