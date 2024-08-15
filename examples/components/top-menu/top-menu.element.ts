import { Element, PureElement } from '@PureElements';
import css from './top-menu.element.scss';

@Element({
  tag: 'top-menu',
  css,
})
export class TopMenu extends PureElement {

  render() {
    return this.html`
<nav>
    <a href="/">Home</a>
    <a href="/examples.html">Examples</a>
    <a href="https://github.com/Tony-Pa/pure-elements/wiki" target="_blank">Documentation</a>
    <a href="https://github.com/Tony-Pa/pure-elements" target="_blank">GitHub</a>
</nav>`;
  }
}
