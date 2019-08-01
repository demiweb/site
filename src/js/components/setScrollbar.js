import PerfectScrollbar from 'perfect-scrollbar';
import { isWebkit } from '../helpers';

export default function setScrollbar() {
  const containers = [].slice.call(document.querySelectorAll('.js-scrollbar'));

  if(!containers) return;


  if(!isWebkit) {
    containers.forEach(container => {
      const ps = new PerfectScrollbar(container);
    });
  };  
};
