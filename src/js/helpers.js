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

export const {
  isAndroid,
  isCordova,
  isEdge,
  isFirefox,
  isChrome,
  isChromeIOS,
  isChromiumBased,
  isIE,
  isIOS,
  isOpera,
  isSafari
} = {
  isAndroid: /Android/.test(navigator.userAgent),
  isCordova: !!window.cordova,
  isEdge: /Edge/.test(navigator.userAgent),
  isFirefox: /Firefox/.test(navigator.userAgent),
  isChrome: /Google Inc/.test(navigator.vendor),
  isChromeIOS: /CriOS/.test(navigator.userAgent),
  isChromiumBased: !!window.chrome && !/Edge/.test(navigator.userAgent),
  isIE: /Trident/.test(navigator.userAgent),
  isIOS: /(iPhone|iPad|iPod)/.test(navigator.platform),
  isOpera: /OPR/.test(navigator.userAgent),
  isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent)
};

export const isWebkit = isChrome || isChromiumBased || isChromeIOS || isSafari || isAndroid || isIOS;
