import { $DOC, $HTMLBODY, ACTIVE, OUT } from '../constants';

export default function scrollTo() {
  const btn = 'js-scroll-to-btn';

  $DOC.on('click', `.${btn}`, (e) => {
    e.preventDefault();
    const id = $(e.currentTarget).attr('href');
    const $target = $(`[data-scroll-to-target="${id}"]`);
    let OFFSET = 0;

    console.log(OUT);

    if ($(OUT).hasClass('has-fixed-header')) {
      OFFSET = 75;
    };
    
    if ($(OUT).hasClass('has-fixed-header') && window.matchMedia('(max-width: 767px)').matches) {
      OFFSET = 50;
    };

    $HTMLBODY.animate({
      scrollTop: $target.offset().top - OFFSET
    }, 1000);
  });
};
