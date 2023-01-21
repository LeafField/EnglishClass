import "ress";
import "../styles/style.scss";

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
