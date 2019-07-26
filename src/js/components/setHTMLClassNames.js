import isTouch from '../lib/detectTouch';
import { $HTML, NOTOUCH, READY } from '../constants';

export function setTouch() {
  if (!isTouch()) {
    $HTML.addClass(NOTOUCH);
  };
};

export function setReady() {
  $HTML.addClass(READY);
};

export function setBrowser() {
  
};
