import AOS from 'aos';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import LazyLoad from 'vanilla-lazyload';
import 'aos/dist/aos.css';

/* ----------------------------------- */
/* ------ Custom ------ */
/* ----------------------------------- */
// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
});

(window as unknown as { lenis: Lenis }).lenis = lenis;

AOS.init({
  offset: 160,
  duration: 1200,
  once: false,
});

// //-- Detect Browser
// // 偵測瀏覽器加入對應 js 文件
// const $body = document.body;
// if (!isMobile()) {
//   const explorer = navigator.userAgent;
//   if (explorer.indexOf('Firefox') > -1 || explorer.indexOf('Chrome') > -1) {
//     const script = document.createElement('script');
//     script.src = 'js/SmoothScroll.min.js';
//     script.async = true;
//     $body.appendChild(script);
//   }
// }

//-- Btn Tag
// 抓取檔名
const pathname = location.pathname;
document.querySelectorAll('a').forEach((item) => {
  const href = item.getAttribute('href');
  if (!href || href.startsWith('#') || href === '##') return;
  if (item.origin !== location.origin) return;

  if (!item.hash && pathname === item.pathname) {
    item.classList.add('is-active');
  }
});

// Go Top
// function gotop(y, duration = 1000) {
//   const initialY = document.documentElement.scrollTop || document.body.scrollTop;
//   const baseY = (initialY + y) * 0.5;
//   const difference = initialY - baseY;
//   const startTime = performance.now();
//   const step = () => {
//     let normalizedTime = (performance.now() - startTime) / duration;
//     if (normalizedTime > 1) {
//       normalizedTime = 1;
//     }
//     window.scrollTo(0, baseY + difference * Math.cos(normalizedTime * Math.PI));
//     if (normalizedTime < 1) window.requestAnimationFrame(step);
//   };
//   window.requestAnimationFrame(step);
// }

/* ----------------------------------- */
/* ------ Plugin ------ */
/* ----------------------------------- */
const $lazyImgs = document.querySelectorAll<HTMLImageElement>('img.js-lazy');
$lazyImgs.forEach((item) => {
  // https://png-pixel.com/
  item.setAttribute(
    'src',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII=',
  );
});

// https://github.com/verlok/vanilla-lazyload
export const lazyLoad = new LazyLoad({
  // 自訂義 BEM class
  elements_selector: '.js-lazy',
  // 設定距離可視區(視窗)底部多遠觸發，官方預設是 300
  threshold: 500,
  callback_loaded: (el) => {
    AOS.refresh();

    // 只針對 parallax 元素做 refresh，避免滾動頻繁卡頓
    if (el.classList.contains('--parallax')) {
      ScrollTrigger.refresh();
    }
  },
});

gsap.registerPlugin(ScrollTrigger);

// 確保圖片都載入後在初始化視差滾動
window.addEventListener('load', () => {
  // 圖片視差滾動
  gsap.utils
    .toArray<HTMLElement>('[data-parallax-offset]')
    .forEach((wrapper) => {
      const img = wrapper.querySelector('img');

      if (!img) return;

      img.style.willChange = 'transform';

      const tl = gsap.timeline({
        defaults: { ease: 'linear' },
        scrollTrigger: {
          trigger: wrapper,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });

      const offset = Number(wrapper.dataset.parallaxOffset);
      img.style.setProperty('--parallax-offset', String(Math.abs(offset)));

      if (offset > 0) {
        tl.fromTo(img, { y: -1 * offset }, { y: 0 });
      } else {
        tl.fromTo(img, { y: 0 }, { y: offset });
      }
    });
});
