import data from "./pets.json" with { type: "json" };

// import JSON from '../json/menu.json' with { type: "json" };

// const { default: jsonData } = await import("./data.json", { assert: { type: "json" } })

export function modal() {
  const listCards = document.querySelector(".our-friends__list");

  listCards.addEventListener("click", (e) => {
    let card = e.target.closest(".our-friends__item");
    if (card) {
      openModal(card.dataset.id);
      modalClose();
    }
  });

  function openModal(id) {
    let overlay = document.createElement("div");
    overlay.classList.add("overlay");

    let modal = document.createElement("div");
    modal.classList.add("modal");

    let btn = document.createElement("button");
    btn.classList.add("modal__btn-close");

    let content = document.createElement("div");
    content.classList.add("modal__content");

    let item = data
      .filter((item) => item.id === +id)
      .map((item) => {
        return `
      <img class="modal__img" src="${item.imgModal}" />
      <div class="modal__info">
        <h2 class="modal__title">${item.name}</h2>
        <p class="modal__subtitle">${item.type} - ${item.breed}</p>
        <p class="modal__description">${item.description}</p>
        <ul class="modal__list">
          <li class="modal__list-item">
            <span class="modal__list-item-text"><b>Age: </b>${item.age}
            </span>
          </li>
          <li class="modal__list-item">
            <span class="modal__list-item-text"><b>Inoculations: </b>${item.inoculations.join(
              ", "
            )}
            </span>
          </li>
          <li class="modal__list-item">
            <span class="modal__list-item-text"><b>Diseases: </b>${item.diseases.join(
              ", "
            )}
            </span>
          </li>
          <li class="modal__list-item">
            <span class="modal__list-item-text"><b>Parasites: </b>${item.parasites.join(
              ", "
            )}
            </span>
          </li>
        </ul>
      </div>
      `;
      });

    btn.innerHTML =
      '<img src="./../../assets/icons/close-btn.svg" alt="close" />';
    content.innerHTML = item[0];
    modal.append(btn);
    modal.append(content);
    overlay.append(modal);
    document.body.append(overlay);
    document.body.style.overflow = "hidden";
  }

  function modalClose() {
    let btnClose = document.querySelector(".modal__btn-close");
    let overlay = document.querySelector(".overlay");

    btnClose.addEventListener("click", () => {
      overlay.remove();
      document.body.style.overflow = "";
    });
    overlay.addEventListener("click", (e) => {
      if (e.target.classList.contains("overlay")) {
        overlay.remove();
        document.body.style.overflow = "";
      }
    });
  }
}
