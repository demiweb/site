import isTouch from '../lib/detectTouch';
import { $HTML, NOTOUCH, READY } from '../constants';
import { detect } from 'detect-browser';

export function setTouch() {
  if (!isTouch()) {
    $HTML.addClass(NOTOUCH);
  };
};

export function setReady() {
  $HTML.addClass(READY);
};

export function setBrowser() {
  const browser = detect();

  if(browser.name === 'ie') {
    $HTML.addClass('is-ie');
  };
};
