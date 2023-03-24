/*
                                        -> guess_debut_stat_full -> guess_debut_stat_more
                      -> guess_debut ->|-> guess_debut_game_list
                     |   ... -> guess_debut_result               
     guess_or_play ->| 
                     |
                      -> play_debut       
    
*/
let closeBtn = document.querySelectorAll('.close_btn')
const moduleWindowsArr = Object.values(document.querySelectorAll('.mod_wnd'))
const moduleWindowsIDs = []


/*
const GuessDebutStatMore = { id: "guess_debut_stat_more", children: [] }
const GuessDebutStatFull = { id: "guess_debut_stat_full", children: [GuessDebutStatMore] }
const GuessDebutGameList = { id: "guess_debut_game_list", children: [] }
const GuessDebut         = { id: "guess_debut",           children: [GuessDebutStatFull, GuessDebutGameList]}
const PlayDebut          = {}
const GuessOrPlay        = { id: "guess_or_play",         children: [GuessDebut, PlayDebut] }
const whatDebutIsIt      = { id: "what_debut_is_it",      children: [GuessOrPlay] }

const modWin = {
    what_debut_is_it      : whatDebutIsIt,
    guess_or_play         : GuessOrPlay,
    
    guess_game            : { id: "guess_game",      children: [GuessDebut] },
    play_game             : { id: "play_game",       children: [PlayDebut] },
    
    guess_debut           : GuessDebut,
    guess_debut_game_list : GuessDebutGameList,
    guess_debut_stat_full : GuessDebutStatFull,
    guess_debut_stat_more : GuessDebutStatMore,
}*/

let nextNode = document.querySelectorAll('.next_node')

nextNode.forEach((node) => {
    node.addEventListener('click', () => openWin(event))
})

function openWin(e) {
    let parent = e.currentTarget
    let destination_id = parent.getAttribute("next_node")
    let element = document.getElementById(destination_id)
    element.classList.toggle('display_none')

    console.log()
}

moduleWindowsArr.forEach((modWin) =>{
    moduleWindowsIDs.push(modWin.id)   
})

closeBtn.forEach((btn) => {
    btn.addEventListener('click', () => closeWin(event))
})

function getID(btn) {
    let classArr = Object.values(btn.classList)
    classArr = classArr.filter(e => e !== 'close_btn')
    let wID = ''
    classArr.forEach((cls) => {
        if(moduleWindowsIDs.includes(cls))
            wID = cls
    })

    return wID
}

function closeWin(e) {
    let modWindow = document.getElementById(getID(e.target))
    modWindow.classList.add('display_none')
}