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
  const {
    header,
    heroContent,
    heroSubttl,
    heroTitle,
    heroTitleEl,
    scrollDown,
    text,
    breadcrumbs,
    heroBtns
  } = {
    header: document.querySelector('.header'),
    heroContent: page.querySelector('.hero__content'),
    heroSubttl: page.querySelector('.hero__subttl'),
    heroTitle: page.querySelector('.hero__title'),
    heroTitleEl: page.querySelector('.hero__title .title'),
    scrollDown: page.querySelector('.hero__scroll-down'),
    text: page.querySelector('.hero__text'),
    breadcrumbs: page.querySelector('.breadcrumbs'),
    heroBtns: page.querySelectorAll('.hero__btn')
  };

  const animator = new PageAnimator(page);  
  animator.animate = () => {
    const tl = new TimelineLite();

    tl
      .fromTo(
        heroTitle,
        0,
        { opacity: 0 },
        { opacity: 1 }
      )
      .call(() => {
        heroTitle.classList.add('overlayedLeft');
      })
      .fromTo(
        heroTitleEl,
        0.5,
        { opacity: 0 },
        { opacity: 1 },
        '+=.5'
      )
      .fromTo(
        heroSubttl,
        0.5,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1 },
        '-=.5'
      )
      .fromTo(
        header,
        0.5,
        { opacity: 0, y: '-100%' },
        { opacity: 1, y: '0%' },
        '-=0.5'
      )
      .fromTo(
        scrollDown,
        0.5,
        { opacity: 0, y: '100%' },
        { opacity: 1, y: '0%' },
        '-=0.5'
      )
      .fromTo(
        breadcrumbs,
        0.5,
        { opacity: 0, y: '-100%' },
        { opacity: 1, y: '0%' },
        '-=0.5'
      );
      
    if (text) {
      tl.fromTo(
        text,
        0.5,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0 }
      );
    };

    if (heroBtns.length > 0) {
      tl.staggerFromTo(
        heroBtns,
        0.5,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0 },
        0.1
      );
    }
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
};

export function addPortfolioContentOverflowVisible() {
  const portfolioItems = [].slice.call(document.querySelectorAll('.js-vieport-related-el.portfolio-item'));

  if(portfolioItems.length > 0) {
    portfolioItems.forEach(item => {
      const content = item.querySelector('.portfolio-item__content-inner');

      content.addEventListener('transitionend', (e) => {
        const contentWrap = e.currentTarget.parentNode.classList.contains('portfolio-item__content') ? e.currentTarget.parentNode : null;

        if (!contentWrap) return;

        contentWrap.classList.add('overflow-visible');
      });      
    });
  };
};
