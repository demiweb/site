export default function addPortfolioContentOverflowVisible() {
  const portfolioItems = [].slice.call(document.querySelectorAll('.js-vieport-related-el.portfolio-item'));

  if(!portfolioItems.length) return;

  portfolioItems.forEach(item => {
    const content = item.querySelector('.portfolio-item__content-inner');

    content.addEventListener('transitionend', (e) => {
      const contentWrap = e.currentTarget.parentNode.classList.contains('portfolio-item__content') ? e.currentTarget.parentNode : null;

      if (!contentWrap) return;

      contentWrap.classList.add('overflow-visible');
    });      
  });
};
