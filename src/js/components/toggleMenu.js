import { $DOC, $BODY, ACTIVE, NOSCROLL } from '../constants';

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
    console.log('hello from onToggle menu', { $burger, $target });
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
