import { debounce } from 'throttle-debounce';

export default function setCanvasNoise(argument) {
  const noise = () => {
    const wrap = document.querySelector('.js-noise');
    if(!wrap) return;
    
    let canvas, ctx;

    let WIDTH, HEIGHT;

    let noiseData = [];
    let frame = 0;

    let loopTimeout;


    // Create Noise
    const createNoise = () => {
      const idata = ctx.createImageData(WIDTH, HEIGHT);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.5) {
          buffer32[i] = 0xff000000;
        }
      }

      noiseData.push(idata);
    };


    // Play Noise
    const paintNoise = () => {
      if (frame === 9) {
        frame = 0;
      } else {
        frame++;
      }

      ctx.putImageData(noiseData[frame], 0, 0);
    };


    // Loop
    const loop = () => {
      paintNoise(frame);

      loopTimeout = window.setTimeout(() => {
        window.requestAnimationFrame(loop);
      }, (1000 / 25));
    };


    // Setup
    const setup = (wrap) => {
      WIDTH = wrap.offsetWidth;
      HEIGHT = wrap.offsetHeight;

      canvas.width = WIDTH;
      canvas.height = HEIGHT;

      for (let i = 0; i < 10; i++) {
        createNoise();
      }
      loop();
    };


    // Reset


    const setupDebounced = debounce(200, () => {
      setup(wrap);
    });

    window.addEventListener('resize', setupDebounced);


    // Init
    const init = (() => {      
      canvas = document.createElement('canvas');
      ctx = canvas.getContext('2d');
      wrap.appendChild(canvas);

      setup(wrap);
    })();
  };

  noise();
}
