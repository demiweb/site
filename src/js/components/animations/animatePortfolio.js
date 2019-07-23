import { animateHero, addPortfolioContentOverflowVisible } from './commonAnimations';

export default function animatePortfolio() {
  const page = document.querySelector('.page-portfolio');
  if(!page) return;

  animateHero(page);
  addPortfolioContentOverflowVisible();
}
