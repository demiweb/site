import PageAnimator from './PageAnimator';
import BlockAnimator from './BlockAnimator';
import { TimelineLite } from 'gsap';
import { ANIMATE, SHOW } from '../../constants';

export default function animateHome() {
  const page = document.querySelector('.page-home');
  if(!page) return;

  // hero animations
  const elements = {
    header: document.querySelector('.header'),
    letterWrap: page.querySelector('.hero__img'),
    letter: page.querySelector('.hero__img .icon-D'),
    letterShadow: page.querySelector('.hero__img .letter-shadow'),
    heroContent: page.querySelector('.hero__content'),
    heroSubttl: page.querySelector('.hero__subttl'),
    heroTitle: page.querySelector('.hero__title'),
    heroTitleEl: page.querySelector('.hero__title .title'),
    heroBtns: page.querySelectorAll('.hero__btn'),
    scrollDown: page.querySelector('.hero__scroll-down')
  };
  const animator = new PageAnimator(page);  
  animator.animate = () => {
    const tl = new TimelineLite();

    if (window.matchMedia('(min-width: 768px)').matches) {
      tl
        .fromTo(
          elements.letterWrap,
          1,
          { opacity: 0 },
          { opacity: 1 }
        )
        .call(() => {
          elements.letter.classList.add(ANIMATE);
        })
        .fromTo(
          elements.letterShadow,
          1,
          { opacity: 0, y: -30, x: 30 },
          { opacity: 1, y: 0, x: 0 }
        )
        .fromTo(
          elements.letterWrap,
          0.5,
          { x: '-100%' },
          { x: '0%' }
        )
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
        .staggerFromTo(
          elements.heroBtns,
          0.5,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0 },
          0.1
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
    } else {
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
        .staggerFromTo(
          elements.heroBtns,
          0.5,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0 },
          0.1
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
  };
  animator.init();

  // blocks animations
  // =================== table =======================
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
  // =================== table =======================

  // =================== slider =======================
  const slider = document.querySelector('.js-anim-in-vieport-with-gsap.testimonials-slider__wrap');

  if(slider) {
    const blockAnimator = new BlockAnimator(slider, {
      observer: {
        threshold: 0.4
      }
    });
    blockAnimator.animate = (entry, observer) => {
      const img = entry.target.querySelector('.testimonial__img');
      const imgCover = entry.target.querySelector('.testimonials-slider__img-cover');
      const IMG_ANIM_DURATION = 500;

      const tl = new TimelineLite({
        onComplete: () => {
          observer.unobserve(entry.target);
        }
      });

      tl        
        .call(() => {
          imgCover.classList.add(ANIMATE);
          setTimeout(() => {
            imgCover.classList.remove(ANIMATE);
            imgCover.classList.add('is-finishing-animate');
            entry.target.classList.add(SHOW);

            setTimeout(() => {
              imgCover.classList.remove('is-finishing-animate');              
            }, IMG_ANIM_DURATION);
          }, IMG_ANIM_DURATION);
        });
    };
    blockAnimator.init();
  };
  // =================== slider =======================
  
};
