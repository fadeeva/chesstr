/*
                                        -> guess_debut_stat_full -> guess_debut_stat_more
                      -> guess_debut ->|-> guess_debut_game_list
                     |   ... -> guess_debut_result               
     guess_or_play ->| 
                     |
                      -> play_debut       
    
*/
/*
{ id : 'guess_debut_result',    next : 'guess_or_play' }
next : [
            { id : 'guess_debut', next : [{ id : 'guess_debut_stat_full', next : { id   : 'guess_debut_stat_more' },
                                                                                   next :  null },
                                          { id : 'guess_debut_game_list', next : null }, ] },
            
            { id : 'play_debut', next: null } ]*/
const MENU_ROUTE = {
    guess_or_play : {
        guess_debut : {},
        play_debut  : {}
    }
}         

let closeBtn = document.querySelectorAll('.close_btn')
const moduleWindowsArr = Object.values(document.querySelectorAll('.mod_wnd'))
const moduleWindowsIDs = []

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