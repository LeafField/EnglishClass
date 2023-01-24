import "ress";
import "../styles/style.scss";

import "swiper/swiper-bundle.min.css";
import Swiper, { Pagination, EffectFade } from "swiper";
Swiper.use([Pagination, EffectFade]);

// ハンバーガーメニュー周りの実装
const hamburger = <HTMLDivElement>document.querySelector(".hamburger");
const menu = <HTMLDivElement>document.querySelector(".header__menu");

// ハンバーガーメニューのトグル
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
});

// リサイズした際メニューを閉じる
window.addEventListener("resize", () => {
  hamburger.classList.remove("active");
  menu.classList.remove("active");
});

// リンクをクリックした際もメニューを閉じる
const linkClickHundler = () => {
  hamburger.classList.remove("active");
  menu.classList.remove("active");
};

// linkClickHundlerをメニュー内のａタグに適用
const links: NodeListOf<HTMLAnchorElement> =
  document.querySelectorAll(".header__menu a");

links.forEach((link) => {
  link.addEventListener("click", linkClickHundler);
});

// スライダーの実装
const swiper = new Swiper(".swiper", {
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

// クリックしたら次のスライドへ
swiper.on("click", () => [swiper.slideNext()]);
