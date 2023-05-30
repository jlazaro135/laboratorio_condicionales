import { updateGameState, partida } from "../motor";
import { toggleButtons } from "./buttons";
import {
  animationCardIsInProgress,
  appendCardsToTable,
  flipAndRemoveCard,
  getNexCardToShow,
  showCardInTable,
} from "./card";
import { renderGameData, renderPoints } from "./dataGame";
import {
  checkGameResultAndDisplayModal,
  checkNextCardScenaryAndDisplayModal,
  deleteModal,
} from "./modal";

function setPointsAndCheckResult(): void {
  let { accumulatedPoints, isGameFinished } = partida;

  if (isGameFinished) return;
  renderPoints(accumulatedPoints);
  checkGameResultAndDisplayModal();
}

function seeNextCard(): void {
  partida.isGameFinished = true;
  deleteModal();
  showCardAndUpdateScore();
  checkNextCardScenaryAndDisplayModal();
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

export function handleBtnsEvents(e: Event): void {
  if (!(e.target instanceof HTMLButtonElement)) return;
  if (e.target.classList.contains("ts-try-again")) handleTryAgainEvent();
  if (e.target.classList.contains("ts-see-next-card")) handleSeeNextCardEvent();
}

function handleTryAgainEvent(): void {
  renderGameData(partida.accumulatedPoints);
  appendCardsToTable();
}

function handleSeeNextCardEvent(): void {
  toggleButtons();
  seeNextCard();
}
