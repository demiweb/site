import { $DOC, ACTIVE } from '../constants';
import isTouch  from '../lib/detectTouch';

class Tooltip {
  constructor() {
    this.$btns = $(`.${Tooltip.classNames.btn}`);
    if(!this.$btns.length) return;
    this.$tooltips = this.$btns.next();
  };

  init() {
    if(!isTouch) return;

    $DOC.on('click', `.${Tooltip.classNames.btn}`, this.toggle.bind(this));
    $DOC.on('click', this._closeOnDocClick.bind(this));
  };

  toggle(e) {
    e.preventDefault();
    e.stopPropagation();
    this.$btn = $(e.currentTarget);
    this.$tooltip = this.$btn.next();
    this.$wrap = this.$btn.parent();

    this.$tooltip.toggleClass(ACTIVE);    
  };

  close() {
    this.$tooltips.removeClass(ACTIVE);
  };

  _closeOnDocClick(e) {
    if (!$(e.target).closest(this.$tooltip).length) {
      this.close();
    };
  }
};

Tooltip.classNames = {
  btn: 'js-tooltip'
};

export default function toggleTooltip() {
  const tooltip = new Tooltip();
  tooltip.init();
};
