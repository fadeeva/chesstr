window.onload = function() { init(); }

let canvas = null;
let ctx = null;

const SIDE_OF_SQUARE = 80;

const SQUARE_COLOR = {
    dark:  '#0E111C',
    light: '#D1B386',
}

const PIECES = {  
    black: {
        figures: [ './img/pieces/bishop_b.svg',
                   './img/pieces/king_b.svg',
                   './img/pieces/knight_b.svg',
                   './img/pieces/queen_b.svg',
                   './img/pieces/rook_b.svg', ],

        pawn   :   './img/pieces/pawn_b.svg'
    },

    white: {
        figures: [ './img/pieces/bishop_w.svg',
                   './img/pieces/king_w.svg',
                   './img/pieces/knight_w.svg',
                   './img/pieces/queen_w.svg',
                   './img/pieces/rook_w.svg', ],

        pawn   :   './img/pieces/pawn_w.svg'
    },
    
    white_: {
        bishop: { src: './img/pieces/bishop_w.svg', coord: ['c1', 'f1'] },
        king:   { src: './img/pieces/king_w.svg',   coord: ['e1'] },
        knight: { src: './img/pieces/knight_w.svg', coord: ['b1', 'g1'] },
        queen:  { src: './img/pieces/queen_w.svg',  coord: ['d1'] },
        rook:   { src: './img/pieces/rook_w.svg',   coord: ['a1', 'h1'] },
        pawn:   { src: './img/pieces/pawn_w.svg',   coord: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'] }
    },
    
    black_: {
        bishop: { src: './img/pieces/bishop_b.svg', coord: ['c8', 'f'] },
        king:   { src: './img/pieces/king_b.svg',   coord: ['e8'] },
        knight: { src: './img/pieces/knight_b.svg', coord: ['b8', 'g8'] },
        queen:  { src: './img/pieces/queen_b.svg',  coord: ['d8'] },
        rook:   { src: './img/pieces/rook_b.svg',   coord: ['a8', 'h8'] },
        pawn:   { src: './img/pieces/pawn_b.svg',   coord: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'] }
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
    
    for(let src of PIECES.black.figures) {
        createPiece(src, x, y)
        x += SIDE_OF_SQUARE
    }
    
    x = 0
    for(let i = 0; i < 8; i++) {
        createPiece(PIECES.black.pawn, x, SIDE_OF_SQUARE)
        x += SIDE_OF_SQUARE
    }
    
    x = 0
    y = 560
    for(let src of PIECES.white.figures) {
        createPiece(src, x, y)
        x += SIDE_OF_SQUARE
    }
    
    x = 0
    for(let i = 0; i < 8; i++) {
        createPiece(PIECES.white.pawn, x, y - SIDE_OF_SQUARE)
        x += SIDE_OF_SQUARE
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