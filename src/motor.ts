import {
    originalCardObjsArr,
    Card,
    createInitialPartida,
    MAXIMUNPOINTS,
  } from "./model";

export const partida = createInitialPartida();

export const copiedAndModfiedCardObjsArr: Card[] = [...originalCardObjsArr];

function getRandomIndex<Card>(arr: Card[]): number {
    return Math.floor(Math.random() * arr.length);
}

export function updateGameState(): void {
    const newIndex = getRandomIndex(copiedAndModfiedCardObjsArr);
  
    partida.index = newIndex;
    partida.cardName = copiedAndModfiedCardObjsArr[newIndex].name;
    partida.cardValue = copiedAndModfiedCardObjsArr[newIndex].value;
    partida.accumulatedPoints = partida.accumulatedPoints + partida.cardValue;
}

type GameResult = "win" | "lose"| "continue";
type NextScenary = 'fail' | 'megafail' | 'success';

export function checkGameResult(points: number): GameResult {
    if (points > MAXIMUNPOINTS) {
        return "lose";
    }
    if (points === MAXIMUNPOINTS) {
        return 'win';
    }
    return 'continue';
}

export function checkNextCardScenaryResult(points: number): NextScenary {
    if(points === MAXIMUNPOINTS) {
        return 'megafail';
    }
    if(points < MAXIMUNPOINTS) {
        return 'fail';
    }
    return 'success';
}

export function resetArray(): void {
    copiedAndModfiedCardObjsArr.length = 0;
    copiedAndModfiedCardObjsArr.push(...originalCardObjsArr);
}

export function resetPartida(): void {
    partida.accumulatedPoints = 0;
    partida.isGameFinished = false;
    partida.cardName = "";
    partida.cardValue = 0;
    partida.index = -1;
  }
  

