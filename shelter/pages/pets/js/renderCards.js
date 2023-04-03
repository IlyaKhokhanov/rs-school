export function renderCards(cardsOnPage, fullData, page) {
  const list = document.querySelector(".our-friends__list");

  const start = cardsOnPage * (page - 1);
  const end = start + cardsOnPage;

  const data = fullData.slice(start, end);
  let cards = "";

  data.forEach((item) => {
    cards += `
    <li class="our-friends__item" data-id="${item.id}">
      <img
        class="our-friends__item-img"
        src="${item.imgCard}"
        alt="cat" />
      <div class="our-friends__item-name">${item.name}</div>
      <button class="our-friends__item-btn">Learn more</button>
    </li>
    `;
  });
  list.innerHTML = cards;
}
