import { ACTIVE } from '../../constants';
import { getObjectValues } from '../../helpers';
import Animator from './Animator';

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
    this._paginate();
  };

  _setSlidesPosition() {
    const left = this.slides[0].getBoundingClientRect().left;

    this.slides.forEach(slide => {
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
      btn.addEventListener('click', e => {
        if (btn.classList.contains(Slider.classNames.prev)) {
          this.next = this.current - 1;
        } else if(btn.classList.contains(Slider.classNames.next)) {
          this.next = this.current + 1;
        };        

        if (this.next > this.slides.length - 1) {
          this.next = 0;
        };
        if (this.next < 0) {
          this.next = this.slides.length - 1;
        };        

        this.animator = new Animator({
          wrap: this.wrap,
          slides: this.slides,
          current: this.current,
          next: this.next
        });
        this.animator.animate();

        this.current = this.next;
      });
    });
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
  
};
