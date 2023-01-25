// リセットcss
import "ress";
// メインのスタイル
import "../styles/style.scss";

// swiper
import "swiper/swiper-bundle.min.css";
import Swiper, { Pagination, EffectFade } from "swiper";

/**--------------------------------------------------------
 * ハンバーガーメニュートグルの実装
----------------------------------------------------------- */

// 必要なDOMの取得
const hamburger = <HTMLDivElement>document.querySelector(".hamburger");
const menu = <HTMLDivElement>document.querySelector(".header__menu");
const links = <NodeListOf<HTMLAnchorElement>>(
  document.querySelectorAll(".header__menu a")
);
const headerTitle = <HTMLDivElement>document.querySelector(".header__title");

// ハンバーガーメニューのトグル
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  menu.classList.toggle("active");
});

// 特定のアクションに対してメニューを閉じるコールバック関数
const linkClickHundler = () => {
  hamburger.classList.remove("active");
  menu.classList.remove("active");
};

// リサイズした際メニューを閉じる
window.addEventListener("resize", linkClickHundler);

// linkClickHundlerをメニュー内のａタグに適用
links.forEach((link) => {
  link.addEventListener("click", linkClickHundler);
});

// linkClickHundlerをヘッダータイトルにも適用
headerTitle.addEventListener("click", linkClickHundler);

/**---------------------------------------------------------------
 * スライダーの実装
-----------------------------------------------------------------*/

// 必要なモジュールの登録
Swiper.use([Pagination, EffectFade]);

// swiperのイニシャライズ
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
  loop: true,
});

// クリックしたら次のスライドへ
swiper.on("click", () => [swiper.slideNext()]);

/**-----------------------------------------------------------
 * タブパネルの動作部分の実装
--------------------------------------------------------------*/

// タブの取得
const allTabs = <NodeListOf<HTMLDivElement>>(
  document.querySelectorAll(".course__tab--container")
);

// パネルの取得
const allPanels = <NodeListOf<HTMLDivElement>>(
  document.querySelectorAll(".course__panel")
);

// 各タブとパネルから一度activeクラスを取り除き、クリックしたタブとそれに対応するパネルにactiveクラスを付与
const tabHundler = (index: number) => {
  allTabs.forEach((tab) => tab.classList.remove("active"));
  allTabs[index].classList.add("active");
  allPanels.forEach((panel) => panel.classList.remove("active"));
  allPanels[index].classList.add("active");
};

// 各タブとパネルを連動
allTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => tabHundler(index));
});
