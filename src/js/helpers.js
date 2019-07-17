import { debounce } from 'throttle-debounce';

export function getObjectValues(obj) {
  var res = [];
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      res.push(obj[i]);
    }
  }
  return res;
};

export function setVhProperty() {
  function setProperty() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  const setPropertyDebounced = debounce(66, setProperty);

  setProperty();
  window.addEventListener('resize', setPropertyDebounced);
};
