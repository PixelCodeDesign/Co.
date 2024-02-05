const tabs = document.querySelectorAll(".services__tab");
const tabsContainer = document.querySelector(".services__tab-container");
const tab = document.querySelectorAll(".services__content");
const nav = document.querySelector(".navbar");
const navbar = document.querySelector(".navbar_elements");
const sections = document.querySelectorAll(".section");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");
const elementsToBlur = document.querySelectorAll(".blur-target");
const toggleButton = document.querySelector(".nav__menu");
const navMenu = document.querySelector(".menu__icon");

toggleButton.addEventListener("click", () => {
  navbar.classList.toggle("navbar_elements--visible");
  if (window.innerWidth < 1025) {
    elementsToBlur.forEach((element) => {
      element.classList.toggle("blur");
    });
  }
});

// External script file (script.js)
document.getElementById('goToWebsiteButton').addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = './other Pages/contact_form.html';
});

document.getElementById('goToWebsiteButtonlast').addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = './other Pages/contact_form.html';
});


// For close of Navbar visible
navbar.addEventListener("click", function () {
  navbar.classList.remove("navbar_elements--visible");
  if (window.innerWidth < 1025) {
    elementsToBlur.forEach((element) => {
      element.classList.toggle("blur");
    });
  }
});


//Tabbed container
tabsContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const clickedBtn = e.target.closest(".services__tab");
  if (!clickedBtn) return;
  tabs.forEach(function (e) {
    return e.classList.remove("services__tab--active");
  });
  clickedBtn.classList.add("services__tab--active");

  tab.forEach(function (e) {
    return e.classList.remove("services__content--active");
  });

  document
    .querySelector(`.services__content--${clickedBtn.dataset.tab}`)
    .classList.add("services__content--active");
});

// TypeWriter Effect
const textArray = [" with Modern Tools", " through Innovative Solutions"];

let index = 0;
let currentText = "";
let letterIndex = 0;

function type() {
  if (letterIndex < textArray[index].length) {
    currentText += textArray[index][letterIndex];
    document.getElementById(
      "typewriter"
    ).innerHTML = `<span id="constantText" class="typewriter__second-text">Revolutionizing Creativity</span><span class="typewriter__changing-text">${currentText}</span><span class="cursor"></span>`;
    letterIndex++;
    setTimeout(type, 100); // Adjust typing speed (milliseconds)
  } else {
    setTimeout(erase, 1000); // Wait before starting the next sentence
  }
}

function erase() {
  if (letterIndex > 0) {
    currentText = currentText.slice(0, -1);
    document.getElementById(
      "typewriter"
    ).innerHTML = `<span id="constantText">Revolutionizing Creativity</span>${currentText}<span class="cursor"></span>`;
    letterIndex--;
    setTimeout(erase, 50); // Adjust erasing speed (milliseconds)
  } else {
    index = (index + 1) % textArray.length;
    setTimeout(type, 500); // Wait before starting the next sentence
  }
}

document.addEventListener("DOMContentLoaded", type);

//Slider
const slides = document.querySelectorAll(".slide");
const sliderBtnRight = document.querySelector(".slider__btn--right");
const sliderBtnLeft = document.querySelector(".slider__btn--left");
const dotsConatiner = document.querySelector(".dots");
const dotBtn = document.querySelectorAll(".dots__dot");

let currSlide = 0;

const slideFn = function (slide) {
  slides.forEach(function (sl, i) {
    sl.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

const createDots = function (slide) {
  slides.forEach(function (sl, i) {
    dotsConatiner.insertAdjacentHTML(
      "beforeend",
      `<button  class="dots__dot" data-slide="${i}"></button>`
    );
  });
};
createDots();

const activeDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

activeDot(0);

const nextSliderFn = function () {
  if (currSlide === slides.length - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  slideFn(currSlide);
  activeDot(currSlide);
};
const prevSliderFn = function (e) {
  if (currSlide === 0) {
    currSlide = slides.length - 1;
  } else {
    currSlide--;
  }
  slideFn(currSlide);
  activeDot(currSlide);
};

setTimeout(nextSliderFn(), 100);
setInterval(nextSliderFn, 4000);

sliderBtnRight.addEventListener("click", nextSliderFn);
sliderBtnLeft.addEventListener("click", prevSliderFn);

document.addEventListener("keydown", function (e) {
  e.preventDefault();
  if (e.key === "ArrowRight") {
    nextSliderFn();
  } else if (e.key === "ArrowLeft") {
    prevSliderFn();
  }
});

dotsConatiner.addEventListener("click", function (el) {
  el.preventDefault();
  if (el.target.classList.contains("dots__dot")) {
    slideFn(el.target.dataset.slide);
    activeDot(el.target.dataset.slide);
  }
});

// Scrolling in the nav
const section1 = document.querySelector("#section--1");

document
  .querySelector(".btn--scroll-to")
  .addEventListener("click", function (e) {
    e.preventDefault();
    section1.scrollIntoView({
      behavior: "smooth",
    });
  });

document
  .querySelector(".navbar_elements")
  .addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.classList.contains("nav__link")) {
      const id = e.target.getAttribute("href");
      console.log(id);
      document.querySelector(id).scrollIntoView({
        behavior: "smooth",
      });
    }
  });

// Nav Button fade out animation
const handlerHover = function (e, opacity) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;

    // Use querySelector to directly select the necessary elements
    const navbar = document.querySelector(".navbar_elements");
    const logo = document.querySelector(".logo");

    if (navbar && logo) {
      const siblings = navbar.querySelectorAll(".nav__link");

      siblings.forEach(function (el) {
        if (el !== link) {
          el.style.opacity = opacity;
          logo.style.opacity = opacity;
        }
      });
    }
  }
};

nav.addEventListener("mouseover", (e) => handlerHover(e, 0.5));
nav.addEventListener("mouseout", (e) => handlerHover(e, 1));

// Sticky Nav
const navHeight = nav.getBoundingClientRect().height;
const headerCall = function (e) {
  const [entries] = e;

  if (!entries.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(headerCall, {
  root: null,
  threshold: 0.1,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

//Revealing Section
const sectionsCall = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");

  //When the section reveal it will stop revealing that again it will a good practice
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionsCall, {
  root: null,
  threshold: 0.2,
});

sections.forEach(function (sec) {
  sec.classList.add("section--hidden");
  sectionObserver.observe(sec);
});
clearInterval

// git init
// git add README.md
// git commit -m "first commit"
// git branch -M main
// git remote add origin https://github.com/PixelCodeDesign/Co..git
// git push -u origin main