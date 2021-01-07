let x = 0
let y = 0
let mole = null
const moleWidth = 50
const moleHeight = 50

let score = 0
let maxPossibleScore = -1
let scoreContainer = null

let time = 60 //seconds 
let timeIntervalId = null
let timeContainer = null
let moleRotationInterval = 2 //seconds 
let moleRotationIntervalId = null

let moleRotationIntervalIncTime = 10 //seconds
const moleRotationIntervalIncFactor = 0.75

const incmaxPossibleScore = () => {
    maxPossibleScore = maxPossibleScore + 1
    displayScore()
}

const makeTimeContainer = () => {
    const div = document.createElement('div')

    div.style.position = 'fixed'
    div.style.right = 0 + 'px'
    div.style.top = 0 + 'px'
    div.style.fontFamily = 'sans-serif'
    div.style.fontSize = 20 + 'px'

    document.body.appendChild(div)

    timeContainer = div
}

const displayTime = () => {
    timeContainer.innerText = time + ' seconds'
}

const speedUp = () => {
    if(time % moleRotationIntervalIncTime !== 0) return
    moleRotationInterval = moleRotationInterval * moleRotationIntervalIncFactor
    startMoleRotationInterval()
}

const decreaseTime = () => {
    time = time - 1
    if(time === 0) endGame()
    speedUp()
    displayTime()
}

const makeScoreContainer = () => {
    const div = document.createElement('div')

    div.style.position = 'fixed'
    div.style.left = 0 + 'px'
    div.style.top = 0 + 'px'
    div.style.fontFamily = 'sans-serif'
    div.style.fontSize = 20 + 'px'

    document.body.appendChild(div)

    scoreContainer = div
}

const displayScore = () => {
    scoreContainer.innerText = score + '/' + maxPossibleScore + ' points'
}

const incScore = () => {
    score = score + 1
    displayScore()
}

const randomizeNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const randomizeMolePosition = () => {
    const xMax = window.innerWidth - moleWidth
    const yMax = window.innerHeight - moleHeight

    x = randomizeNumber(0,xMax)
    y = randomizeNumber(0,yMax)
    
}

const removeMove = () => {
    if(mole === null) return

    mole.remove()
}

const makeMole = () => {
    removeMove()
    incmaxPossibleScore()

    const div = document.createElement('div')

    div.style.width = moleWidth + 'px'
    div.style.height = moleHeight + 'px'
    div.style.position = 'fixed'
    div.style.left = x + 'px'
    div.style.top = y + 'px'
    div.style.backgroundImage = 'url("./mole.png")'
    div.style.backgroundSize = 'cover'
    div.style.cursor = 'pointer'

    div.addEventListener(
        'click',
        clickOnMole
    )

    document.body.appendChild(div);

    mole = div;
}

const makeNewMole = () => {
    randomizeMolePosition()
    makeMole()
}

const clickOnMole = () => {
    startMoleRotationInterval()
    incScore()
    makeNewMole()
}

const endGame = () => {
    alert('Your score is: ' + score + 'out of' + maxPossibleScore)
    resetGame()
}

const resetGame = () => {
    window.location = ''
}

const startTimeInterval = () => {
    timeIntervalId = setInterval(() => {
        decreaseTime()
    }, 1000);
}

const startMoleRotationInterval = () => {
    stopMoleRotationInterval()
    moleRotationIntervalId = setInterval(() => {
        makeNewMole()
    }, moleRotationInterval * 1000);
}

const stopMoleRotationInterval = () => {
    if(moleRotationIntervalId === null) return
    clearInterval(moleRotationIntervalId)
}

const init = () => {
    makeScoreContainer()
    displayScore()
    makeTimeContainer()
    displayTime()
    makeNewMole()
    startTimeInterval()
    startMoleRotationInterval()
}

init()