// import PageAnimator from './PageAnimator';
import BlockAnimator from './BlockAnimator';
import { TimelineLite } from 'gsap';
import { ANIMATE, VISIBLE } from '../../constants';
import { animateTable, addPortfolioContentOverflowVisible } from './commonAnimations';

export default function animateHome() {
  const page = document.querySelector('.page-home');
  if(!page) return;


  // blocks animations
  // =================== table =======================
  animateTable();
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
            entry.target.classList.add(VISIBLE);

            setTimeout(() => {
              imgCover.classList.remove('is-finishing-animate');              
            }, IMG_ANIM_DURATION);
          }, IMG_ANIM_DURATION);
        });
    };
    blockAnimator.init();
  };
  // =================== slider =======================

  // =================== portfolio =======================
  addPortfolioContentOverflowVisible();
  // =================== portfolio =======================  
};
