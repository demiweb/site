import animateHome from './animateHome';
import animateAbout from './animateAbout';
import animateServices from './animateServices';
import animatePortfolio from './animatePortfolio';
import animatePortfolioItem from './animatePortfolioItem';
import animateBlog from './animateBlog';

export default function setAnimations() {
  animateHome();
  animateAbout();
  animateServices();
  animatePortfolio();
  animatePortfolioItem();
  animateBlog();
};
