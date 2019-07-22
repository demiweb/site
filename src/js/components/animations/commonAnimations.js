import BlockAnimator from './BlockAnimator';
import PageAnimator from './PageAnimator';
import { TimelineLite } from 'gsap';
import { isInView } from '../../helpers';

export function animateTable() {
  const table = document.querySelector('.js-anim-in-vieport-with-gsap.clients-table');
  if(table) {
    const blockAnimator = new BlockAnimator(table, {
      observer: {
        threshold: 0.25
      }
    });
    blockAnimator.animate = (entry, observer) => {
      const cols = entry.target.querySelectorAll('.clients-table__item');

      const tl = new TimelineLite({
        onComplete: () => {
          observer.unobserve(entry.target);
        }
      });

      tl
        .staggerFromTo(
          cols,
          0.7,
          { opacity: 0, y: 15, x: 15 },
          { opacity: 1, y: 0, x: 0 },
          0.1
        );
    };
    blockAnimator.init();
  };
};

export function animateHero(page) {
  const elements = {
    header: document.querySelector('.header'),
    heroContent: page.querySelector('.hero__content'),
    heroSubttl: page.querySelector('.hero__subttl'),
    heroTitle: page.querySelector('.hero__title'),
    heroTitleEl: page.querySelector('.hero__title .title'),
    scrollDown: page.querySelector('.hero__scroll-down'),
    text: page.querySelector('.hero__text'),
    breadcrumbs: page.querySelector('.breadcrumbs')
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
      )
      .fromTo(
        elements.breadcrumbs,
        0.5,
        { opacity: 0, y: '-100%' },
        { opacity: 1, y: '0%' },
        '-=0.5'
      )
      .fromTo(
        elements.text,
        0.5,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0 }
      );
  };
  animator.init();
};

export function animateTeam() {
  const teams = [].slice.call(document.querySelectorAll('.team'));

  if(!teams.length) return;

  teams.forEach(wrap => {
    isInView({
      el: wrap,
      onEnter: (entry, observer) => {
        const blocks = entry.target.querySelectorAll('.specialist');
        const imgs = entry.target.querySelectorAll('.specialist__img');
        const imgWraps = entry.target.querySelectorAll('.overlayed');
        const captions = entry.target.querySelectorAll('.specialist__bottom');

        if(!blocks.length) return;

        const tl = new TimelineLite();

        tl
          .call(() => {
            const covers = [].slice.call(imgWraps);
            covers.forEach(cover => {
              cover.classList.add('overlayedLeft');
            });
          })
          .staggerFromTo(
            imgs,
            0.5,
            { opacity: 0 },
            { opacity: 1 },
            0,
            '+=.5'
          )
          .staggerFromTo(
            captions,
            0.5,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1 },
            0,
            '-=.5'
          );
      }
    });
  });
}
