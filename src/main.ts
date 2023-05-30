import {
  showCardAndUpdateScore,
  handleBtnsEvents,
} from "./ui/ui";

import { giveMeCardBtn, endGameBtn } from "./ui/buttons";
import { appendCardsToTable } from "./ui/card";
import { checkPointsAndDisplayModal } from "./ui/modal";

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
