import { literals } from "./literals";

import {
  MAXIMUNPOINTS,
  MINIMUNPOINTS,
  FIRSTPOINTSINSIDERANGE,
  SECONDPOINTSINSIDERANGE,
  originalCardObjsArr,
} from "./model";

import {
  copiedAndModfiedCardObjsArr,
  updateGameState,
  partida,
  checkGameResult,
  checkNextCardScenaryResult,
} from "./motor";

const {
  WINHEADING,
  GAMEOVERHEADING,
  ALMOST,
  SEENEXTCARD,
  TRYAGAIN,
  ENDGAMEHEADING,
  SEENEXTCARDPARAFAIL,
  MATCHED,
  GAMEOVERPARAGRAPH,
  SEENEXTCARDPARAMEGAFAIL,
  SEENEXTCARDTITLEFAIL,
  SEENEXTCARDPARASUCCESS,
  SEENEXTCARDTITLESUCCESS,
  CONSERVATIVE,
  FRIGHTENED,
} = literals;

const timeOut: number = 1000;

export let giveMeCardBtn = document.querySelector(".ts-give-btn");
export let endGameBtn = document.querySelector(".ts-end-game-btn");
let cardsTable = document.querySelector(".ts-cards-table");
let cardsWrapper = document.querySelector(".ts-cards-wrapper");
let transitionTime : number = 1;
let timeOutForShowCard : number = 1.5;

export function createSmallCardElement(url: string): HTMLDivElement {
  let divElement = document.createElement("div");
  let img = document.createElement("img");
  divElement.classList.add("is-created");
  img.classList.add("card-gotten-img");
  img.src = imgUrl(url);
  divElement.classList.add("card-gotten-img");
  divElement.append(img);
  return divElement;
}

function imgUrl(path: string): string {
  return `https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/${path}.jpg`;
}

function getNexCardToShow(): HTMLElement {
  let flipCards = document.querySelectorAll(".ts-flip-card");
  let nextCardToShow = Array.from(flipCards).find(
    (_, index) => index === copiedAndModfiedCardObjsArr.length - 1
  );
  if (!(nextCardToShow instanceof HTMLElement))
    throw new Error("No se ha encontrado la carta");
  return nextCardToShow;
}

function animationCardIsInProgress(card: HTMLElement): boolean {
  return (
    card.classList.contains("is-active") ||
    card.classList.contains("moving-out")
  );
}

function moveAndRemoveCard(card: HTMLElement): void {
  setTimeout(() => {
    card.classList.add("moving-out");
    copiedAndModfiedCardObjsArr.splice(partida.index, 1);
  }, timeOut);
  setTimeout(() => {
    card.remove();
  }, timeOut + 3000);
}

function flipCard(card: HTMLElement): void {
  if (
    card.classList.contains("is-active") ||
    card.classList.contains("moving-out")
  )
    return;
  let cardImg = card.querySelector(".ts-back");
  if (!(cardImg instanceof HTMLImageElement)) return;
  cardImg.src = imgUrl(partida.cardName);
  card.classList.add("is-active");
}

function toggleEndGameAvialibility(): void {
  if (!(endGameBtn instanceof HTMLButtonElement)) return;
  if(endGameBtn.disabled === true){
    endGameBtn.disabled = false
    return;
  }
  endGameBtn.disabled = true;
}

function flipAndRemoveCard(card: HTMLElement): void {
  flipCard(card);
  moveAndRemoveCard(card);
}

function renderPoints(points: number): void {
  let pointsWrapper = document.querySelector(".ts-points");
  if (!(pointsWrapper instanceof HTMLSpanElement)) return;
  let stringPoints: string = points.toString();
  pointsWrapper.textContent = stringPoints;
}

function showCardInTable(): void {
  let { cardName } = partida;
  let card: HTMLDivElement = createSmallCardElement(cardName);
  setTimeout(() => {
    if (!(cardsTable instanceof HTMLDivElement)) return;
    cardsTable.append(card);
    if (originalCardObjsArr.length === copiedAndModfiedCardObjsArr.length + 1)
      toggleEndGameAvialibility();
  }, timeOut);
  setTimeout(() => card.classList.remove("is-created"), timeOut + 50);
}

