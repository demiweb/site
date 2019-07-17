import { throttle } from 'throttle-debounce';
import { FIXED, OUT } from '../constants';

class Header {
  constructor(header) {
    this.el = header;
  };

  init() {
    this.toggleThrottled = throttle(66, this.toggle);
    this.toggle();
    window.addEventListener('scroll', this.toggleThrottled.bind(this));
  };

  toggle(e) {
    const hero = document.querySelectorAll('section')[0];
    const heroHeight = hero.offsetHeight;

    if (window.pageYOffset >= heroHeight) {
      this.el.classList.add(FIXED);
      OUT.classList.add(Header.classNames.HAS_FIXED_HEADER);
    } else {
      this.el.classList.remove(FIXED);
      OUT.classList.remove(Header.classNames.HAS_FIXED_HEADER);
    };
  };
};

Header.classNames = {
  HAS_FIXED_HEADER: 'has-fixed-header'
};

export default function toggleHeader() {
  const header = document.querySelector('.js-header');

  if(!header) return;

  const hd = new Header(header);
  hd.init();
};
