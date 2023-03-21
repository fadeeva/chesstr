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



const GuessDebutStatMore = { id: "guess_debut_stat_more", children: [] }
const GuessDebutStatFull = { id: "guess_debut_stat_full", children: [GuessDebutStatMore] }
const GuessDebutGameList = { id: "guess_debut_game_list", children: [] }
const GuessDebut = { id: "guess_debut", children: [GuessDebutStatFull, GuessDebutGameList]}
const PlayDebut = {}
const GuessOrPlay = { id: "guess_or_play", children: [GuessDebut, PlayDebut] }
const whatDebutIsIt = { id: "what_debut_is_it", children: [GuessOrPlay] }

let startTheGameBtn = document.querySelectorAll('.start_the_game_btn')

startTheGameBtn.forEach((btn) => {
    btn.addEventListener('click', () => openWin(event))
})

function openWin(e) {
    console.log(e.target.parentElement)
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