window.onload = function() { init(); }

let canvas = null;
let ctx = null;

let squareColor = {
    dark:  '#0E111C',
    light: '#D1B386',
}

/**
 * Стартовая точка игры.
 */
function init() {
    canvas = document.getElementById("squares");
    canvasCnt = document.getElementById("chess_desk");
    
    ctx = canvas.getContext("2d");
    
    let sideOfSquare = 80;
    
    drawChessSquares(sideOfSquare, squareColor);
}

/**
 * Рисует шахматную доску, учитывая длину стороны клетки (sideOfSquare)
 * и цвета для клетки (squareColor)
 */
function drawChessSquares(sideOfSquare, squareColor) {
    let currentColor = squareColor.light;
    let x = 0, y = 0; 
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            ctx.fillStyle = currentColor;
            ctx.fillRect(x, y, sideOfSquare, sideOfSquare);
            ctx.fill();
            x += sideOfSquare;

            if(j != 7)
                currentColor = (currentColor == squareColor.light) ? squareColor.dark : squareColor.light;
        }
        x = 0;
        y += sideOfSquare;   
    }

}