import { literals } from "./literals";

import {
  MAXIMUNPOINTS,
  MINIMUNPOINTS,
  FIRSTPOINTSINSIDERANGE,
  SECONDPOINTSINSIDERANGE,
  originalCardObjsArr,
} from "./model";

import { copiedAndModfiedCardObjsArr, updateGameState, partida, checkGameResult } from "./motor";

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
let flipCards = document.querySelectorAll(".ts-flip-card");
let cardsTable = document.querySelector(".ts-cards-table");

export function createCardElement(url: string): HTMLDivElement {
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

export function showCardAndUpdateScore(): void {
  let nextCardToShow = getNexCardToShow();
  if (!(nextCardToShow instanceof HTMLElement)) return;
  if (animationCardIsInProgress(nextCardToShow)) return;
  updateGameState();
  flipAndRemoveCard(nextCardToShow);
  setPointsAndCheckResult(partida.accumulatedPoints);
  showCardInTable(partida.cardName);
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
  toggleEndGameAvialibility();
}

function toggleEndGameAvialibility(): void {
  if (partida.isGameFinished) return;
  let endGameBtn = document.querySelector(".ts-end-game-btn");
  if (!(endGameBtn instanceof HTMLButtonElement)) return;
  endGameBtn.removeAttribute("disabled");
}

function flipAndRemoveCard(card: HTMLElement): void {
  flipCard(card);
  moveAndRemoveCard(card);
}

function renderPoints(points: number): void{
    let pointsWrapper = document.querySelector(".ts-points");
    if (!(pointsWrapper instanceof HTMLSpanElement)) return;
    let stringPoints: string = points.toString();
    pointsWrapper.textContent = stringPoints;
}

function setPointsAndCheckResult(points: number): void {
    renderPoints(points)
    if (partida.isGameFinished) return;

    switch (checkGameResult(points)) {
        case "win": 
            deployAndDelayModal(WINHEADING, MATCHED, TRYAGAIN, SEENEXTCARD, timeOut);
            break;
        case "lose":
            deployAndDelayModal(
            GAMEOVERHEADING,
            GAMEOVERPARAGRAPH,
            TRYAGAIN,
            SEENEXTCARD,
            timeOut
            );
            break;
        case "continue": 
            break;
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
  if (partida.accumulatedPoints < MAXIMUNPOINTS && !partida.isGameFinished)
    modalWrapper.append(btnSeeNextCard);
  overlayWrapper.append(modalWrapper);
  return overlayWrapper;
}

export function checkPointsAndDisplayModal(): void {
  if (partida.accumulatedPoints < MINIMUNPOINTS) {
    deployAndDelayModal(ENDGAMEHEADING, CONSERVATIVE, TRYAGAIN, SEENEXTCARD);
  }
  if (
    partida.accumulatedPoints >= MINIMUNPOINTS &&
    partida.accumulatedPoints < FIRSTPOINTSINSIDERANGE
  ) {
    deployAndDelayModal(ENDGAMEHEADING, FRIGHTENED, TRYAGAIN, SEENEXTCARD);
  }
  if (
    partida.accumulatedPoints >= FIRSTPOINTSINSIDERANGE &&
    partida.accumulatedPoints <= SECONDPOINTSINSIDERANGE
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
  partida.isGameFinished = true;
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
  if (partida.accumulatedPoints < MAXIMUNPOINTS) {
    deployAndDelayModal(
      SEENEXTCARDTITLEFAIL,
      SEENEXTCARDPARAFAIL,
      TRYAGAIN,
      SEENEXTCARD,
      timeOut
    );
  }
  if (partida.accumulatedPoints > MAXIMUNPOINTS) {
    deployAndDelayModal(
      SEENEXTCARDTITLESUCCESS,
      SEENEXTCARDPARASUCCESS,
      TRYAGAIN,
      SEENEXTCARD,
      timeOut
    );
  }
  if (partida.accumulatedPoints === MAXIMUNPOINTS) {
    deployAndDelayModal(
      SEENEXTCARDTITLEFAIL,
      SEENEXTCARDPARAMEGAFAIL,
      TRYAGAIN,
      SEENEXTCARD,
      timeOut
    );
  }
}

export function checkButtonClicked(e: Event): void {
    if (!(e.target instanceof HTMLButtonElement)) return;
    if (e.target.classList.contains("ts-try-again")) location.reload();
    if (e.target.classList.contains("ts-see-next-card")) seeNextCard();
  }
