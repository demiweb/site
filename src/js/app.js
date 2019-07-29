import 'intersection-observer';

import { setVhProperty } from './helpers';
import { setTouch, setReady, setBrowser } from './components/setHTMLClassNames';
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
import setAccordion from './components/setAccordion';
import setPopups from './components/setPopups';
import setInputMask from './components/setInputMask';
import splitToChars from './components/splitToChars';

$(function() {
  // sayHello();
  setTouch();
  setReady();
  setVhProperty();
  setBrowser();
  setLazy();
  splitToChars();
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
  setAccordion();
  setPopups();
  setInputMask();

});
