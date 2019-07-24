import 'intersection-observer';

import { setVhProperty } from './helpers';
import setTouchClassName from './components/setTouchClassName';
// import sayHello from './lib/sayHello';
import setLazy from './components/setLazy';
import setCustomSlider from './components/slider/setCustomSlider';
import setScrollbar from './components/setScrollbar';
import toggleMenu from './components/toggleMenu';
import scrollTo from './components/scrollTo';
import toggleHeader from './components/toggleHeader';
import setAnimations from './components/animations/setAnimations';
import animateOnScroll from './components/animeteOnScroll';
import addClassesOnScroll from './components/addClassesOnScroll';
import setParralax from './components/setParralax';
import setGallery from './components/gallery/setGallery';
import setTextareaAutoHeight from './components/setTextareaAutoHeight';
import setInputsFocus from './components/setInputsFocus';

$(function() {
  // sayHello();
  setTouchClassName();
  setVhProperty();
  setLazy();
  setCustomSlider();
  setScrollbar();
  toggleMenu();
  scrollTo();
  toggleHeader();
  setAnimations();
  animateOnScroll();
  addClassesOnScroll();
  setParralax();
  setGallery();
  setTextareaAutoHeight();
  setInputsFocus();
});
