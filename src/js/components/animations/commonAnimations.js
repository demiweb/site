import BlockAnimator from './BlockAnimator';
// import PageAnimator from './PageAnimator';
import { TimelineLite } from 'gsap';
import { isInView } from '../../helpers';
import { ANIMATE } from '../../constants';

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

export function animateHero() {
  const {
    header,
    letterWrap,
    letter,
    letterShadow,
    heroContent,
    heroSubttl,
    heroTitle,
    heroTitleEl,
    scrollDown,
    text,
    breadcrumbs,
    heroBtns,
    heroMeta
  } = {
    header: document.querySelector('.header'),
    letterWrap: document.querySelector('.hero__img'),
    letter: document.querySelector('.hero__img .icon-D'),
    letterShadow: document.querySelector('.hero__img .letter-shadow'),
    heroContent: document.querySelector('.hero__content'),
    heroSubttl: document.querySelector('.hero__subttl'),
    heroTitle: document.querySelector('.hero__title'),
    heroTitleEl: document.querySelector('.hero__title .title'),
    scrollDown: document.querySelector('.hero__scroll-down'),
    text: document.querySelector('.hero__text'),
    breadcrumbs: document.querySelector('.breadcrumbs'),
    heroBtns: document.querySelectorAll('.hero__btn'),
    heroMeta: document.querySelectorAll('.hero__blog-meta')
  };

  const tl = new TimelineLite();

  // ============= start CONDITION timeline =============
  if (letterWrap && letter && letterShadow && window.matchMedia('(min-width: 768px)').matches) {
    tl
      .fromTo(
        letterWrap,
        1,
        { opacity: 0 },
        { opacity: 1 }
      )
      .call(() => {
        letter.classList.add(ANIMATE);
      })
      .fromTo(
        letterShadow,
        1,
        { opacity: 0, y: -30, x: 30 },
        { opacity: 1, y: 0, x: 0 }
      )
      .fromTo(
        letterWrap,
        0.5,
        { x: '-100%' },
        { x: '0%' }
      );
  };
  // ============= end CONDITION timeline =============
  // ============= start COMMON timeline =============
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
    );
  // ============= end COMMON timeline =============
  // ============= start CONDITION timeline =============
  if (heroSubttl) {
    tl
      .fromTo(
        heroSubttl,
        0.5,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1 },
        '-=.5'
      );
  };
  // ============= end CONDITION timeline =============
  // ============= start COMMON timeline =============
  tl
    .fromTo(
      header,
      0.5,
      { opacity: 0, y: '-100%' },
      { opacity: 1, y: '0%' },
      '-=0.5'
    );
  // ============= start CONDITION timeline =============
  if (scrollDown) {
    tl
      .fromTo(
        scrollDown,
        0.5,
        { opacity: 0, y: '100%' },
        { opacity: 1, y: '0%' },
        '-=0.5'
      );
  };
  // ============= end CONDITION timeline =============
  // ============= end COMMON timeline =============
  // ============= start CONDITION timeline =============
  if (breadcrumbs) {
    tl
      .fromTo(
        breadcrumbs,
        0.5,
        { opacity: 0, y: '-100%' },
        { opacity: 1, y: '0%' },
        '-=0.5'
      );
  };
      
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
  };

  if (heroMeta) {
    tl.fromTo(
      heroMeta,
      0.5,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0 }
    );
  };
  // ============= end CONDITION timeline =============
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

export function animateStagger() {
  const numbersWraps = [].slice.call(document.querySelectorAll('.js-stagger'));

  if(numbersWraps.length > 0) {
    numbersWraps.forEach(wrap => {
      isInView({
        el: wrap,
        onEnter: (entry, observer) => {
          const blocks = entry.target.querySelectorAll('.js-stagger-el');

          if(!blocks) return;
          const tl = new TimelineLite();
          tl
            .staggerFromTo(
              blocks,
              0.5,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0 },
              0.2
            );
        }
      });
    });
  };
};
