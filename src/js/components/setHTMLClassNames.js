import isTouch from '../lib/detectTouch';
import { NOTOUCH, READY } from '../constants';
import { detect } from 'detect-browser';

export function setTouch() {
  if (!isTouch()) {
    document.documentElement.classList.add(NOTOUCH);
  };
};

export function setReady() {
  document.documentElement.classList.add(READY);
};

export function setBrowser() {
  const browser = detect();

  if(browser.name === 'ie') {
    document.documentElement.classList.add('is-ie');
  };
};
