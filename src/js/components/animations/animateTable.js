import BlockAnimator from './BlockAnimator';
import { TimelineLite } from 'gsap';

export default function animateTable() {
  const tables = [].slice.call(document.querySelectorAll('.js-anim-in-vieport-with-gsap.clients-table'));

  if(!tables.length) return;

  tables.forEach(table => {
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
  });    
};
