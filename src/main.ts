let giveMeCardBtn = document.querySelector(".ts-give-btn");
let endGameBtn = document.querySelector(".ts-end-game-btn");
let flipCards = document.querySelectorAll(".ts-flip-card");
let cardsTable = document.querySelector(".ts-cards-table");

interface Card {
  name: string;
  value: number;
}
const timeOut: number = 1000;

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
let isGameFinished: boolean = false;

const MINIMUNPOINTS: number = 4;
const FIRSTPOINTSINSIDERANGE: number = 6;
const SECONDPOINTSINSIDERANGE: number = 7;
const MAXIMUNPOINTS: number = 7.5;

const WINHEADING: string = "PERFECTOOO!!";
const GAMEOVERHEADING: string = "Game Over!";
const ENDGAMEHEADING: string = "¡Te has plantado!";
const SEENEXTCARDTITLESUCCESS: string = "¡Has hecho bien!";
const SEENEXTCARDTITLEFAIL: string = "¡Deberías haber seguido!";

const GAMEOVERPARAGRAPH: string = "Lo siento, has superado la puntuación 👎";
const CONSERVATIVE: string = "Has sido muy conservador 😲";
const FRIGHTENED: string = "Te ha entrado el canguelo eh? 💩";
const ALMOST: string = "Casi, casi... 😉";
const MATCHED: string = "¡Lo has clavado! ¡Enhorabuena! 🏆";
const SEENEXTCARDPARASUCCESS: string =
  "¡Con la siguiente carta te hubieras pasado! 💃";
const SEENEXTCARDPARAFAIL: string =
  "Todavía no hubieras llegado a 7.5... ¡podrías haber seguido jugando! 👎";
const SEENEXTCARDPARAMEGAFAIL: string =
  "Ouchh! con esta carta habrías llegado a 7.5 😕";

const SEENEXTCARD: string = "Ver siguiente carta";
const TRYAGAIN: string = "Volver a intentar";

let copiedAndModfiedCardObjsArr: Card[] = [...originalCardObjsArr];

function updateGameState(): void {
  index = getRandomIndex();
  cardName = copiedAndModfiedCardObjsArr[index].name;
  cardValue = copiedAndModfiedCardObjsArr[index].value;
  accumulatedPoints += cardValue;
}

function imgUrl(path: string): string {
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
  updateGameState();
  flipAndRemoveCard(nextCardToShow);
  setPointsAndCheckResult(accumulatedPoints);
  showCardInTable(cardName);
}

function moveAndRemoveCard(card: HTMLElement): void {
  setTimeout(() => {
    card.classList.add("moving-out");
    copiedAndModfiedCardObjsArr.splice(index, 1);
  }, timeOut);
  setTimeout(() => {
    card.remove();
  }, timeOut + 3000);
}

function flipaCard(card: HTMLElement): void {
  if (
    card.classList.contains("is-active") ||
    card.classList.contains("moving-out")
  )
    return;
  let cardImg = card.querySelector(".ts-back");
  if (!(cardImg instanceof HTMLImageElement)) return;
  cardImg.src = imgUrl(cardName);
  card.classList.add("is-active");
  toggleEndGameAvialibility();
}

function flipAndRemoveCard(card: HTMLElement): void {
  flipaCard(card);
  moveAndRemoveCard(card);
}

