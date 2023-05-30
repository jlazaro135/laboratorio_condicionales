import { originalCardObjsArr } from "../model";
import { copiedAndModfiedCardObjsArr, partida, resetArray, resetPartida } from "../motor";
import { imgUrl, timeOut, timeOutForShowCard, transitionTime } from "../utils";
import { toggleEndGameAvialibility, toogleGiveMeCardBtnAvailability } from "./buttons";
import { renderPoints } from "./dataGame";
import { removeModal } from "./modal";

const cardsTable = document.querySelector(".ts-cards-table");
const cardsWrapper = document.querySelector(".ts-cards-wrapper");

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

function calculateCardTopPosition(index: number): string {
let topPosition = 0;
let topPositionToString: string = topPosition.toString().concat("px");
if (index === 0) return topPositionToString;
topPosition = index * 10;
topPositionToString = topPosition.toString().concat("px");
return topPositionToString;
}

export function appendCardsToTable(): void {
    let transitionForTimeOut: number =
        (transitionTime + timeOutForShowCard) * 100;
    if (!(cardsWrapper instanceof HTMLDivElement)) return;
    resetGame();
    originalCardObjsArr.forEach((_, i) => {
        let cardElement = createCardElement();
        cardElement.style.top = "1000px";
        cardElement.style.transition = `top ${transitionTime}s ease-in-out`;
        if (!(cardsWrapper instanceof HTMLDivElement)) return;
        cardsWrapper.append(cardElement);
        setTimeout(() => {
        cardElement.style.top = calculateCardTopPosition(i);
        }, timeOutForShowCard * 100 * i);
    });
    setTimeout(
        () => toogleGiveMeCardBtnAvailability(),
        transitionForTimeOut * originalCardObjsArr.length
    );
}

function emptyCardsTable(): void {
    if (!(cardsTable instanceof HTMLDivElement)) return;
    cardsTable.innerHTML = "";
    if (!(cardsWrapper instanceof HTMLDivElement)) return;
    cardsWrapper.innerHTML = "";
  }

function resetGame(): void {
    emptyCardsTable();
    removeModal();
    resetArray();
    resetPartida();
    renderPoints(0);
}

export function showCardInTable(): void {
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

export function getNexCardToShow(): HTMLElement {
    let flipCards = document.querySelectorAll(".ts-flip-card");
    let nextCardToShow = Array.from(flipCards).find(
      (_, index) => index === copiedAndModfiedCardObjsArr.length - 1
    );
    if (!(nextCardToShow instanceof HTMLElement))
      throw new Error("No se ha encontrado la carta");
    return nextCardToShow;
  }
  
export function animationCardIsInProgress(card: HTMLElement): boolean {
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
  
export function flipAndRemoveCard(card: HTMLElement): void {
flipCard(card);
moveAndRemoveCard(card);
}
  

  