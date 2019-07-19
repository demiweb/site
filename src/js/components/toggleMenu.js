import { $DOC, $BODY, ACTIVE, NOSCROLL } from '../constants';
import { TimelineLite } from 'gsap';

class Burger {
  init() {
    $DOC.on('click', `.${Burger.classNames.burger}`, this.toggle.bind(this));
  };

  toggle(e) {
    e.preventDefault();

    const name = e.currentTarget.getAttribute('data-menu-target');
    const $target = name 
      ? $(`.${Burger.classNames.menu}[data-menu="${name}"]`)
      : $(`.${Burger.classNames.menu}`);

    $(e.currentTarget).toggleClass(ACTIVE);
    $target.toggleClass(ACTIVE);

    if (this.onToggle) {
      this.onToggle($(e.currentTarget), $target);
    };
  };

  close() {
    const $burgers = $(`.${Burger.classNames.burger}`);
    const $targets = $(`.${Burger.classNames.menu}`);

    if ($burgers.length > 0 && $targets.length > 0) {
      $burgers.removeClass(ACTIVE);
      $targets.removeClass(ACTIVE);
      
      if (this.onClose) {
        this.onClose($burgers, $targets);
      };
    };   
  };
};

Burger.classNames = {
  burger: 'js-burger',
  menu: 'js-menu'
};

export default function toggleMenu() {
  const burger = new Burger();
  burger.onToggle = ($burger, $target) => {
    $BODY.toggleClass(NOSCROLL);

    const $navLgLinks = $target.find('.nav--lg li');
    const $navSmLinks = $target.find('.nav--sm li');
    const $navSmTitle = $target.find('.menu__title');
    const $contacts = $target.find('.contact');
    const $btn = $target.find('.contacts__btn');
    const $top = $target.find('.menu__top');
    const $social = $target.find('.social li');
    const $word = $target.find('.word');

    const tl  = new TimelineLite();

    tl
      .fromTo(
        $word,
        1,
        { opacity: 0 },
        { opacity: 1},
        '+=.5'
      )
      .staggerFromTo(
        $navLgLinks,
        0.4,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0 },
        0.1,
        '-=.3'
      )
      .fromTo(
        $navSmTitle,
        0.4,
        { opacity: 0 },
        { opacity: 1 },
        '-=.4'
      )
      .staggerFromTo(
        $navSmLinks,
        0.4,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0 },
        0.1,
        '-=.4'
      )
      .staggerFromTo(
        $contacts,
        0.4,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0 },
        0.1,
        '-=.4'
      )
      .fromTo(
        $btn,
        0.4,
        { x: '150%' },
        { x: '0%' }
      )
      .fromTo(
        $top,
        0.4,
        { y: '-100%' },
        { y: '0%' },
        '-=.4'
      )
      .staggerFromTo(
        $social,
        0.4,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0 },
        0.1,
        '-=.4'
      );



    // console.log('hello from onToggle menu', { $burger, $target });
  };
  burger.onClose = ($burgers, $targets) => {
    console.log('hello from onCLose menu', { $burgers, $targets });
  };
  burger.init();

  const closeBtn = 'js-menu-close';

  $DOC.on('click', `.${closeBtn}`, (e) => {
    e.preventDefault();
    $BODY.removeClass(NOSCROLL);
    burger.close();    
  });
};
