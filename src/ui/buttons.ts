export let giveMeCardBtn = document.querySelector(".ts-give-btn");
export let endGameBtn = document.querySelector(".ts-end-game-btn");

export function toggleButtons(): void{
    toggleEndGameAvialibility();
    toogleGiveMeCardBtnAvailability();
}

export function toggleEndGameAvialibility(): void {
    if (!(endGameBtn instanceof HTMLButtonElement)) return;
    if(endGameBtn.disabled === true){
      endGameBtn.disabled = false
      return;
    }
    endGameBtn.disabled = true;
  }

export function toogleGiveMeCardBtnAvailability(): void {
if (!(giveMeCardBtn instanceof HTMLButtonElement)) return;
if (giveMeCardBtn.disabled === true) {
    giveMeCardBtn.disabled = false;
    return
}
giveMeCardBtn.disabled = true
}
