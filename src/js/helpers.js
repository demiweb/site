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

export function isInView({ el, onEnter, once = true, options }) {
  if (!options) {
    options = {
      threshold: 0.25
    };
  };

  function callback(entries, observer) {
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        onEnter(entry, observer);

        if (once) {
          observer.unobserve(entry.target);
        };
      };
    });
  };
  const observer = new IntersectionObserver(callback, options);
  observer.observe(el);
};
