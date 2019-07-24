// import PageAnimator from './PageAnimator';
import BlockAnimator from './BlockAnimator';
import { TimelineLite } from 'gsap';
import { ANIMATE, VISIBLE } from '../../constants';
import { animateTable, animateTeam } from './commonAnimations';
import { isInView } from '../../helpers';

export default function animateHome() {
  const page = document.querySelector('.page-about');
  if(!page) return;


  // blocks animations
  // =================== table =======================
  animateTable();
  // =================== table =======================

  // =================== numbers section =======================
  
  // =================== numbers section =======================

  // =================== animateTeam =======================
  animateTeam();
  // =================== animateTeam =======================

  // =================== principles =======================
  const principles = [].slice.call(document.querySelectorAll('.principles'));

  if(principles.length > 0) {
    principles.forEach(wrap => {
      isInView({
        el: wrap,
        onEnter: (entry, observer) => {
          const blocks = entry.target.querySelectorAll('.principle');

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
  // =================== principles =======================

  // =================== gallery =======================
  const gallery = document.querySelector('.js-anim-in-vieport-with-gsap.js-gallery');

  if(gallery) {
    const blockAnimator = new BlockAnimator(gallery, {
      observer: {
        threshold: 0.4
      }
    });
    blockAnimator.animate = (entry, observer) => {
      const img = entry.target.querySelector('.gallery__img');
      const imgCover = entry.target.querySelector('.gallery-cover');
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
  // =================== gallery =======================
};
