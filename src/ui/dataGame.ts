import { scoresArray, MAXIMUNPOINTS } from "../model";
import { partida } from "../motor";

function renderGamesPlayed(gamesPlayedNumber: number): void {
let gamesPlayed = document.querySelector(".ts-games");
if (!(gamesPlayed instanceof HTMLSpanElement)) return;
gamesPlayed.textContent = gamesPlayedNumber.toString();
}
  
function renderLastGamePoints(points: number): void {
let lastScore = document.querySelector(".ts-last-score");
if (!(lastScore instanceof HTMLSpanElement)) return;
lastScore.textContent = points.toString();
if (partida.isGameFinished) {
    let finalPoints = points - partida.cardValue;
    lastScore.textContent = finalPoints.toFixed(1);
    return;
}
if (partida.accumulatedPoints > MAXIMUNPOINTS) {
    let zero: number = 0;
    scoresArray.push(zero);
    lastScore.textContent = zero.toFixed(1);
    return;
}
scoresArray.push(partida.accumulatedPoints);
lastScore.textContent = points.toFixed(1);
}
  
function renderAverageScore(points: number): void {
let averageScore = document.querySelector(".ts-average-score");
if (!(averageScore instanceof HTMLSpanElement)) return;
if (partida.isGameFinished) {
    let finalPoints = points - partida.cardValue;
    scoresArray.push(finalPoints);
    let average = scoresArray.reduce((a, b) => a + b, 0) / scoresArray.length;
    averageScore.textContent = average.toFixed(2);
    return;
}
if (partida.accumulatedPoints > MAXIMUNPOINTS) {
    scoresArray.push(0);
} else {
    scoresArray.push(partida.accumulatedPoints);
}
let average = scoresArray.reduce((a, b) => a + b, 0) / scoresArray.length;
averageScore.textContent = average.toFixed(2);
}

export function renderGameData(points: number): void {
    let addGame = ++partida.games;
    renderGamesPlayed(addGame);
    renderLastGamePoints(points);
    renderAverageScore(points);
}

export function renderPoints(points: number): void {
    let pointsWrapper = document.querySelector(".ts-points");
    if (!(pointsWrapper instanceof HTMLSpanElement)) return;
    let stringPoints: string = points.toString();
    pointsWrapper.textContent = stringPoints;
}

