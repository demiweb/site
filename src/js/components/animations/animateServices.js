import { animateHero } from './commonAnimations';

export default function animateServices() {
  const page = document.querySelector('.page-services');
  if(!page) return;

  // hero animations
  animateHero(page);
};
