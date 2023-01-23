import "ress";
import "../styles/style.scss";

import "swiper/swiper-bundle.min.css";
import Swiper, { Pagination, EffectFade } from "swiper";
Swiper.use([Pagination, EffectFade]);

// ハンバーガーメニュー周りの実装
const hamburger = <HTMLDivElement>document.querySelector(".hamburger");
const menu = <HTMLDivElement>document.querySelector(".header__menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
});

window.addEventListener("resize", () => {
  hamburger.classList.remove("active");
  menu.classList.remove("active");
});

// スライダーの実装
new Swiper(".swiper", {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  modules: [Pagination, EffectFade],
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});
