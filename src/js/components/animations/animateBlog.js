import { animateHero } from './commonAnimations';

export default function animatePortfolio() {
  const page = document.querySelector('.page-blog');
  if(!page) return;

  animateHero(page);
}
