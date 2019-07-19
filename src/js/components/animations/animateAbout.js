import PageAnimator from './PageAnimator';
import BlockAnimator from './BlockAnimator';
import { TimelineLite } from 'gsap';
import { ANIMATE, SHOW } from '../../constants';

export default function animateHome() {
  const page = document.querySelector('.page-about');
  if(!page) return;

  // hero animations
  const elements = {
    header: document.querySelector('.header'),
    heroContent: page.querySelector('.hero__content'),
    heroSubttl: page.querySelector('.hero__subttl'),
    heroTitle: page.querySelector('.hero__title'),
    heroTitleEl: page.querySelector('.hero__title .title'),
    scrollDown: page.querySelector('.hero__scroll-down')
  };

  const animator = new PageAnimator(page);  
  animator.animate = () => {
    const tl = new TimelineLite();

    tl
      .fromTo(
        elements.heroTitle,
        0,
        { opacity: 0 },
        { opacity: 1 }
      )
      .call(() => {
        elements.heroTitle.classList.add('overlayedLeft');
      })
      .fromTo(
        elements.heroTitleEl,
        0.5,
        { opacity: 0 },
        { opacity: 1 },
        '+=.5'
      )
      .fromTo(
        elements.heroSubttl,
        0.5,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1 },
        '-=.5'
      )
      .fromTo(
        elements.header,
        0.5,
        { opacity: 0, y: '-100%' },
        { opacity: 1, y: '0%' },
        '-=0.5'
      )
      .fromTo(
        elements.scrollDown,
        0.5,
        { opacity: 0, y: '100%' },
        { opacity: 1, y: '0%' },
        '-=0.5'
      );
  };
  animator.init();
};