function createModal(heading: string, text: string): HTMLDivElement {
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
  btnTryAgain.textContent = TRYAGAIN;
  btnSeeNextCard.textContent = SEENEXTCARD;
  modalWrapper.append(modalHeading, modalParagraph, btnTryAgain);
  if (partida.accumulatedPoints < MAXIMUNPOINTS && !partida.isGameFinished)
    modalWrapper.append(btnSeeNextCard);
  overlayWrapper.append(modalWrapper);
  return overlayWrapper;
}

function deployEndGameModal(paragraph: string): void {
  toggleButtons();
  let modal = createModal(ENDGAMEHEADING, paragraph);
  document.body.append(modal);
}

function deployAndDelayModal(
  HEADING: string,
  PARAGRAPH: string,
  timmer?: number
): void {
  let modal = createModal(HEADING, PARAGRAPH);
  delayAppendModalToBody(modal, timmer);
}

function delayAppendModalToBody(modal: HTMLElement, timmer: number = 0): void {
  setTimeout(() => document.body.append(modal), timmer);
}

function seeNextCard(): void {
  partida.isGameFinished = true;
  deleteModal();
  showCardAndUpdateScore();
  checkNextCardScenary();
}

function deleteModal(): void {
  let overlay = document.querySelector(".ts-overlay");
  if (!(overlay instanceof HTMLDivElement)) return;
  overlay.remove();
}

function deployDelayedModal(title: string, paragraph: string): void {
  toggleButtons();
  deployAndDelayModal(title, paragraph, timeOut);
}

function deployNextScenaryFail(title: string, paragraph: string): void {
  deployDelayedModal(title, paragraph);
}

function deployNextScenarySuccess(title: string, paragraph: string): void {
  deployDelayedModal(title, paragraph);
}

function deployNextScenaryMegaFail(title: string, paragraph: string): void {
  deployDelayedModal(title, paragraph);
}

function deployGameResultModal(title: string, paragraph: string): void {
  deployDelayedModal(title, paragraph);
}

function setPointsAndCheckResult(): void {
  let { accumulatedPoints, isGameFinished } = partida;

  renderPoints(accumulatedPoints);
  if (isGameFinished) return;
  switch (checkGameResult(accumulatedPoints)) {
    case "win":
      deployGameResultModal(WINHEADING, MATCHED);
      break;
    case "lose":
      deployDelayedModal(GAMEOVERHEADING, GAMEOVERPARAGRAPH);
      break;
  }
}

function checkNextCardScenary(): void {
  let { accumulatedPoints } = partida;

  switch (checkNextCardScenaryResult(accumulatedPoints)) {
    case "fail":
      deployNextScenaryFail(SEENEXTCARDTITLEFAIL, SEENEXTCARDPARAFAIL);
      break;
    case "success":
      deployNextScenarySuccess(SEENEXTCARDTITLESUCCESS, SEENEXTCARDPARASUCCESS);
      break;
    case "megafail":
      deployNextScenaryMegaFail(SEENEXTCARDTITLEFAIL, SEENEXTCARDPARAMEGAFAIL);
      break;
  }
}

export function showCardAndUpdateScore(): void {
  let nextCardToShow = getNexCardToShow();
  if (!(nextCardToShow instanceof HTMLElement)) return;
  if (animationCardIsInProgress(nextCardToShow)) return;
  updateGameState();
  flipAndRemoveCard(nextCardToShow);
  setPointsAndCheckResult();
  showCardInTable();
}

export function checkPointsAndDisplayModal(): void {
  if (partida.accumulatedPoints < MINIMUNPOINTS) {
    deployEndGameModal(CONSERVATIVE);
  }
  if (
    partida.accumulatedPoints >= MINIMUNPOINTS &&
    partida.accumulatedPoints < FIRSTPOINTSINSIDERANGE
  ) {
    deployEndGameModal(FRIGHTENED);
  }
  if (
    partida.accumulatedPoints >= FIRSTPOINTSINSIDERANGE &&
    partida.accumulatedPoints <= SECONDPOINTSINSIDERANGE
  ) {
    deployEndGameModal(ALMOST);
  }
}

