import { isInView } from '../helpers';
import { SHOW } from '../constants';

export default function addClassesOnScroll() {
  const els = [].slice.call(document.querySelectorAll('.js-vieport-related-el'));

  if(!els.length) return;

  els.forEach(el => {
    let threshold = el.getAttribute('data-threshold');

    if (threshold) {
      threshold = +threshold;
    };

    if (threshold === null) {
      threshold = 0.25;
    } else {
      threshold = threshold;
    };
    
    isInView({
      el,
      onEnter: (entry, observer) => {
        entry.target.classList.add(SHOW);
      },
      options: {
        threshold: threshold
      }
    });
  });
};
