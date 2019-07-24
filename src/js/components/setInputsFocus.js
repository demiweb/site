import { HASTEXT, FOCUS } from '../constants';

export default function setInputsFocus() {
  const inputs = [].slice.call(document.querySelectorAll('.js-input'));

  if(!inputs.length) return;

  inputs.forEach(input => {
    const wrap = input.parentNode;

    input.addEventListener('input', (e) => {
      if (e.currentTarget.value.length > 0) {
        wrap.classList.add(HASTEXT);
      } else {
        wrap.classList.remove(HASTEXT);
      };
    });

    input.addEventListener('focus', (e) => {
      wrap.classList.add(FOCUS);
    });

    input.addEventListener('blur', (e) => {
      wrap.classList.remove(FOCUS);
    });
  });
}
