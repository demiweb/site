import PageAnimator from './PageAnimator';
import { TimelineLite } from 'gsap';
import { ANIMATE, SHOW } from '../../constants';

export default function animateHome() {
  const page = document.querySelector('.page-home');

  const animator = new PageAnimator(page);
  animator.elements = {
    header: document.querySelector('.header'),
    letterWrap: page.querySelector('.hero__img'),
    letter: page.querySelector('.hero__img .icon-D'),
    letterImg: page.querySelector('.hero__img img'),
    heroContent: page.querySelector('.hero__content'),
    heroSubttl: page.querySelector('.hero__subttl'),
    heroTitle: page.querySelector('.hero__title'),
    heroBtns: page.querySelectorAll('.hero__btn'),
    scrollDown: page.querySelector('.hero__scroll-down')
  };
  animator.animate = () => {
    const tl = new TimelineLite();

    tl
      .fromTo(
        animator.elements.letterWrap,
        1,
        { opacity: 0 },
        { opacity: 1 }
      )
      .call(() => {
        animator.elements.letter.classList.add(ANIMATE);
      })
      .fromTo(
        animator.elements.letterImg,
        1,
        { opacity: 0, y: -30, x: 30 },
        { opacity: 1, y: 0, x: 0 }
      )
      .fromTo(
        animator.elements.letterWrap,
        0.5,
        { x: '-100%' },
        { x: '0%' }
      )
      .call(() => {
        animator.elements.heroContent.classList.add(SHOW);
      })
      .fromTo(
        animator.elements.heroSubttl,
        0.5,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 },
        '+=.5'
      )
      .fromTo(
        animator.elements.heroTitle,
        0.5,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1 },
        '-=.3'
      )
      .staggerFromTo(
        animator.elements.heroBtns,
        0.5,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0 },
        0.1
      )
      .fromTo(
        animator.elements.header,
        0.5,
        { opacity: 0, y: '-100%' },
        { opacity: 1, y: '0%' },
        '-=0.5'
      )
      .fromTo(
        animator.elements.scrollDown,
        0.5,
        { opacity: 0, y: '100%' },
        { opacity: 1, y: '0%' },
        '-=0.5'
      );
  };
  animator.init();
};
