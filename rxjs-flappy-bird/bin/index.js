"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const html_renderer_1 = require("./html-renderer");
const gamePipe = (x, y) => ({ x, y, checked: false });
const gameSize = 10;
const createPipes = y => (random => Array.from(Array(gameSize).keys())
    .map(e => gamePipe(e, y))
    .filter(e => e.x < random || e.x > random + 2))(Math.floor(Math.random() * Math.floor(gameSize)));
const gamePipes$ = (0, rxjs_1.interval)(500)
    .pipe((0, operators_1.scan)(acc => (acc.length < 2 ? [...acc, createPipes(gameSize)] : acc)
    .filter(c => c.some(e => e.y > 0))
    .map(cols => cols.map(e => gamePipe(e.x, e.y - 1))), [createPipes(gameSize / 2), createPipes(gameSize)]));
const fly = xPos => xPos > 0 ? xPos -= 1 : xPos; // 게임 사이즈 밖으로 안 나가게하려고.
const fall = xPos => xPos < gameSize - 1 ? xPos += 1 : gameSize - 1;
const bird$ = (0, rxjs_1.merge)((0, rxjs_1.interval)(1000), (0, rxjs_1.fromEvent)(document, 'keydown')) // 1초마다 or keydown됐을 때
    .pipe((0, operators_1.scan)(// scan: 인자 순서 무관하게 메서드에서 반환된 값이 내부에 저장하는 state값이 됨.
(xPos, curr) => {
    // console.log("SCAN", xPos, curr)
    /* 키보드로 눌렀으면 fly(아니면 curr은 그냥 0부터 count하는 숫자임) */
    return curr instanceof KeyboardEvent ? fly(xPos) : fall(xPos);
}, gameSize - 1));
const updateGame = (bird, pipes) => (game => (pipes.forEach(col => col.forEach(v => game[v.x][v.y] = 2)),
    game[bird][0] = 1,
    game))(Array(gameSize).fill(0).map(e => Array(gameSize).fill(0)));
const valueOnCollisionFor = pipes => ({
    when: predicate => !pipes[0][0].checked && predicate ? (pipes[0][0].checked = true, 1) : 0
});
(0, rxjs_1.combineLatest)(bird$, gamePipes$)
    .pipe((0, operators_1.scan)((state, [bird, pipes]) => ({
    bird: bird,
    pipes: pipes,
    lives: state.lives - valueOnCollisionFor(pipes)
        .when(pipes.some(c => c.some(c => c.y === 0 && c.x === bird))),
    score: state.score + valueOnCollisionFor(pipes)
        .when(pipes[0][0].y === 0)
}), { lives: 3, score: 0, bird: 0, pipes: [] }), (0, operators_1.tap)(state => (0, html_renderer_1.paint)(updateGame(state.bird, state.pipes), state.lives, state.score)), (0, operators_1.takeWhile)(state => state.lives > 0)).subscribe();
