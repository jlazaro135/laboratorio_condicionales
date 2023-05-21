let giveMeCardBtn = document.querySelector(".ts-give-btn");
let flipCards = document.querySelectorAll(".ts-flip-card");
let cardsTable = document.querySelector(".ts-cards-table");

interface Card {
  name: string;
  value: number;
}
const timeOut: number = 2000;

const cardOne: Card = { name: "1_as-copas", value: 1 };
const cardTwo: Card = { name: "2_dos-copas", value: 2 };
const cardThree: Card = { name: "3_tres-copas", value: 3 };
const cardFour: Card = { name: "4_cuatro-copas", value: 4 };
const cardFive: Card = { name: "5_cinco-copas", value: 5 };
const cardSix: Card = { name: "6_seis-copas", value: 6 };
const cardSeven: Card = { name: "7_siete-copas", value: 7 };
const cardTen: Card = { name: "10_sota-copas", value: 0.5 };
const cardEleven: Card = { name: "11_caballo-copas", value: 0.5 };
const cardTwelve: Card = { name: "12_rey-copas", value: 0.5 };

let originalCardObjsArr: Card[] = [
  cardOne,
  cardTwo,
  cardThree,
  cardFour,
  cardFive,
  cardSix,
  cardSeven,
  cardTen,
  cardEleven,
  cardTwelve,
];

let index: number;
let cardName: string;
let cardValue: number;
let accumulatedPoints: number = 0;
const MAXIMUNPOINTS: number = 7.5;

const GAMEOVERHEADING: string = "Game Over!";
const GAMEOVERPARAGRAPH: string = "Lo siento, has superado la puntuación";
const TRYAGAIN: string = "Volver a intentar";
const CONSERVATIVE: string = "Has sido muy conservador";
const FRIGHTENED: string = "Te ha entrado el canguelo eh?";
const ALMOST: string = "Casi, casi...";
const MATCHED: string = "¡Lo has clavado! ¡Enhorabuena!";

let copiedAndModfiedCardObjsArr: Card[] = [...originalCardObjsArr];

function updatePointsAndReturnUrl(): string {
  index = getRandomIndex();
  cardName = copiedAndModfiedCardObjsArr[index].name;
  cardValue = copiedAndModfiedCardObjsArr[index].value;
  accumulatedPoints += cardValue;
  return imgUrl(cardName);
}

function imgUrl(path: string) {
  return `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/${path}.jpg`;
}

function getRandomIndex(): number {
  return Math.floor(Math.random() * copiedAndModfiedCardObjsArr.length);
}

function showCardAndUpdateScore(): void {
  let nextCardToShow = Array.from(flipCards).find(
    (_, index) => index === copiedAndModfiedCardObjsArr.length - 1
  );
  if (!(nextCardToShow instanceof HTMLElement)) return;
  if (
    nextCardToShow.classList.contains("is-active") ||
    nextCardToShow.classList.contains("moving-out")
  )
    return;
  flipAndRemoveCard(nextCardToShow);
  setPoints(accumulatedPoints);
  showCardInTable(cardName);
}

function moveAndRemoveCard(card: HTMLElement) {
  setTimeout(() => {
    card.classList.add("moving-out");
    copiedAndModfiedCardObjsArr.splice(index, 1);
  }, timeOut);
  setTimeout(() => {
    card.remove();
  }, timeOut + 3000);
}

function flipaCard(card: HTMLElement) {
  if (
    card.classList.contains("is-active") ||
    card.classList.contains("moving-out")
  )
    return;
  let cardImg = card.querySelector(".ts-back");
  if (!(cardImg instanceof HTMLImageElement)) return;
  cardImg.src = updatePointsAndReturnUrl();
  card.classList.add("is-active");
  toggleEndGameAvialibility();
}

function flipAndRemoveCard(card: HTMLElement): void {
  flipaCard(card);
  moveAndRemoveCard(card);
}

function setPoints(points: number): void {
  let pointsWrapper = document.querySelector(".ts-points");
  if (!(pointsWrapper instanceof HTMLSpanElement)) return;
  let stringPoints: string = points.toString();
  pointsWrapper.textContent = stringPoints;
  if (points > MAXIMUNPOINTS) {
    let modal = createModal(GAMEOVERHEADING, GAMEOVERPARAGRAPH, TRYAGAIN);
    document.body.append(modal);
  }
}

function showCardInTable(url: string): void {
  let card: HTMLDivElement = createCardElement(url);
  setTimeout(() => {
    if (!(cardsTable instanceof HTMLDivElement)) return;
    cardsTable.append(card);
    if (originalCardObjsArr.length === copiedAndModfiedCardObjsArr.length + 1)
      toggleEndGameAvialibility();
  }, timeOut);
  setTimeout(() => card.classList.remove("is-created"), timeOut + 50);
}

function createCardElement(url: string): HTMLDivElement {
  let divElement = document.createElement("div");
  let img = document.createElement("img");
  divElement.classList.add("is-created");
  img.classList.add("card-gotten-img");
  img.src = imgUrl(url);
  divElement.classList.add("card-gotten-img");
  divElement.append(img);
  return divElement;
}

function toggleEndGameAvialibility(): void {
  let endGameBtn = document.querySelector(".ts-end-game-btn");
  if (!(endGameBtn instanceof HTMLButtonElement)) return;
  endGameBtn.removeAttribute("disabled");
}

function createModal(
  heading: string,
  text: string,
  buttonText: string
): HTMLDivElement {
  let overlayWrapper = document.createElement("div");
  let modalWrapper = document.createElement("div");
  let modalHeading = document.createElement("h2");
  let modalParagraph = document.createElement("p");
  let button = document.createElement("button");
  overlayWrapper.classList.add("overlay");
  modalWrapper.classList.add("modal");
  button.classList.add("ts-try-again");
  modalHeading.textContent = heading;
  modalParagraph.textContent = text;
  button.textContent = buttonText;
  modalWrapper.append(modalHeading, modalParagraph, button);
  overlayWrapper.append(modalWrapper);
  return overlayWrapper;
}

if (giveMeCardBtn instanceof HTMLButtonElement)
  giveMeCardBtn.addEventListener("click", () => showCardAndUpdateScore());

document.addEventListener("click", (e) => {
  if (
    !(
      e.target instanceof HTMLButtonElement &&
      e.target.classList.contains("ts-try-again")
    )
  )
    return;
  location.reload();
});
