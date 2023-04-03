import { genrateCardsData } from "./generateCards.js";
import { renderCards } from "./renderCards.js";

export function pagination() {
  const paginationList = document.querySelector(".our-friends__pagination");
  const startBtn = document.querySelector(".btn-start");
  const prevBtn = document.querySelector(".btn-prev");
  const nextBtn = document.querySelector(".btn-next");
  const endBtn = document.querySelector(".btn-end");
  const numberBtn = document.querySelector(".our-friends__pagination-number");

  let page = 1;
  let cardsOnPage = 8;
  let totalPages = 6;

  if (window.innerWidth >= 1280) {
    cardsOnPage = 8;
    totalPages = 6;
  } else if (window.innerWidth < 1280 && window.innerWidth >= 660) {
    cardsOnPage = 6;
    totalPages = 8;
  } else if (window.innerWidth < 660) {
    cardsOnPage = 3;
    totalPages = 16;
  }

  const fullData = genrateCardsData(cardsOnPage);

  paginationList.addEventListener("click", (e) => {
    if (e.target.closest(".btn-start")) page = 1;
    if (e.target.closest(".btn-prev")) page--;
    if (e.target.closest(".btn-next")) page++;
    if (e.target.closest(".btn-end")) page = totalPages;
    renderCards(cardsOnPage, fullData, page);
    updatePagination();
  });

  function updatePagination() {
    if (page === 1) {
      startBtn.setAttribute("disabled", true);
      prevBtn.setAttribute("disabled", true);
      nextBtn.removeAttribute("disabled");
      endBtn.removeAttribute("disabled");
    } else if (page === totalPages) {
      startBtn.removeAttribute("disabled");
      prevBtn.removeAttribute("disabled");
      nextBtn.setAttribute("disabled", true);
      endBtn.setAttribute("disabled", true);
    } else if (page > 1 && page < totalPages) {
      startBtn.removeAttribute("disabled");
      prevBtn.removeAttribute("disabled");
      nextBtn.removeAttribute("disabled");
      endBtn.removeAttribute("disabled");
    }
    numberBtn.textContent = page;
  }

  renderCards(cardsOnPage, fullData, page);
  updatePagination();
}