export function checkButtonClicked(e: Event): void {
  if (!(e.target instanceof HTMLButtonElement)) return;
  if (e.target.classList.contains("ts-try-again")) handleTryAgainEvent();
  if (e.target.classList.contains("ts-see-next-card")) handleSeeNextCardEvent();
}

function handleTryAgainEvent(): void{
  appendCardsToTable();
}

function handleSeeNextCardEvent(): void{
  toggleButtons();
  seeNextCard();
}

function createCardElement(): HTMLDivElement {
  let cardParentWrapper = document.createElement("div");
  let cardInnerWrapper = document.createElement("div");
  let cardFrontWrapper = document.createElement("div");
  let cardBackWrapper = document.createElement("div");
  let imgFrontCard = document.createElement("img");
  let imgBackCard = document.createElement("img");

  cardParentWrapper.classList.add("flip-card", "ts-flip-card");
  cardInnerWrapper.classList.add("flip-card-inner");
  cardFrontWrapper.classList.add("flip-card-front");
  cardBackWrapper.classList.add("flip-card-back");
  imgFrontCard.classList.add("card-img");
  imgFrontCard.src =
    "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  imgFrontCard.alt = "back card";
  imgBackCard.classList.add("card-img", "ts-back");
  imgBackCard.src =
    "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  imgBackCard.alt = "back card";
  cardBackWrapper.append(imgBackCard);
  cardFrontWrapper.append(imgFrontCard);
  cardInnerWrapper.append(cardFrontWrapper, cardBackWrapper);
  cardParentWrapper.append(cardInnerWrapper);
  return cardParentWrapper;
}

function resetPartida(): void {
  partida.accumulatedPoints = 0;
  partida.isGameFinished = false;
  partida.cardName = "";
  partida.cardValue = 0;
  partida.index = -1;
}

function toogleGiveMeCardBtnAvailability(): void {
  if (!(giveMeCardBtn instanceof HTMLButtonElement)) return;
  if (giveMeCardBtn.disabled === true) {
    giveMeCardBtn.disabled = false;
    return
  }
  giveMeCardBtn.disabled = true
}

function toggleButtons(): void{
  toggleEndGameAvialibility();
  toogleGiveMeCardBtnAvailability();
}

function resetGame(): void {
  emptyCardsTable();
  removeModal();
  resetArray();
  resetPartida();
  renderPoints(0);
}

function emptyCardsTable(): void {
  if (!(cardsTable instanceof HTMLDivElement)) return;
  cardsTable.innerHTML = "";
  if (!(cardsWrapper instanceof HTMLDivElement)) return;
  cardsWrapper.innerHTML = "";
}

function removeModal(): void {
  let modal = document.querySelector(".ts-overlay");
  if (!(modal instanceof HTMLDivElement)) return;
  modal.remove();
}

function resetArray(): void {
  copiedAndModfiedCardObjsArr.length = 0;
  copiedAndModfiedCardObjsArr.push(...originalCardObjsArr);
}

export function appendCardsToTable(): void {
  let transitionForTimeOut: number = (transitionTime + timeOutForShowCard)*100
  if (!(cardsWrapper instanceof HTMLDivElement)) return;
  resetGame();
  originalCardObjsArr.forEach((_, i) => {
    let cardElement = createCardElement();
    cardElement.style.top = '1000px';
    cardElement.style.transition = `top ${transitionTime}s ease-in-out`;
    if (!(cardsWrapper instanceof HTMLDivElement)) return;
    cardsWrapper.append(cardElement);
    setTimeout(() => {
      cardElement.style.top = calculateCardTopPosition(i);
    }, (timeOutForShowCard*100) * i);
  });
  setTimeout(() => toogleGiveMeCardBtnAvailability(), transitionForTimeOut * originalCardObjsArr.length)
}

function calculateCardTopPosition(index: number): string {
  let topPosition = 0;
  let topPositionToString: string = topPosition.toString().concat("px");
  if (index === 0) return topPositionToString;
  topPosition = index * 10;
  topPositionToString = topPosition.toString().concat("px");
  return topPositionToString;
}


