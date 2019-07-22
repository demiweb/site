import { ACTIVE, ANIMATE } from '../../constants';

export default class Animator {
  constructor({ current, next, slides, cover }) {
    this.current = current;
    this.next = next;
    this.slides = slides;
    this.ANIMATON_DURATION = 500;
    this.cover = cover;
  };

  animate() {
    this.cover.classList.add(ANIMATE);

    setTimeout(() => {
      this.cover.classList.remove(ANIMATE);
      this.cover.classList.add(Animator.classNames.FINISH_ANIMATE);

      this.slides[this.current].classList.remove(ACTIVE);
      this.slides[this.next].classList.add(ACTIVE);

      setTimeout(() => {
        this.cover.classList.remove(Animator.classNames.FINISH_ANIMATE);
      }, this.ANIMATON_DURATION);
    }, this.ANIMATON_DURATION);
  }
};

Animator.classNames = {
  FINISH_ANIMATE: 'is-finishing-animate'
};
