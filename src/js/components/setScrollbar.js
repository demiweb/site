import PerfectScrollbar from 'perfect-scrollbar';
import { detect } from 'detect-browser';

export default function setScrollbar() {
  const containers = [].slice.call(document.querySelectorAll('.js-scrollbar'));

  if(!containers) return;

  const browser = detect();

  const webkit = browser.name === 'chrome'
      || browser.name === 'opera'
      || browser.name === 'safari'
      || browser.name === 'samsung'
      || browser.name === 'android'
      || browser.name === 'ios'
    ? true
    : false;

  if(!webkit) {
    containers.forEach(container => {
      const ps = new PerfectScrollbar(container);
    });
  };  
};
