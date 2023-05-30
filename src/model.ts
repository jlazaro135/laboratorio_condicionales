export const MINIMUNPOINTS: number = 4;
export const FIRSTPOINTSINSIDERANGE: number = 6;
export const SECONDPOINTSINSIDERANGE: number = 7;
export const MAXIMUNPOINTS: number = 7.5;

export interface Card {
    name: string;
    value: number;
}

const cardOne: Card = { name: "1_as-copas", value: 1 };
const cardTwo: Card = { name: "2_dos-copas", value: 2 };
const cardThree: Card = { name: "3_tres-copas", value: 3 };
const cardFour: Card = { name: "4_cuatro-copas", value: 4 };
const cardFive: Card = { name: "5_cinco-copas", value: 5 };
const cardSix: Card = { name: "6_seis-copas", value: 6 };
const cardSeven: Card = { name: "7_siete-copas", value: 7 };
const cardTen: Card = { name: "10_sota-copas", value: 0.5 };
const cardEleven: Card = { name: "11_caballo-copas", value: 0.5 };
const cardTwelve: Card = { name: "12_rey-copas", value: 0.5 };

export const originalCardObjsArr: Card[] = [
    cardOne,
    cardTwo,
    cardThree,
    cardFour,
    cardFive,
    cardSix,
    cardSeven,
    cardTen,
    cardEleven,
    cardTwelve,
];

export interface Partida {
    index: number;
    cardName: string;
    cardValue: number;
    accumulatedPoints: number;
    lastScore: number;
    games: number,
    scoreMean: number,
    isGameFinished: boolean;
}

export const createInitialPartida = (): Partida => ({
    index: -1,
    cardName: "",
    cardValue: 0,
    accumulatedPoints: 0,
    lastScore: 0,
    games: 0,
    scoreMean: 0,
    isGameFinished: false,
  });

export const scoresArray: number[] = [];
  
