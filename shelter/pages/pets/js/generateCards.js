import data from "./pets.json" assert { type: "json" };

export function genrateCardsData(quantity) {
  const arrCards = [];

  while (arrCards.length < 48) {
    let arrQuant = [];

    while (arrQuant.length < quantity) {
      let num = randomNumber();
      if (!arrQuant.includes(num)) {
        arrQuant.push(num);
      }
    }
    arrCards.push(...arrQuant);
  }
  return arrCards.map((item) => data[item - 1]);
}

function randomNumber() {
  return Math.round(Math.random() * (8 - 1) + 1);
}
