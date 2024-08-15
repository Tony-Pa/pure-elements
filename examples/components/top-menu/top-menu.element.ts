import { Element, PureElement } from '@PureElements';
import CSS from './top-menu.element.scss';

@Element({
  tag: 'top-menu',
})
export class TopMenu extends PureElement {

  render() {
    return this.html`
<style>${CSS}</style>
<nav>
    <a href="/">Home</a>
    <a href="/examples.html">Examples</a>
    <a href="https://github.com/Tony-Pa/pure-elements/wiki" target="_blank">Documentation</a>
    <a href="https://github.com/Tony-Pa/pure-elements" target="_blank">GitHub</a>
</nav>`;
  }
}
