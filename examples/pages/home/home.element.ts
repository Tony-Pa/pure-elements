import { Element, PureElement, mapElements } from '@PureElements';
import css from './home.element.scss';

@Element({
  tag: 'home-page',
  css,
})
export class HomePage extends PureElement {
  cards = [
    {
      header: 'Easy Integration',
      text: 'Quickly add Pure Elements to any project with minimal setup.',
    },
    {
      header: 'Lightweight',
      text: 'Optimized for speed and efficiency without compromising performance.',
    },
    {
      header: 'Customizable',
      text: 'Highly customizable components tailored to your specific needs.',
    },
  ]

  render() {
    return this.html`
<pure-header></pure-header>

<section class="hero">
  <h1>Effortless Web Development</h1>
  <p>Simplifying the process of working with native web components.</p>
  <button class="cta-button">Get Started</button>
</section>

<section class="features">
  ${mapElements(this.cards, (card) => this.html`<pure-card card="${card}"></pure-card>`)}
</section>

<pure-footer></pure-footer>`;
  }
}
