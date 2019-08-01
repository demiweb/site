import { TimelineLite } from 'gsap';
import { ANIMATE } from '../../constants';
import { debounce } from 'throttle-debounce';

export default function animateHero() {
  const hero = document.querySelector('.hero');
  if(!hero) return;
  
  const {
    header,
    letterWrap,
    letter,
    letterShadow,
    splitText,
    heroContent,
    heroSubttl,
    heroTitle,
    heroTitleEl,
    scrollDown,
    text,
    breadcrumbs,
    heroBtns,
    heroMeta,
    heroNav
  } = {
    header: document.querySelector('.header'),
    letterWrap: document.querySelector('.hero__img'),
    letter: document.querySelector('.hero__img .icon-D'),
    letterShadow: document.querySelector('.hero__img .letter-shadow'),
    splitText: document.querySelectorAll('.hero__img .letter'),
    heroContent: document.querySelector('.hero__content'),
    heroSubttl: document.querySelector('.hero__subttl'),
    heroTitle: document.querySelector('.hero__title'),
    heroTitleEl: document.querySelector('.hero__title .title'),
    scrollDown: document.querySelector('.hero__scroll-down'),
    text: document.querySelector('.hero__text'),
    breadcrumbs: document.querySelector('.breadcrumbs'),
    heroBtns: document.querySelectorAll('.hero__btn'),
    heroMeta: document.querySelectorAll('.hero__blog-meta'),
    heroNav: document.querySelectorAll('.hero__nav .nav li')
  };

  const tl = new TimelineLite();

  // ============= start CONDITION timeline =============
  if (letterWrap && letter && letterShadow) {
    tl
      .fromTo(
        letterWrap,
        1,
        { opacity: 0 },
        { opacity: 1 }
      )
      .call(() => {      
        if (letter.classList) {
          letter.classList.add(ANIMATE);
        };        
      })
      .fromTo(
        letterShadow,
        1,
        { opacity: 0, y: -30, x: 30 },
        { opacity: 1, y: 0, x: 0 }
      );

    if (window.matchMedia('(min-width: 768px)').matches) {
      tl
        .fromTo(
          letterWrap,
          0.5,
          { x: '-100%' },
          { x: '0%' }
        );
    } else {
      tl
        .fromTo(
          letterWrap,
          0.5,
          { x: '0vw' },
          { x: '100vw' }
        ); 
    };
  };
  
  if (splitText.length > 0 && window.matchMedia('(min-width: 768px)').matches) {
    tl
      .fromTo(
        letterWrap,
        1,
        { opacity: 0 },
        { opacity: 1 }
      )
      .staggerFromTo(
        splitText,
        0.7,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0 },
        0.1
      )
      .fromTo(
        letterWrap,
        0.5,
        { x: '-100%' },
        { x: '0%' }
      );
  };
  if (splitText.length > 0 && window.matchMedia('(max-width: 767px)').matches) {
    tl
      .fromTo(
        letterWrap,
        0,
        { x: '-100%' },
        { x: '0%' }
      )
      .fromTo(
        letterWrap,
        1,
        { opacity: 0 },
        { opacity: 1 }
      )
      .staggerFromTo(
        splitText,
        0.7,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0 },
        0.1
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

  if (heroNav.length > 0) {
    tl.staggerFromTo(
      heroNav,
      0.5,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0 },
      0.1,
      '-=.3'
    );
  };
  // ============= end CONDITION timeline =============

  // set letter position on resize
  function setLetterPosition() {
    if (!letterWrap || !letter) return;

    const letterCSS = window.getComputedStyle(letterWrap);
    const isVisible = (() => {
      return +letterCSS.opacity !== 0 ? true : false;
    })();

    if (window.matchMedia('(max-width: 767px)').matches) {      
      if (isVisible) {
        letterWrap.style.transform = 'translate(100vw, 0)';
      };      
    } else {
      if (isVisible) {
        letterWrap.style.transform = 'translate(0, 0)';
      }; 
    };
  };

  const setLetterPositionDebounced = debounce(66, setLetterPosition);

  window.addEventListener('resize', setLetterPositionDebounced);
};
