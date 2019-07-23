import { isInView } from '../helpers';
import { SHOW } from '../constants';

export default function addClassesOnScroll() {
  const els = [].slice.call(document.querySelectorAll('.js-vieport-related-el'));

  if(!els.length) return;

  els.forEach(el => {
    let threshold = el.getAttribute('data-threshold');
    let delay = el.getAttribute('data-delay');

    if (threshold) {
      threshold = +threshold;
    };
    if (delay) {
      delay = +delay;
    };

    if (threshold === null) {
      threshold = 0.25;
    } else {
      threshold = threshold;
    };

    if (delay === null) {
      delay = 0;
    } else {
      delay = delay;
    };
    
    isInView({
      el,
      onEnter: (entry, observer) => {
        setTimeout(() => {
          entry.target.classList.add(SHOW);
        }, delay);
      },
      options: {
        threshold: threshold
      }
    });
  });
};
