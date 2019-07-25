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

  // =================== animateTeam =======================
  animateTeam();
  // =================== animateTeam =======================


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
