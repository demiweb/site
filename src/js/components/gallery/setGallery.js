import { $DOC, $WIN, ACTIVE, ANIMATE } from '../../constants';
import Animator from './Animator';
import { debounce } from 'throttle-debounce';

import lightGallery from 'lightgallery';
import 'lg-zoom';
import 'lg-fullscreen';
import 'lg-autoplay';
import 'lg-share';
import 'lg-thumbnail';
import 'lg-video';

class Gallery {
  constructor(gallery) {
    this.gallery = gallery;
    this.btns = {};
    this.btns.next = gallery.querySelector('.js-next');
    this.btns.prev = gallery.querySelector('.js-prev');
    this.slides = [].slice.call(gallery.querySelectorAll('.gallery-img'));
    this.cover = gallery.querySelector('.gallery-cover');
    this.current = 0;    
  };

  init() {
    this.slides[0].classList.add(ACTIVE);

    this.btns.next.addEventListener('click', this.paginate.bind(this));
    this.btns.prev.addEventListener('click', this.paginate.bind(this));
  };

  paginate(e) {
    e.preventDefault();
    if (e.currentTarget === this.btns.prev) {
      this.next = this.current - 1;
    }else if (e.currentTarget === this.btns.next) {
      this.next = this.current + 1;
    };

    if (this.next > this.slides.length - 1) {
      this.next = 0;
    };
    if (this.next < 0) {
      this.next = this.slides.length - 1;
    };

    this.animator = new Animator({
      slides: this.slides,
      current: this.current,
      next: this.next,
      cover: this.cover
    });
    this.animator.animate();

    this.current = this.next;    
  };  
};


export default function setGallery() {
  function setLightgallery() {
    const $lg = $('.js-lightgallery');
    if(!$lg.length) return;

    $lg.lightGallery({
      exThumbImage: 'data-exthumbimage'
    }); 
  };
  function setMyGallery() {
    const gallerys = [].slice.call(document.querySelectorAll('.js-gallery'));

    if(!gallerys.length) return;

    gallerys.forEach(gallery => {
      const gal = new Gallery(gallery);
      gal.init();
    });
  };

  setLightgallery();
  setMyGallery();
};
