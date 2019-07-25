import { animateHero, addPortfolioContentOverflowVisible, animateStagger } from './commonAnimations';
import animateHome from './animateHome';
import animateAbout from './animateAbout';

export default function setAnimations() {
  animateHero();
  addPortfolioContentOverflowVisible();
  animateStagger();

  animateHome();
  animateAbout();
};
