import IMask from 'imask';
// import { detect } from 'detect-browser';

export default function setInputMask() {
  // const browser = detect();
  // if( browser.name === 'ie') return;

  const maskedInputs = [].slice.call(document.querySelectorAll('.js-mask'));

  if(!maskedInputs.length) return;

  const options = {
    phone: {
      mask: '+{38}(000)000-00-00',
      lazy: false
    }
  };

  maskedInputs.forEach(input => {
    const type = input.dataset.maskInput;

    const mask = IMask(input, options[type]);
  });
};
