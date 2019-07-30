import { TimelineLite } from 'gsap';
import { isInView } from '../../helpers';

export default function animateStagger() {
  const numbersWraps = [].slice.call(document.querySelectorAll('.js-stagger'));

  if(!numbersWraps.length) return;

  numbersWraps.forEach(wrap => {
    isInView({
      el: wrap,
      onEnter: (entry, observer) => {
        const blocks = entry.target.querySelectorAll('.js-stagger-el');
        let itDelay = entry.target.getAttribute('data-iteration-delay');

        if (itDelay) {
          itDelay = +itDelay;
        };

        if (itDelay === null) {
          itDelay = 0.2;
        } else {
          itDelay = itDelay;
        };

        if(!blocks) return;
        const tl = new TimelineLite();
        tl
          .staggerFromTo(
            blocks,
            0.5,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0 },
            itDelay
          );
      }
    });
  });
};
