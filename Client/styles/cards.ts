const Bj: Array<{id: number, num: number, type: string}> = [
  { id: 1, num: 2, type: '♦' }, { id: 2, num: 3, type: '♦' }, { id: 3, num: 4, type: '♦' }, { id: 4, num: 5, type: '♦' }, { id: 5, num: 6, type: '♦' }, { id: 6, num: 7, type: '♦' }, { id: 7, num: 8, type: '♦' }, { id: 8, num: 9, type: '♦' }, { id: 9, num: 10, type: '♦' },
  { id: 10, num: 2, type: '♣' }, { id: 11, num: 3, type: '♣' }, { id: 12, num: 4, type: '♣' }, { id: 13, num: 5, type: '♣' }, { id: 14, num: 6, type: '♣' }, { id: 15, num: 7, type: '♣' }, { id: 16, num: 8, type: '♣' }, { id: 17, num: 9, type: '♣' }, { id: 18, num: 10, type: '♣' },
  { id: 19, num: 2, type: '♠' }, { id: 20, num: 3, type: '♠' }, { id: 21, num: 4, type: '♠' }, { id: 22, num: 5, type: '♠' }, { id: 23, num: 6, type: '♠' }, { id: 24, num: 7, type: '♠' }, { id: 25, num: 8, type: '♠' }, { id: 26, num: 9, type: '♠' }, { id: 27, num: 10, type: '♠' },
  { id: 28, num: 2, type: '♥' }, { id: 29, num: 3, type: '♥' }, { id: 30, num: 4, type: '♥' }, { id: 31, num: 5, type: '♥' }, { id: 32, num: 6, type: '♥' }, { id: 33, num: 7, type: '♥' }, { id: 34, num: 8, type: '♥' }, { id: 35, num: 9, type: '♥' }, { id: 36, num: 10, type: '♥' },
];
const Rps: Array<{id: number, text: string}> = [{id: 1, text: '🪨'},{id: 2, text: '📄'},{id: 3, text: '✂️'}]
const cards: object = {Rps, Bj}  
export default cards