window.onload = function() { init(); }

//console.log(GAMES)
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
let moves = []
let pieceIMG = new Image()

let MovingImgTag = new Image()
let animateArr = [ /*['e2e4 e7e5', 'd2d4 h7h6', 'b2b3 c7c5', 'h2h4 d7d6']*/
    {
        start  : chessCoordsInCartesian('e2'),
        finish : chessCoordsInCartesian('e4'),
        piece  : PIECES['w'].src
    },
    {
        start  : chessCoordsInCartesian('e7'),
        finish : chessCoordsInCartesian('e5'),
        piece  : PIECES['b'].src
    },
    {
        start  : chessCoordsInCartesian('d2'),
        finish : chessCoordsInCartesian('d4'),
        piece  : PIECES['w'].src
    },
]

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
    
    guessDebut()
    
    canvas.addEventListener("mousedown", handleMouseDown);

}

function handleMouseDown(event) { 
    event = event || window.event
    //whatPiece(event)
}

function guessDebut( startData = [{ type:'open', list: ['Center Game'] }] ) {
    // random
    let game = GAMES[startData[0].type].find(g => g.name === "Not a Center Game");
    //
    playGame(game.notation)
}

function playGame(chessCoords) {
    let white = ''
    let black = ''
    
    i = 0
    chessCoords.forEach((m) => { moves = moves.concat(m.split(' ')) })
    // next_move()
    
//    animateArr.forEach((p) => {
//        MovingImgTag = new Image()
//        MovingImgTag.src = p.piece
//        MovingImgTag.onload = animate(p, MovingImgTag)
//    })
    MovingImgTag.src = animateArr[0].piece
    MovingImgTag.onload = animate
//    MovingImgTag.src = animate_from_to[0].piece
//    MovingImgTag.onload = animate
    
}

function animate() {
    let piece = animateArr[0]
    
    ctx.clearRect(0, 0, 648, 648);
    drawChessSquares();
    
    console.log(piece.start.x)
    ctx.drawImage(MovingImgTag, piece.start.x, piece.start.y);
    
    piece.start.y -= 6; // Скорректировать координаты, сейчас не на середине останавливается
    
//    if (animate_from_to.start.y > animate_from_to.finish.y || animate_from_to.start.x < animate_from_to.finish.x)
    if (piece.start.y >= piece.finish.y)
        requestAnimationFrame(animate.bind(piece))
}

function next_move() {
    piece = i%2 == 0 ? 'w' : 'b'
//    pieceIMG.src = PIECES[piece].src
    let coord = chessCoordsInCartesian(moves[i].slice(2))
    let delCoords = chessCoordsInCartesian(moves[i].slice(0, 2))
    let color = getColorOfSquare(moves[i].slice(0, 2))
    
    ctx.fillStyle = color;
    ctx.fillRect(delCoords.x, delCoords.y, SIDE_OF_SQUARE, SIDE_OF_SQUARE);
    ctx.fill();
    
    y_a = coord.y
    x_a = coord.x
    MovingImgTag.src = PIECES[piece].src
    MovingImgTag.onload = animate
    
//    y = delCoords.y
//    pieceIMG.onload = function() { 
//        ctx.clearRect(0, 0, canvas.width, canvas.height);
//        drawChessSquares()
//        ctx.drawImage(pieceIMG, coord.x, y)
//        y += 4;
//        if (y > 250) requestAnimationFrame(self) 
//    };
    
    if(i == moves.length - 1) return
    i++
    setTimeout(next_move, 3000); // Посчитать время в зависимости от длины шага
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

/*function movePiece(src, startCoords, removeCoords) {
    
    let piece = new Image()
    let coord = chessCoordsInCartesian(startCoords)
    let delCoords = chessCoordsInCartesian(removeCoords)
    let color = getColorOfSquare(removeCoords)
    // меняем animate_to_from
    
    
    piece.src = src
    ctx.drawImage(piece, coord.x, coord.y)
    
//    console.log(piece, coord.x, coord.y)
    
    ctx.fillStyle = color;
    ctx.fillRect(delCoords.x, delCoords.y, SIDE_OF_SQUARE, SIDE_OF_SQUARE);
    ctx.fill();
    
    return src
}*/

function getColorOfSquare(squareCoords) {
    let letter = LETTER_TO_NUMBER[squareCoords[0]]
    let digit = parseInt(squareCoords[1])
    let colot = ''
    
    if ((letter % 2 == 0 && digit % 2 == 0) || (letter % 2 != 0 && digit % 2 != 0)) {
        color = SQUARE_COLOR.dark
    } else {
        color = SQUARE_COLOR.light
    }
    return color 
}

function createPiece(src, startCoords) {
    let piece = new Image()
    let coord = chessCoordsInCartesian(startCoords)
    
    piece.src = src
    /*piece.onload = () => { 
        ctx.drawImage(piece, coord.x, coord.y)
    };*/
    
    ctx.drawImage(piece, coord.x, coord.y)
}

function setUpPieces() {
    for(piece in PIECES) {
        for(let cn of PIECES[piece].startCoords) {
            createPiece(PIECES[piece].src, cn);
            CURRENT_GAME.push({ piece: piece,  coords: cn })
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