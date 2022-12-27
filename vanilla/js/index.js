window.onload = function() { init(); }

let canvas = null;
let ctx = null;

const SIDE_OF_SQUARE = 80;

const SQUARE_COLOR = {
    dark:  '#0E111C',
    light: '#D1B386',
}

/*const COORD*/

/**
 * Стартовая точка игры.
 */
function init() {
    canvas = document.getElementById("squares");
    canvasCnt = document.getElementById("chess_desk");
    
    ctx = canvas.getContext("2d");
    
    drawChessSquares();
    setUpPieces();
}


function createPiece(src, x, y) {
    let piece = new Image();
    piece.src = src
        piece.onload = () => {
            ctx.drawImage(piece, x, y);
        };
}

function setUpPieces() {
    let x = 0
    let y = 0
    
    const pieceArr = {
        figures: [ './img/pieces/bishop.svg',
                   './img/pieces/king.svg',
                   './img/pieces/knight.svg',
                   './img/pieces/queen.svg',
                   './img/pieces/rook.svg', ],
        
        pawn   :   './img/pieces/pawn.svg'
    }
    
    
    
    for(let src of pieceArr.figures) {
        createPiece(src, x, y)
        x += SIDE_OF_SQUARE
    }
    
    x = 0
    for(let i = 0; i < 8; i++) {
        createPiece(pieceArr.pawn, x, SIDE_OF_SQUARE)
        x += SIDE_OF_SQUARE
        console.log(x, y)
    }
    
}

/**
 * Рисует шахматную доску, учитывая длину стороны клетки (SIDE_OF_SQUARE)
 * и цвета для клетки (SQUARE_COLOR)
 */
function drawChessSquares() {
    let currentColor = SQUARE_COLOR.light;
    let x = 0, y = 0; 
    for(let i = 0; i < 8; i++) {
        for(let j = 0; j < 8; j++) {
            ctx.fillStyle = currentColor;
            ctx.fillRect(x, y, SIDE_OF_SQUARE, SIDE_OF_SQUARE);
            ctx.fill();
            x += SIDE_OF_SQUARE;

            if(j != 7)
                currentColor = (currentColor == SQUARE_COLOR.light) ? SQUARE_COLOR.dark : SQUARE_COLOR.light;
        }
        x = 0;
        y += SIDE_OF_SQUARE;   
    }

}