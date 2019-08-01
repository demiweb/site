
// import Rellax from 'rellax';
import Parallax from 'parallax-js';
import isTouch from '../lib/detectTouch';

export default function setParallax() {
  function initRellax() {
    const els = document.querySelectorAll('.js-parallax-scroll');
    if(!els.length) return;

    // var rellax = new Rellax('.js-parallax-scroll', {
    //   speed: 0.1,
    //   center: false,
    //   wrapper: null,
    //   round: true,
    //   vertical: true,
    //   horizontal: false
    // });
  };

  function initParallaxJs() {
    const scenes = [].slice.call(document.querySelectorAll('.js-parallax-scene'));
    if(!scenes.length) return;

    scenes.forEach(scene => {
      const parallaxInstance = new Parallax(scene, {
        relativeInput: true
      });
    }); 
  };

  if(!isTouch) {
    initParallaxJs();
  };
  
  initRellax();
  
};
