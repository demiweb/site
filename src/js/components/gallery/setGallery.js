import { $DOC, $WIN, ACTIVE, ANIMATE, VISIBLE } from '../../constants';
import Animator from './Animator';
import { debounce } from 'throttle-debounce';
import BlockAnimator from '../animations/BlockAnimator';
import { TimelineLite } from 'gsap';
import '../../lib/touchevents';

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
    if (e.currentTarget === this.btns.prev) {
      this.next = this.current - 1;
    }else if (e.currentTarget === this.btns.next) {
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

    this.setLoopPagination();    

    this.animator = new Animator({
      slides: this.slides,
      current: this.current,
      next: this.next,
      cover: this.cover
    });
    this.animator.animate();

    this.current = this.next;    
  };

  _paginate() {
    this.btns.next.addEventListener('click', this.paginate.bind(this));
    this.btns.prev.addEventListener('click', this.paginate.bind(this));
    this.gallery.addEventListener('swl', this.paginate.bind(this));
    this.gallery.addEventListener('swr', this.paginate.bind(this));
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

  // animate gallery
  const gallery = document.querySelector('.js-anim-in-vieport-with-gsap.js-gallery');

  if(gallery) {
    const blockAnimator = new BlockAnimator(gallery, {
      observer: {
        threshold: 0.4
      }
    });
    blockAnimator.animate = (entry, observer) => {
      const img = entry.target.querySelector('.gallery__img');
      const imgCover = entry.target.querySelector('.gallery-cover');
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
