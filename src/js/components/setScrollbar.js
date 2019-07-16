import PerfectScrollbar from 'perfect-scrollbar';

export default function setScrollbar() {
  const containers = [].slice.call(document.querySelectorAll('.js-scrollbar'));

  if(!containers) return;

  containers.forEach(container => {
    const ps = new PerfectScrollbar(container);
  });
};
