export default class PageAnimator {
  constructor(page) {
    this.page = page;
  };

  init() {
    if(!this.page) return;
    if(this.animate) {
      this.animate();
    };
  };
};
