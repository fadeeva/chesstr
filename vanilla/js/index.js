window.onload = function() { init(); }

let canvas = null;
let ctx = null;

const SIDE_OF_SQUARE = 80;

const SQUARE_COLOR = {
    dark:  '#0E111C',
    light: '#D1B386',
}

const LETTER_TO_NUMBER = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 }

const PIECES = { 
    white: {
        bishop: { src: './img/pieces/bishop_w.svg', chess_notation: ['c1', 'f1'] },
        king:   { src: './img/pieces/king_w.svg',   chess_notation: ['e1'] },
        knight: { src: './img/pieces/knight_w.svg', chess_notation: ['b1', 'g1'] },
        queen:  { src: './img/pieces/queen_w.svg',  chess_notation: ['d1'] },
        rook:   { src: './img/pieces/rook_w.svg',   chess_notation: ['a1', 'h1'] },
        pawn:   { src: './img/pieces/pawn_w.svg',   chess_notation: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'] }
    },
    
    black: {
        bishop: { src: './img/pieces/bishop_b.svg', chess_notation: ['c8', 'f8'] },
        king:   { src: './img/pieces/king_b.svg',   chess_notation: ['e8'] },
        knight: { src: './img/pieces/knight_b.svg', chess_notation: ['b8', 'g8'] },
        queen:  { src: './img/pieces/queen_b.svg',  chess_notation: ['d8'] },
        rook:   { src: './img/pieces/rook_b.svg',   chess_notation: ['a8', 'h8'] },
        pawn:   { src: './img/pieces/pawn_b.svg',   chess_notation: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'] }
    },
    
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

function createPiece(src, chess_notation) {
    let piece = new Image();
    let coord = transformCoords(chess_notation)
    piece.src = src
        piece.onload = () => {
            ctx.drawImage(piece, coord.x, coord.y);
        };
}

function setUpPieces() {
    let x = 0
    let y = 0
    for(let piece in PIECES.black) {
        for(let cn of PIECES.black[piece].chess_notation) {
            createPiece(PIECES.black[piece].src, cn)
        }
    }
    
    x = 0
    y = 0
    for(let piece in PIECES.white) {
        for(let cn of PIECES.white[piece].chess_notation) {
            createPiece(PIECES.white[piece].src, cn)
        }
    }
}

function transformCoords(chess_notation) {
    let x = LETTER_TO_NUMBER[chess_notation[0]] - 1
    let y = 8 - parseInt(chess_notation[1])
    x *= SIDE_OF_SQUARE
    y *= SIDE_OF_SQUARE
    return({x: x, y: y})
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