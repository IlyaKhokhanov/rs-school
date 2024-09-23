import data from "./pets.json" with { type: "json" };

export function carousel() {
  const prevBtn = document.querySelector(".carousel__btn-prev");
  const nextBtn = document.querySelector(".carousel__btn-next");

  prevBtn.addEventListener("click", clickHandler);
  nextBtn.addEventListener("click", clickHandler);

  let cardsOnPage = 3;
  let lastBtn = null;
  let arrCards = [];

  if (window.innerWidth >= 1173) {
    cardsOnPage = 3;
  } else if (window.innerWidth < 1173 && window.innerWidth >= 743) {
    cardsOnPage = 2;
  } else if (window.innerWidth < 743) {
    cardsOnPage = 1;
  }

  genrateCardsData(cardsOnPage);
  renderCards(cardsOnPage);

  function genrateCardsData(quantity) {
    let arrQuant = [];
    while (arrQuant.length < quantity) {
      let num = randomNumber();
      if (!arrCards.includes(num) && !arrQuant.includes(num)) {
        arrQuant.push(num);
      }
    }
    arrCards.push(...arrQuant);
  }

  function renderCards(cardsOnPage, btn) {
    const list = document.querySelector(".carousel__list");
    let cards = "";

    if (arrCards.length === cardsOnPage && lastBtn === null) {
      genrateCardsData(cardsOnPage);
      lastBtn = btn;
    } else if (lastBtn !== btn) {
      lastBtn = btn;
      arrCards.reverse();
    } else if (lastBtn === btn) {
      lastBtn = btn;
      arrCards.splice(0, cardsOnPage);
      genrateCardsData(cardsOnPage);
    }

    let cardsData = arrCards.slice(-cardsOnPage);

    cardsData
      .map((item) => data[item - 1])
      .forEach((item) => {
        cards += `
      <li class="carousel__item" data-id="${item.id}">
        <img class="carousel__item-img" src="${item.imgCard}"/>
        <div class="carousel__item-name">${item.name}</div>
        <button class="carousel__item-btn">Learn more</button>
      </li>
      `;
      });
    list.innerHTML = cards;
  }

  function clickHandler(e) {
    let target = e.target.closest(".carousel__btn");
    renderCards(cardsOnPage, target);
  }
}

function randomNumber() {
  return Math.round(Math.random() * (8 - 1) + 1);
}
