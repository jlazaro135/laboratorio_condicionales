import {
  MAXIMUNPOINTS,
  MINIMUNPOINTS,
  FIRSTPOINTSINSIDERANGE,
  SECONDPOINTSINSIDERANGE,
} from "../model";
import { checkGameResult, checkNextCardScenaryResult, partida } from "../motor";
import { literals } from "../literals";
import { toggleButtons } from "./buttons";
import { timeOut } from "../utils";

const {
  TRYAGAIN,
  SEENEXTCARD,
  ENDGAMEHEADING,
  WINHEADING,
  MATCHED,
  GAMEOVERHEADING,
  GAMEOVERPARAGRAPH,
  SEENEXTCARDPARAFAIL,
  SEENEXTCARDPARAMEGAFAIL,
  SEENEXTCARDTITLEFAIL,
  SEENEXTCARDPARASUCCESS,
  SEENEXTCARDTITLESUCCESS,
  ALMOST,
  CONSERVATIVE,
  FRIGHTENED,
} = literals;

export function createModal(heading: string, text: string): HTMLDivElement {
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

export function deployEndGameModal(paragraph: string): void {
  toggleButtons();
  let modal = createModal(ENDGAMEHEADING, paragraph);
  document.body.append(modal);
}

export function deployAndDelayModal(
  HEADING: string,
  PARAGRAPH: string,
  timmer?: number
): void {
  let modal = createModal(HEADING, PARAGRAPH);
  delayAppendModalToBody(modal, timmer);
}

export function deployDelayedModal(title: string, paragraph: string): void {
  toggleButtons();
  deployAndDelayModal(title, paragraph, timeOut);
}

export function removeModal(): void {
  let modal = document.querySelector(".ts-overlay");
  if (!(modal instanceof HTMLDivElement)) return;
  modal.remove();
}

function delayAppendModalToBody(modal: HTMLElement, timmer: number = 0): void {
  setTimeout(() => document.body.append(modal), timmer);
}

export function deleteModal(): void {
  let overlay = document.querySelector(".ts-overlay");
  if (!(overlay instanceof HTMLDivElement)) return;
  overlay.remove();
}

export function deployNextScenaryFail(title: string, paragraph: string): void {
  deployDelayedModal(title, paragraph);
}

export function deployNextScenarySuccess(
  title: string,
  paragraph: string
): void {
  deployDelayedModal(title, paragraph);
}

export function deployNextScenaryMegaFail(
  title: string,
  paragraph: string
): void {
  deployDelayedModal(title, paragraph);
}

export function deployGameResultModal(title: string, paragraph: string): void {
  deployDelayedModal(title, paragraph);
}

export function checkGameResultAndDisplayModal(): void {
  let { accumulatedPoints } = partida;
  switch (checkGameResult(accumulatedPoints)) {
    case "win":
      deployGameResultModal(WINHEADING, MATCHED);
      break;
    case "lose":
      deployDelayedModal(GAMEOVERHEADING, GAMEOVERPARAGRAPH);
      break;
  }
}

export function checkNextCardScenaryAndDisplayModal(): void {
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
