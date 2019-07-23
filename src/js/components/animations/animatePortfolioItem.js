import { animateHero } from './commonAnimations';

export default function animatePortfolioItem() {
  const page = document.querySelector('.page-portfolio-item');
  if(!page) return;

  animateHero(page);
};
