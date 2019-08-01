import isTouch from '../lib/detectTouch';
import { NOTOUCH, READY } from '../constants';
import { isIE } from '../helpers';

export function setTouch() {
  if (!isTouch) {
    document.documentElement.classList.add(NOTOUCH);
  };
};

export function setReady() {
  document.documentElement.classList.add(READY);
};

export function setBrowser() {
  if(isIE) {
    document.documentElement.classList.add('is-ie');
  };
};
