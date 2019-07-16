import { ACTIVE, ANIMATE } from '../../constants';

export default class Animator {
  constructor({ wrap, slides, current, next }) {
    this.slides = slides;
    this.current = current;
    this.next = next;
    this.currentSlide = slides[current];
    this.nextSlide = slides[next];
    this.ANIMATON_DURATION = 500;
    this.imgCover = wrap.querySelector(`.${Animator.classNames.imgCover}`);
  };

  animate() {
    this._toggleActiveClasses();
  };

  _toggleActiveClasses() {
    this.currentSlide.classList.add(ANIMATE);
    this.imgCover.classList.add(ANIMATE);
    setTimeout(() => {
      this.imgCover.classList.remove(ANIMATE);
      this.imgCover.classList.add(Animator.classNames.FINISH_ANIMATE);

      this.currentSlide.classList.remove(ANIMATE);
      this.currentSlide.classList.remove(ACTIVE);
      this.nextSlide.classList.add(ACTIVE);

      setTimeout(() => {
        this.imgCover.classList.remove(Animator.classNames.FINISH_ANIMATE);
      }, this.ANIMATON_DURATION);
    }, this.ANIMATON_DURATION);
    
  }
};

Animator.classNames = {
  imgCover: 'js-img-cover',
  FINISH_ANIMATE: 'is-finishing-animate'
};
