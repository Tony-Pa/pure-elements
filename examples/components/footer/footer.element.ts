import { Element, PureElement } from '@PureElements';
import css from './footer.element.scss';

@Element({
  tag: 'pure-footer',
  css,
})
export class Footer extends PureElement {

  render() {
    return this.html`
<footer>
    &copy; 2024 Pure Elements |
    <a href="https://github.com/Tony-Pa/pure-elements/wiki" target="_blank">Documentation</a> |
    <a href="https://github.com/Tony-Pa/pure-elements" target="_blank">GitHub</a>
</footer>
    `;
  }
}
