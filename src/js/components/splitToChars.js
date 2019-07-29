import Splitter from 'split-html-to-chars';

export default function splitToChars() {
  const words = [].slice.call(document.querySelectorAll('.js-splitme'));

  if(!words.length) return;

  words.forEach(word => {
    word.outerHTML = Splitter(word.outerHTML, '<span class="letter">$</span>');
  });
};
