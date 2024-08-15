import { Element, PureElement } from '@PureElements';
import css from './header.element.scss';

@Element({
  tag: 'pure-header',
  css,
})
export class Header extends PureElement {
  render() {
    return this.html`
<header>
  <h2>
    <span class="logo">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86 146">
        <path d="M16 75l-2 5.5 26.285 63.278a3.56 3.56 0 0 0 6.536.099L72.5 87 71 80.5l-26.191 56.829c-.189.409-.598.671-1.048.671-.462 0-.879-.275-1.061-.7L16 75z"/>
        <path d="M3.881 109.034c-.225.57-.819.878-1.42.758-.766-.153-1.229-.912-.955-1.643L41.239 2.015C41.705.78 42.873 0 44.193 0c1.375 0 2.591.876 3.017 2.184l35.546 109.562c.157.485-.03.96-.438 1.266-.65.487-1.567.253-1.828-.515L45.226 8.674c-.145-.431-.532-.674-.987-.674-.444 0-.823.231-.976.647-2.638 7.187-35.466 90.456-39.381 100.387z"/>
        <path d="M69.5 72h-54v1h54v-1z"/>
        <path d="M2.5 70.5h14v4h-14c-3 0-3.5-4 0-4zm80 0h-14v4h14c4 0 3.5-4 0-4z"/>
      </svg>
    </span>
    <span>Pure Elements</span>
  </h2>
  <top-menu></top-menu>
</header>`;
  }
}