function setPointsAndCheckResult(points: number): void {
  let pointsWrapper = document.querySelector(".ts-points");
  if (!(pointsWrapper instanceof HTMLSpanElement)) return;
  let stringPoints: string = points.toString();
  pointsWrapper.textContent = stringPoints;
  if (isGameFinished) return;
  if (points > MAXIMUNPOINTS) {
    deployAndDelayModal(
      GAMEOVERHEADING,
      GAMEOVERPARAGRAPH,
      TRYAGAIN,
      SEENEXTCARD,
      timeOut
    );
  }
  if (points === MAXIMUNPOINTS) {
    deployAndDelayModal(WINHEADING, MATCHED, TRYAGAIN, SEENEXTCARD, timeOut);
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
  if (isGameFinished) return;
  let endGameBtn = document.querySelector(".ts-end-game-btn");
  if (!(endGameBtn instanceof HTMLButtonElement)) return;
  endGameBtn.removeAttribute("disabled");
}

function createModal(
  heading: string,
  text: string,
  buttonText: string,
  secondButtonText: string
): HTMLDivElement {
  let overlayWrapper = document.createElement("div");
  let modalWrapper = document.createElement("div");
  let modalHeading = document.createElement("h2");
  let modalParagraph = document.createElement("p");
  let btnTryAgain = document.createElement("button");
  let btnSeeNextCard = document.createElement("button");
  overlayWrapper.classList.add("overlay", "ts-overlay");
  modalWrapper.classList.add("modal");
  btnTryAgain.classList.add("ts-try-again");
  btnSeeNextCard.classList.add("ts-see-next-card");
  modalHeading.textContent = heading;
  modalParagraph.textContent = text;
  btnTryAgain.textContent = buttonText;
  btnSeeNextCard.textContent = secondButtonText;
  modalWrapper.append(modalHeading, modalParagraph, btnTryAgain);
  if (accumulatedPoints < MAXIMUNPOINTS && !isGameFinished)
    modalWrapper.append(btnSeeNextCard);
  overlayWrapper.append(modalWrapper);
  return overlayWrapper;
}

function checkPointsAndDisplayModal(): void {
  if (accumulatedPoints < MINIMUNPOINTS) {
    deployAndDelayModal(ENDGAMEHEADING, CONSERVATIVE, TRYAGAIN, SEENEXTCARD);
  }
  if (
    accumulatedPoints >= MINIMUNPOINTS &&
    accumulatedPoints < FIRSTPOINTSINSIDERANGE
  ) {
    deployAndDelayModal(ENDGAMEHEADING, FRIGHTENED, TRYAGAIN, SEENEXTCARD);
  }
  if (
    accumulatedPoints >= FIRSTPOINTSINSIDERANGE &&
    accumulatedPoints <= SECONDPOINTSINSIDERANGE
  ) {
    deployAndDelayModal(ENDGAMEHEADING, ALMOST, TRYAGAIN, SEENEXTCARD);
  }
}

function deployAndDelayModal(
  HEADING: string,
  PARAGRAPH: string,
  BTN: string,
  SECONDARYBTN: string,
  timmer?: number
): void {
  let modal = createModal(HEADING, PARAGRAPH, BTN, SECONDARYBTN);
  delayAppendModalToBody(modal, timmer);
}

function delayAppendModalToBody(modal: HTMLElement, timmer: number = 0): void {
  setTimeout(() => document.body.append(modal), timmer);
}

function seeNextCard(): void {
  isGameFinished = true;
  deleteModalAndDisableBtns();
  showCardAndUpdateScore();
  checkNextCardScenary();
}

function deleteModalAndDisableBtns(): void {
  let overlay = document.querySelector(".ts-overlay");
  if (!(overlay instanceof HTMLDivElement)) return;
  overlay.remove();
  if (!(giveMeCardBtn instanceof HTMLButtonElement)) return;
  giveMeCardBtn.disabled = true;
  if (!(endGameBtn instanceof HTMLButtonElement)) return;
  endGameBtn.disabled = true;
}

function checkNextCardScenary(): void {
  if (accumulatedPoints < MAXIMUNPOINTS) {
    deployAndDelayModal(
      SEENEXTCARDTITLEFAIL,
      SEENEXTCARDPARAFAIL,
      TRYAGAIN,
      SEENEXTCARD,
      timeOut
    );
  }
  if (accumulatedPoints > MAXIMUNPOINTS) {
    deployAndDelayModal(
      SEENEXTCARDTITLESUCCESS,
      SEENEXTCARDPARASUCCESS,
      TRYAGAIN,
      SEENEXTCARD,
      timeOut
    );
  }
  if (accumulatedPoints === MAXIMUNPOINTS) {
    deployAndDelayModal(
      SEENEXTCARDTITLEFAIL,
      SEENEXTCARDPARAMEGAFAIL,
      TRYAGAIN,
      SEENEXTCARD,
      timeOut
    );
  }
}

if (giveMeCardBtn instanceof HTMLButtonElement)
  giveMeCardBtn.addEventListener("click", () => showCardAndUpdateScore());

if (endGameBtn instanceof HTMLButtonElement)
  endGameBtn.addEventListener("click", () => checkPointsAndDisplayModal());

document.addEventListener("click", (e) => {
  if (
    e.target instanceof HTMLButtonElement &&
    e.target.classList.contains("ts-try-again")
  )
    location.reload();
  if (
    e.target instanceof HTMLButtonElement &&
    e.target.classList.contains("ts-see-next-card")
  )
    seeNextCard();
});
