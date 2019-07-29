import { $DOC, $HTMLBODY, ACTIVE, OUT } from '../constants';

export default function scrollTo() {
  const btn = 'js-scroll-to-btn';
  const toTopBtn = 'js-scroll-to-top';
  const toNextBtn = 'js-scroll-to-next';

  function scrollToTop(e) {
    e.preventDefault();
    $HTMLBODY.animate({
      scrollTop: 0
    }, 1000);
  };

  function scrollToNext(e) {
    e.preventDefault();
    let OFFSET = 0;
    const $target = $(e.currentTarget).closest('section').next('section');

    if ($(OUT).hasClass('has-fixed-header')) {
      OFFSET = 75;
    };
    
    if ($(OUT).hasClass('has-fixed-header') && window.matchMedia('(max-width: 767px)').matches) {
      OFFSET = 50;
    };

    $HTMLBODY.animate({
      scrollTop: $target.offset().top - OFFSET
    }, 1000);

  };

  $DOC.on('click', `.${toTopBtn}`, scrollToTop);
  $DOC.on('click', `.${toNextBtn}`, scrollToNext);
};
