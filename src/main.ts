import {
  checkPointsAndDisplayModal,
  showCardAndUpdateScore,
  handleBtnsEvents,
  giveMeCardBtn,
  endGameBtn,
  appendCardsToTable,
} from "./ui";

if (giveMeCardBtn instanceof HTMLButtonElement)
  giveMeCardBtn.addEventListener("click", () => {
    showCardAndUpdateScore()});

if (endGameBtn instanceof HTMLButtonElement)
  endGameBtn.addEventListener("click", () => checkPointsAndDisplayModal());

document.addEventListener("click", (e) => {
 handleBtnsEvents(e);
});

document.addEventListener("DOMContentLoaded", () => {
  appendCardsToTable();
});
