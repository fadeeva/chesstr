window.onload = function() { init(); }

console.log(GAMES)

let canvas = null;
let ctx = null;

const SIDE_OF_SQUARE = 80;

const SQUARE_COLOR = {
    dark:  '#0E111C',
    light: '#D1B386',
}

const LETTER_TO_NUMBER = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8 }

const PIECES = { 
    wB : { src         : './img/pieces/bishop_w.svg',
           startCoords : ['c1', 'f1'],
         },

    wK : { src         : './img/pieces/king_w.svg',
           startCoords : ['e1'],
         },

    wN : { src         : './img/pieces/knight_w.svg',
           startCoords : ['b1', 'g1'],
         },

    wQ : { src         : './img/pieces/queen_w.svg',
           startCoords : ['d1'],
         },

    wR : { src         : './img/pieces/rook_w.svg',
           startCoords : ['a1', 'h1'],
         },

    w :  { src         : './img/pieces/pawn_w.svg',
           startCoords : ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
         },

    bB: { src         : './img/pieces/bishop_b.svg',
          startCoords : ['c8', 'f8'],
        },

    bK: { src         : './img/pieces/king_b.svg',
          startCoords : ['e8'],
        },

    bN: { src         : './img/pieces/knight_b.svg',
          startCoords : ['b8', 'g8'],
        },

    bQ: { src         : './img/pieces/queen_b.svg',
          startCoords : ['d8'],
        },

    bR: { src         : './img/pieces/rook_b.svg',
          startCoords : ['a8', 'h8'],
        },

    b:  { src         : './img/pieces/pawn_b.svg',
          startCoords : ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
        }
    
}

const OFFSET = { x: 0, y: 0 };
const CURRENT_GAME = []

/**
 * Стартовая точка игры.
 */
function init() {
    canvas = document.getElementById('squares');
    ctx = canvas.getContext('2d');
    
    drawChessSquares();
    setUpPieces();
    
    OFFSET.x = document.getElementById('squares').offsetLeft;
    OFFSET.y = document.getElementById('squares').offsetTop;
    
    canvas.addEventListener('mousedown', handleMouseDown);
    
    console.log(CURRENT_GAME)
}

function handleMouseDown(event) { 
    event = event || window.event
    
    whatPiece(event)
}

function whatPiece(event) {
    let cursorX = parseInt(event.pageX - OFFSET.x)
    let cursorY = parseInt(event.pageY - OFFSET.y)
    
    let result = CURRENT_GAME.find(({ coords }) => coords === cartesianInChessCoords(cursorX, cursorY));
    if(result) {
        console.log(result)
    } else {
        console.log(false)
    }
    
}

function createPiece(src, startCoords) {
    let piece = new Image()
    let coord = chessCoordsInCartesian(startCoords)
    piece.src = src
    piece.onload = () => { ctx.drawImage(piece, coord.x, coord.y) };
}

function setUpPieces() {
    for(piece in PIECES) {
        for(let cn of PIECES[piece].startCoords) {
            createPiece(PIECES[piece].src, cn);
            CURRENT_GAME.push( { piece: piece,  coords: cn })
        }
    }
}

function chessCoordsInCartesian(startCoords) {
    let x = LETTER_TO_NUMBER[startCoords[0]] - 1
    let y = 8 - parseInt(startCoords[1])
    x *= SIDE_OF_SQUARE
    y *= SIDE_OF_SQUARE
    return({x: x, y: y})
}

function cartesianInChessCoords(x, y) {
    ltr = Object.keys(LETTER_TO_NUMBER).find(key => LETTER_TO_NUMBER[key] === parseInt(x / SIDE_OF_SQUARE + 1))
    num = 8 - parseInt(y / SIDE_OF_SQUARE)
    return(ltr + '' + num)
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