"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paint = void 0;
const createElem = col => {
    const elem = document.createElement('div');
    elem.classList.add('board');
    elem.style.display = 'inline-block';
    elem.style.marginLeft = '10px';
    elem.style.height = '6px';
    elem.style.width = '6px';
    elem.style['background-color'] =
        col === 0
            ? 'white'
            : (col === 1
                ? 'cornflowerblue'
                : col === 2
                    ? 'gray'
                    : 'silver');
    elem.style['border-radius'] = '90%';
    return elem;
};
const paint = (game, lives, score) => {
    document.body.innerHTML = `Lives: ${lives}, Score: ${score}`;
    game.forEach(row => {
        const rowContainer = document.createElement('div');
        row.forEach(col => rowContainer.appendChild(createElem(col)));
        document.body.appendChild(rowContainer);
    });
};
exports.paint = paint;
