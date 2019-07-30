import { isInView } from '../../helpers';
import { TimelineLite } from 'gsap';

export default function animateTeam() {
  const teams = [].slice.call(document.querySelectorAll('.team'));

  if(!teams.length) return;

  teams.forEach(wrap => {
    isInView({
      el: wrap,
      onEnter: (entry, observer) => {
        const blocks = entry.target.querySelectorAll('.specialist');
        const imgs = entry.target.querySelectorAll('.specialist__img');
        const imgWraps = entry.target.querySelectorAll('.overlayed');
        const captions = entry.target.querySelectorAll('.specialist__bottom');

        if(!blocks.length) return;

        const tl = new TimelineLite();

        tl
          .call(() => {
            const covers = [].slice.call(imgWraps);
            covers.forEach(cover => {
              cover.classList.add('overlayedLeft');
            });
          })
          .staggerFromTo(
            imgs,
            0.5,
            { opacity: 0 },
            { opacity: 1 },
            0,
            '+=.5'
          )
          .staggerFromTo(
            captions,
            0.5,
            { y: 15, opacity: 0 },
            { y: 0, opacity: 1 },
            0,
            '-=.5'
          );
      }
    });
  });
};
