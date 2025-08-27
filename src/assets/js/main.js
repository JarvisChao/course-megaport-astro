/* ----------------------------------- */
/* ------ Custom ------ */
/* ----------------------------------- */
// 判斷是否為移動端
function isMobile() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) {
    return false;
  }
}

// Initialize Lenis
const lenis = new Lenis({
  autoRaf: true,
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
const a = document.querySelectorAll('a');
a.forEach(function(item) {
  // const href = el.pathname + el.hash;
  const href = item.getAttribute('href');
  if (pathname.includes(href)) {
    item.classList.add('is-active');
  }
});

// Navbar
const burgerEl = document.querySelector('.o-burger');
const navEl = document.querySelector('.c-nav');

let isMenuOpened = false;
burgerEl.addEventListener('click', function() {
  // if (isMenuOpened) isMenuOpened = false;
  // else isMenuOpened = true;

  // toggle 開關
  isMenuOpened = !isMenuOpened

  if (isMenuOpened) {
    // this 會指向 burgerEl
    lenis.stop();
    this.classList.add('is-opened');
    navEl.classList.add('is-opened');
  } else {
    lenis.start();
    this.classList.remove('is-opened');
    navEl.classList.remove('is-opened');
  }
});

window.matchMedia('(min-width: 1400px)').addEventListener('change', function(e) {
  if (isMenuOpened) {
    if (e.matches) {
      lenis.start();
    } else {
      lenis.stop();
    }
  }
})

// 滾動至 news 時改變背景顏色
const $news = document.querySelector('.l-home-news');
window.addEventListener('scroll', function() {
  if ($news !== null) {
    // $news.getBoundingClientRect().top => news 頂到視窗上緣後會是負數
    const newsTop = $news.getBoundingClientRect().top;
    const enter = newsTop < 100;
    // $news.offsetHeight => news 元素的高
    const beforeLeave = newsTop * -1 < $news.offsetHeight / 3
    if (enter && beforeLeave) {
      $body.classList.add('is-news-active');
    } else {
      $body.classList.remove('is-news-active');
    }
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
const $lazyImgs = document.querySelectorAll('img.js-lazy');
$lazyImgs.forEach(function(item) {
  // https://png-pixel.com/
  item.setAttribute(
    'src',
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAQAAAAe/WZNAAAADklEQVR42mNkgAJGDAYAAFEABCaLYqoAAAAASUVORK5CYII='
  );
});
// https://github.com/verlok/vanilla-lazyload
const lazyLoad = new LazyLoad({
  // 自訂義 BEM class
  elements_selector: '.js-lazy',
  // 設定距離可視區(視窗)底部多遠觸發，官方預設是 300
  threshold: 500,
  callback_loaded: function() {
    AOS.refresh();
  }
});

//-- gsap.js
// const shapePath = [
//   { d: 'M101.984 0L1486.33 178.762L1270.23 788.591L0 829.293L101.984 0Z' },
//   { d: 'M0 182.409L1498.74 0L1292.37 872.121L89.854 756.921L0 182.409Z' },
//   { d: 'M188.265 0L1441.82 45.919L1399.71 744.419L0 846.809L188.265 0Z' },
// ];
// function shapeAni(index) {
//   gsap.to('#banner-shape path', {
//     attr: { d: shapePath[index].d },
//     duration: 1.6,
//     ease: 'power1.out',
//   })
// }

//-- Parallax
const $parallaxes = document.querySelectorAll('.js-parallax');
$parallaxes.forEach(function(item) {
  new Parallax(item, {
    // 滑鼠進入指定元素內才生效
    hoverOnly: true,
    // 滑鼠相對於指定元素（false 預設為可視區）
    relativeInput: true,
  })
});

// Gsap
gsap.registerPlugin(ScrollTrigger);
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.c-blockade', // 觸發點
    start: 'top center', // 觸發點上方、視窗中心交會時觸發
    end: 'bottom 20%', // 觸發點底部、視窗 20% 處交會時結束
    scrub: true, // 隨滑鼠滾動
  },
  ease: 'none'
});

const $blockadeTexts = document.querySelectorAll('.c-blockade__text');
tl.to($blockadeTexts[0], { x: '-110vw' }, 'startLabel');
tl.to($blockadeTexts[1], { x: '100vw' }, 'startLabel+=5%');
tl.to($blockadeTexts[2], { x: '-60vw' }, 'startLabel+=5%');
tl.to($blockadeTexts[3], { x: '90vw' }, 'startLabel+=10%');

// 確保圖片都載入後在初始化視差滾動
window.addEventListener('load', function() {
  // 圖片視差滾動
  gsap.utils.toArray('[data-parallax-offset]').forEach(mask => {
    const wrapper = mask;
    const img = wrapper.querySelector('img');
    
    img.style.willChange = 'transform';
  
    const tl = gsap.timeline({
      defaults: { ease: 'linear' },
      scrollTrigger: {
        trigger: wrapper,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  
    const offset = Number(wrapper.dataset.parallaxOffset);
    img.style.setProperty('--parallax-offset', Math.abs(offset));
  
    if (offset > 0) {
      tl.fromTo(img, { y: -1 * offset }, { y: 0 });
    } else {
      tl.fromTo(img, { y: 0 }, { y: offset });
    }
  });
});
