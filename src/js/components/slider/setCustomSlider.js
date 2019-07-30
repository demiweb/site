import { ACTIVE, ANIMATE, VISIBLE } from '../../constants';
import { getObjectValues } from '../../helpers';
import Animator from './Animator';
import { debounce } from 'throttle-debounce';
import BlockAnimator from '../../components/animations/BlockAnimator';
import { TimelineLite } from 'gsap';
import '../../lib/touchevents';

class Slider {
  constructor(wrap) {
    this.slider = wrap.querySelector(`.${Slider.classNames.slider}`);
    this.wrap = wrap;
    this.slides = [].slice.call(wrap.querySelectorAll(`.${Slider.classNames.slide}`));
    this.current = 0;
    this.next = 0;
    this.btns = {};
    this.btns.next = wrap.querySelector(`.${Slider.classNames.prev}`);
    this.btns.prev = wrap.querySelector(`.${Slider.classNames.next}`);
  };

  init() {
    if(!this.slides.length) return;
    this._initFirstSlide();
    this._setSlidesPosition();
    this.setPositions = debounce(66, this._setSlidesPosition.bind(this));
    window.addEventListener('resize', this.setPositions);
    this._paginate();
  };

  setLoopPagination() {
    if (this.next > this.slides.length - 1) {
      this.next = 0;
    };
    if (this.next < 0) {
      this.next = this.slides.length - 1;
    };
  };

  paginateOnClick(e) {
    e.preventDefault();
    const btn = e.currentTarget;

    if (btn.classList.contains(Slider.classNames.prev)) {
      this.next = this.current - 1;
    } else if(btn.classList.contains(Slider.classNames.next)) {
      this.next = this.current + 1;
    };    
  };

  paginate(e) {
    if (e && e.type === 'click') {
      this.paginateOnClick(e);
    };

    if (e && e.type === 'swl') {
      this.next = this.current + 1;
    };

    if (e && e.type === 'swr') {
      this.next = this.current - 1;
    };

    this.setLoopPagination() ;

    this.animator = new Animator({
      wrap: this.wrap,
      slides: this.slides,
      current: this.current,
      next: this.next
    });
    this.animator.animate();

    this.current = this.next;
  };

  _setSlidesPosition() {
    const left = this.slides[0].getBoundingClientRect().left;

    this.slides.forEach(slide => {
      slide.style.transform = 'translate(0, 0)';
      const currTranslate = window.getComputedStyle(slide);
      const currentLeft = slide.getBoundingClientRect().left;
      const leftOffest = currentLeft - left;
      slide.style.transform = `translate(-${leftOffest}px, 0)`;
    });
  };

  _initFirstSlide() {
    this.slides[0].classList.add(ACTIVE);
  };

  _paginate() {
    getObjectValues(this.btns).forEach(btn => {
      btn.addEventListener('click', this.paginate.bind(this));
    });

    this.slider.addEventListener('swl', this.paginate.bind(this));
    this.slider.addEventListener('swr', this.paginate.bind(this));
  }
};

Slider.classNames = {
  prev: 'js-prev',
  next: 'js-next',
  wrap: 'custom-slider-wrap',
  slider: 'custom-slider',
  slide: 'custom-slide'
};

export default function setCustomSlider() {
  const sliders = [].slice.call(document.querySelectorAll('.js-slider-custom'));

  if(!sliders.length) return;

  sliders.forEach(slider => {
    const mySlider = new Slider(slider);
    mySlider.init();    
  });

  // animate slider
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
};
