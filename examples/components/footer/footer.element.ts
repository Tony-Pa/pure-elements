import { Element, PureElement } from '@PureElements';
import CSS from './footer.element.scss';

@Element({
  tag: 'pure-footer',
})
export class Footer extends PureElement {

  render() {
    return this.html`
<style>${CSS}</style>
<footer>
    &copy; 2024 Pure Elements |
    <a href="https://github.com/Tony-Pa/pure-elements/wiki" target="_blank">Documentation</a> |
    <a href="https://github.com/Tony-Pa/pure-elements" target="_blank">GitHub</a>
</footer>
    `;
  }
}
