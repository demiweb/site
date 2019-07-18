export default class BlockAnimator {
  constructor(block, options) {
    this.block = block;
    this.observerOptions = options ? options.observer : {};
  };

  _animateBlock(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (this.animate) {
          this.animate(entry, observer);
        };
      };
    });
  };

  init() {
    this.observer = new IntersectionObserver(this._animateBlock.bind(this), this.observerOptions);
    this.observer.observe(this.block);
  };
};
