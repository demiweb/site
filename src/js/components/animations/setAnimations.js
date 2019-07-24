import { animateHero, addPortfolioContentOverflowVisible, animateNumbers } from './commonAnimations';
import animateHome from './animateHome';
import animateAbout from './animateAbout';

export default function setAnimations() {
  animateHero();
  addPortfolioContentOverflowVisible();
  animateNumbers();

  animateHome();
  animateAbout();
};
