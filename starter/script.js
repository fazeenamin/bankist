'use strict';

///////////////////////////////////////
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const section1 = document.querySelector('#section--1');
const buttontoscroll = document.querySelector('.btn--scroll-to');

/////////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//BUTTON TO SCROLL

buttontoscroll.addEventListener('click', function (e) {
  // const cord1 = section1.getBoundingClientRect();
  // e.target.getBoundingClientRect();
  // window.scrollTo({
  //   left: cord1.left + window.scrollX,
  //   top: cord1.top + window.scrollY,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Page Navigation
//without delegation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     console.log('link');
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//with event Delegation

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);
  if (e.target.classList.contains('nav__link')) {
    // console.log('Hi');
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Tabbed Component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click', function (el) {
  const clicked = el.target.closest('.operations__tab');
  console.log(clicked);

  //guard condition
  if (!clicked) return;
  //remove classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));
  //Active tabs
  clicked.classList.add('operations__tab--active');
  //Active Content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Menu fade Animation

const nav = document.querySelector('.nav');
nav.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(e => {
      if (e !== link) e.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});

nav.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(e => {
      if (e !== link) e.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});
///more Dry

// const handleFade=function(e, opacity){
//   if (e.target.classList.contains('nav__link')) {
//     const link = e.target;
//     const siblings = link.closest('.nav').querySelectorAll('.nav__link');
//     const logo = link.closest('.nav').querySelector('img');

//     siblings.forEach(e => {
//       if (e !== link) e.style.opacity = opacity;
//     });
//     logo.style.opacity = opacity;
//   }
// };
// nav.addEventListener('mouseover', handleFade.bind(0.5));
// nav.addEventListener('mouseout', handleFade.bind(1));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Sticky Navigation

// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   if (this.window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

//.................better way.....................................
///.................template.....................................
// const obsCallback=function(entries, observer){

// }
// const obsObject={
//   root:null,
//   threshold:[0, 0.2]
// }
// const observer=new IntersectionObserver(obsCallback,obsObject);
// observer.observe(header);
//------------------------------------------------------------
const header = document.querySelector('.header');
const headerfunction = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headobject = {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
};
const headerObserver = new IntersectionObserver(headerfunction, headobject);
headerObserver.observe(header);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//.................................Reveal sections.................................................
const allSections = document.querySelectorAll('.section');
const sectionFunction = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObject = {
  root: null,
  threshold: 0.15,
};

const sectionObserver = new IntersectionObserver(
  sectionFunction,
  sectionObject
);
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//.................................slow loading images......................................
const imageLoading = document.querySelectorAll('img[data-src');
console.log(imageLoading);

const imagefunction = function (entries, observer) {
  const [entry] = entries;
  // console.log(entries);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function (e) {
    entry.target.classList.remove('lazy-img');
  });
  observer.unobserve(entry.target);
};
const imageObserver = new IntersectionObserver(imagefunction, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imageLoading.forEach(img => imageObserver.observe(img));
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//................................Slider Component............................................
const slides = document.querySelectorAll('.slide');
const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');
let curIndex = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"</button>`
    );
  });
};
createDots();

const activeDot = function (slide) {
  document
    .querySelectorAll('.dots__dot')
    .forEach(dot => dot.classList.remove('dots__dot--active'));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};
// slides.forEach((s, i) => {
//   s.style.transform = `translateX(${100 * i}%)`;
// });

const gotoSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
gotoSlide(0);

const previousSlide = function () {
  if (curIndex === 0) {
    curIndex = maxSlide - 1;
  } else {
    curIndex--;
  }
  gotoSlide(curIndex);
  activeDot(curIndex);
};
const nextSlide = function () {
  if (curIndex === maxSlide - 1) {
    curIndex = 0;
  } else {
    curIndex++;
  }
  gotoSlide(curIndex);
  activeDot(curIndex);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', previousSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') previousSlide();
});

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide;
    gotoSlide(slide);
    activeDot(slide);
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Creating and Deleting Element / adding/removing classes  / adding html  // adding styles and removing Elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent =
//   'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, consequatur.';
// message.innerHTML = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, consequatur. <button class='btn' > Submit</button>`;
// header.prepend(message);
// console.log(message);
// console.log(document.getElementsByClassName('btn'));
// message.style.width = '110%';
// message.style.padding = '10px';
// document.querySelector('.btn').addEventListener('click', function (e) {
//   message.remove();
// });
// message.style.backgroundColor = '#37383d';
// header.append(message);
// console.log(message.classList.contains('cookie-message'));
// const h1 = document.querySelector('h1');
// const alert1 = function (e) {
//   alert(
//     'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, consequatur.'
//   );
// };

// h1.addEventListener('mouseenter', alert1);
