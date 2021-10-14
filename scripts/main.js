// grab the grid
const grid = document.querySelector(".grid")
// create reference to every cell
const cells = []
const height = 25
const width = 25
// grab HTML elements
const score = document.getElementById("player-score")
const lives = document.getElementById("lives")
const startButton = document.getElementById("start-button")
const restartButton = document.getElementById("restart-button")
const welcomePage = document.querySelector(".welcome-page")
const gameOver = document.querySelector(".game-over")
const levelOneDone = document.querySelector(".level-one-done")
const levelTwoDone = document.querySelector(".level-two-done")
const gameCompleted = document.querySelector(".game-completed")
const startLevelTwoButton = document.getElementById("yes-to-level-two")
const startFinalLevelButton = document.getElementById("yes-to-level-three")
const noButton = document.querySelectorAll(".no")
const planktonAudio = document.getElementById("plankton-audio")
const fishAudio = document.getElementById("fish-audio")
const sharkAudio = document.getElementById("shark-audio")
const gameOverAudio = document.getElementById("game-over-audio")

// Create the grid
const createCells = () => {
  for (let y = 0; y < height; y++) {
    cells[y] = []
    for (let x = 0; x < width; x++) {
      const cell = document.createElement("div")
      grid.appendChild(cell)
      cells[y][x] = cell
    }
  }
}
createCells()

// add the main audio
const audio = document.querySelector("audio")
function oceanSound() {
  audio.src = "./styles/ocean-sound.wav"
  audio.play()
}
startButton.addEventListener("click", oceanSound)
// create the player

const player = {
  score: 0,
  lives: 3,
  positionY: 24,
  positionX: 12,
  keyPressed: null,
  handlePlayerInput(e) {
    player.keyPressed = e.keyCode
  },
  move() {
    cells[player.positionY][player.positionX].classList.remove("player")
    const lastKeyPressed = this.keyPressed
    this.keyPressed = null
    switch (lastKeyPressed) {
      case 39:
        if (this.positionX >= width - 1) {
          console.log("edge of grid")
          return
        }
        if (
          cells[this.positionY][this.positionX + 1].classList.contains(
            "fish-net"
          )
        ) {
          console.log("fish net in the way!")
          return
        }
        if (this.positionX < width - 1) this.positionX++
        console.log("player moves right")
        break
      case 37:
        if (this.positionX <= 0) {
          console.log("edge of grid")
          return
        }
        if (
          cells[this.positionY][this.positionX - 1].classList.contains(
            "fish-net"
          )
        ) {
          console.log("fish net in the way!")
          return
        }
        if (this.positionX > 0) this.positionX--
        console.log("player moves left")
        break
      case 38:
        if (this.positionY <= 0) {
          console.log("edge of grid")
          return
        }

        if (
          cells[this.positionY - 1][this.positionX].classList.contains(
            "fish-net"
          )
        ) {
          console.log("fish net in the way!")
          return
        }
        if (this.positionY > 0) this.positionY--
        console.log("player moves up")
        break
      case 40:
        if (this.positionY >= height - 1) {
          console.log("end of grid")
          return
        }
        if (
          cells[this.positionY + 1][this.positionX].classList.contains(
            "fish-net"
          )
        ) {
          console.log("fish net in the way!")
          return
        }
        if (this.positionY < height - 1) this.positionY++
        console.log("player moves down")
        break
    }
    cells[player.positionY][player.positionX].classList.add("player")
  },
  // check if player has lost
  livesRemaining() {
    if (this.lives <= 0) {
      clearInterval(gameTimer)
      refresh()
      grid.classList.add("hidden")
      gameOver.classList.remove("hidden")
      audio.pause()
      audio.currentTime = 0
      gameOverAudio.src = "/styles/game-over.wav"
      gameOverAudio.play()
    }
  },
}
//fish nets
let maxFishNets = 30

const fishNets = {
  fishNetCells: [],
  createFishNets() {
    for (let i = 0; i <= maxFishNets; i++) {
      // generate in random positions each time the function is called
      const fishNetDiv =
        cells[Math.floor(Math.random() * height)][
          Math.floor(Math.random() * width)
        ]
      fishNetDiv.classList.add("fish-net")
      // ensure can't be placed on starting position
      if (fishNetDiv.classList.contains("player") === true) {
        fishNetDiv.classList.remove("fish-net")
        return
      }
      this.fishNetCells.push(fishNetDiv)
    }
  },
}
fishNets.createFishNets()
// same process for plankton
let maxPlankton = 88
const plankton = {
  planktonCells: [],
  createPlankton() {
    for (let i = 0; i < maxPlankton; i++) {
      const planktonDiv =
        cells[Math.floor(Math.random() * height)][
          Math.floor(Math.random() * width)
        ]
      if (planktonDiv.classList.contains("player") === true) {
        return
      }
      planktonDiv.classList.add("plankton")
      this.planktonCells.push(planktonDiv)
    }
  },
  interaction() {
    this.planktonCells.forEach((planktonDiv) => {
      if (
        planktonDiv.classList.contains("plankton") &&
        planktonDiv.classList.contains("player")
      ) {
        const y = player.positionY
        const x = player.positionX
        cells[player.positionY][player.positionX].classList.remove("plankton")
        planktonAudio.src = "./styles/plankton.wav"
        planktonAudio.play()
        player.score += 10
        refresh()
      }
    })
  },
}
plankton.createPlankton()

// Ensure details are constantly up to date.
const refresh = () => {
  score.innerHTML = `${player.score}/500`
  if (player.lives <= 0) {
    lives.innerHTML = `${player.lives}/2`
    return
  }
  lives.innerHTML = `${player.lives - 1}/2`
}

// clear the ocean
const newOcean = () => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      cells[y][x].setAttribute("class", "")
    }
  }
  // re-initialise player and restore points to zero
  player.positionY = 24
  player.positionX = 12
  player.score = 0
  refresh()

  // refill the static ocean
  fishNets.createFishNets()
  plankton.createPlankton()
}

// add the player movement event listener
document.addEventListener("keydown", player.handlePlayerInput)

// Classes

class Shark {
  constructor(positionY, positionX, speed, name) {
    this.positionY = positionY
    this.positionX = positionX
    this.speed = speed
    this.name = name
  }
  // create movement for the sharks
  lastMovedAt = null
  move(timeSig) {
    // timeSig created to be able to alter the speed of each object easily.
    if (this.lastMovedAt === null || timeSig - this.lastMovedAt > this.speed) {
      if (this.positionX >= 0) {
        cells[this.positionY][this.positionX].classList.remove(this.name)
      }
      this.positionX = (this.positionX + 1) % width
      cells[this.positionY][this.positionX].classList.add(this.name)
      this.lastMovedAt = timeSig
    }
  }
  // take a life and return player to start position if eaten
  interaction() {
    if (
      this.positionY === player.positionY &&
      this.positionX === player.positionX
    ) {
      sharkAudio.src = "./styles/shark.wav"
      sharkAudio.play()
      const x = player.positionX
      const y = player.positionY
      cells[y][x].classList.remove("player")
      player.positionY = 24
      player.positionX = 12
      player.lives -= 1
      refresh()
    }
  }
}
//  similar process for the fish
class Fish {
  constructor(positionY, positionX, speed, name) {
    this.positionY = positionY
    this.positionX = positionX
    this.speed = speed
    this.name = name
  }
  lastMovedAt = null
  move(timeSig) {
    if (this.positionX === null) {
      return
    }
    if (this.lastMovedAt === null || timeSig - this.lastMovedAt > this.speed) {
      if (this.positionX >= 0) {
        cells[this.positionY][this.positionX].classList.remove(this.name)
      }
      if (
        this.positionX === player.positionX &&
        this.positionY === player.positionY
      ) {
        return
      }
      this.positionX = (this.positionX + 1) % width
      cells[this.positionY][this.positionX].classList.add(this.name)
      this.lastMovedAt = timeSig
    }
  }
  interaction() {
    if (
      this.positionY === player.positionY &&
      this.positionX === player.positionX
    ) {
      const x = player.positionX
      const y = player.positionY
      cells[y][x].classList.remove("fish")
      fishAudio.src = "./styles/fish.wav"
      fishAudio.play()
      this.positionX = null
      player.score = player.score += 50
      refresh()
    }
  }
}

// Create win logic for each level
const playerWinsMedium = () => {
  if (player.score >= 500) {
    // stop the game from continuing
    clearInterval(gameTimer)
    refresh()
    grid.classList.add("hidden")
    levelOneDone.classList.remove("hidden")
    audio.src = "./styles/game-win.wav"
    audio.play()
  }
}

const playerWinsHard = () => {
  if (player.score >= 500) {
    clearInterval(gameTimer)
    refresh()
    grid.classList.add("hidden")
    levelTwoDone.classList.remove("hidden")
    audio.src = "./styles/game-win.wav"
    audio.play()
  }
}
const playerWinsFinal = () => {
  if (player.score >= 500) {
    clearInterval(gameTimer)
    refresh()
    grid.classList.add("hidden")
    gameCompleted.classList.remove("hidden")
    audio.src = "./styles/game-win.wav"
    audio.play()
  }
}
// reset the page option (restart)
const resetPage = () => {
  window.location.reload()
  startGameMedium()
}
// below functions for between each level
const revealGrid = () => {
  grid.classList.remove("hidden")
}
const showWelcome = () => {
  welcomePage.classList.remove("hidden")
}
const hideWelcome = () => {
  welcomePage.classList.add("hidden")
}

const movePastLevelOne = () => {
  if (levelOneDone.classList.contains("hidden")) {
    return
  }
  newOcean()
  refresh()
  levelOneDone.classList.add("hidden")
}

const movePastLevelTwo = () => {
  if (levelTwoDone.classList.contains("hidden")) {
    return
  }
  newOcean()
  refresh()
  levelTwoDone.classList.add("hidden")
}
// activate buttons
startButton.addEventListener("click", hideWelcome)
startButton.addEventListener("click", revealGrid)
startButton.addEventListener("click", startGameMedium)
startLevelTwoButton.addEventListener("click", movePastLevelOne)
startLevelTwoButton.addEventListener("click", revealGrid)
startLevelTwoButton.addEventListener("click", startGameHard)
startLevelTwoButton.addEventListener("click", oceanSound)
startFinalLevelButton.addEventListener("click", movePastLevelTwo)
startFinalLevelButton.addEventListener("click", revealGrid)
startFinalLevelButton.addEventListener("click", startGameFinal)
startFinalLevelButton.addEventListener("click", oceanSound)

// for each so that every no button returns the player to the landing page
noButton.forEach(function (button) {
  button.addEventListener("click", resetPage)
})
restartButton.addEventListener("click", resetPage)

// stop the browser from scrolling when the arrows are inputted:
window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault()
    }
  },
  false
)

// create the moving game components:

const shark1 = new Shark(8, 4, 300, "shark")
const shark2 = new Shark(10, 9, 300, "shark")
const shark3 = new Shark(5, 12, 250, "shark")
const shark4 = new Shark(18, 3, 250, "shark")
const shark5 = new Shark(22, 6, 200, "shark")
const shark6 = new Shark(2, 2, 200, "shark")
const shark7 = new Shark(16, 17, 175, "shark")
const shark8 = new Shark(23, 6, 175, "shark")
const shark9 = new Shark(10, 2, 150, "shark")
const shark10 = new Shark(5, 22, 200, "shark")
const shark11 = new Shark(7, 10, 100, "shark")
const shark12 = new Shark(8, 17, 100, "shark")
const shark13 = new Shark(1, 2, 100, "shark")
const shark14 = new Shark(12, 12, 100, "shark")
const shark15 = new Shark(19, 5, 100, "shark")
const shark16 = new Shark(10, 1, 100, "shark")
const shark17 = new Shark(2, 6, 100, "shark")

const fish1 = new Fish(7, 2, 300, "fish")
const fish2 = new Fish(14, 1, 300, "fish")
const fish3 = new Fish(11, 23, 300, "fish")
const fish4 = new Fish(1, 6, 300, "fish")
const fish5 = new Fish(12, 3, 300, "fish")
const fish6 = new Fish(13, 20, 300, "fish")
const fish7 = new Fish(2, 1, 300, "fish")
const fish8 = new Fish(20, 5, 300, "fish")
const fish9 = new Fish(5, 17, 300, "fish")
const fish10 = new Fish(12, 10, 300, "fish")
const fish11 = new Fish(8, 19, 300, "fish")
const fish12 = new Fish(22, 3, 300, "fish")
const fish13 = new Fish(6, 20, 300, "fish")
const fish14 = new Fish(17, 13, 300, "fish")
const fish15 = new Fish(3, 8, 300, "fish")
const fish16 = new Fish(23, 19, 300, "fish")
const fish17 = new Fish(10, 15, 250, "fish")
const fish18 = new Fish(15, 12, 250, "fish")
const fish19 = new Fish(4, 4, 250, "fish")
const fish20 = new Fish(21, 8, 250, "fish")
const fish21 = new Fish(18, 24, 250, "fish")
const fish22 = new Fish(19, 20, 250, "fish")

// initialise the levels
let gameTimer

function startGameMedium() {
  gameTimer = setInterval(() => {
    const timeSig = Date.now()

    player.move()

    fish1.move(timeSig)
    fish1.interaction()
    fish2.move(timeSig)
    fish2.interaction()
    fish3.move(timeSig)
    fish3.interaction()
    fish4.move(timeSig)
    fish4.interaction()
    fish5.move(timeSig)
    fish5.interaction()
    fish6.move(timeSig)
    fish6.interaction()
    fish7.move(timeSig)
    fish7.interaction()
    fish8.move(timeSig)
    fish8.interaction()
    fish9.move(timeSig)
    fish9.interaction()
    fish10.move(timeSig)
    fish10.interaction()
    fish11.move(timeSig)
    fish11.interaction()
    fish12.move(timeSig)
    fish12.interaction()
    fish13.move(timeSig)
    fish13.interaction()
    fish14.move(timeSig)
    fish14.interaction()
    fish15.move(timeSig)
    fish15.interaction()
    fish16.move(timeSig)
    fish16.interaction()
    fish17.move(timeSig)
    fish17.interaction()
    fish18.move(timeSig)
    fish18.interaction()
    fish19.move(timeSig)
    fish19.interaction()
    fish20.move(timeSig)
    fish20.interaction()
    fish21.move(timeSig)
    fish21.interaction()
    fish22.move(timeSig)
    fish22.interaction()

    shark1.move(timeSig)
    shark1.interaction()
    shark2.move(timeSig)
    shark2.interaction()
    shark3.move(timeSig)
    shark3.interaction()
    shark4.move(timeSig)
    shark4.interaction()
    shark5.move(timeSig)
    shark5.interaction()
    shark6.move(timeSig)
    shark6.interaction()

    player.livesRemaining()
    playerWinsMedium()
    plankton.interaction()
  }, 100)
}
function startGameHard() {
  gameTimer = setInterval(() => {
    const timeSig = Date.now()

    player.move()

    fish1.move(timeSig)
    fish1.interaction()
    fish2.move(timeSig)
    fish2.interaction()
    fish3.move(timeSig)
    fish3.interaction()
    fish4.move(timeSig)
    fish4.interaction()
    fish5.move(timeSig)
    fish5.interaction()
    fish6.move(timeSig)
    fish6.interaction()
    fish7.move(timeSig)
    fish7.interaction()
    fish8.move(timeSig)
    fish8.interaction()
    fish9.move(timeSig)
    fish9.interaction()
    fish10.move(timeSig)
    fish10.interaction()
    fish11.move(timeSig)
    fish11.interaction()
    fish12.move(timeSig)
    fish12.interaction()
    fish13.move(timeSig)
    fish13.interaction()
    fish14.move(timeSig)
    fish14.interaction()
    fish15.move(timeSig)
    fish15.interaction()
    fish16.move(timeSig)
    fish16.interaction()
    fish17.move(timeSig)
    fish17.interaction()
    fish18.move(timeSig)
    fish18.interaction()
    fish19.move(timeSig)
    fish19.interaction()
    fish20.move(timeSig)
    fish20.interaction()
    fish21.move(timeSig)
    fish21.interaction()
    fish22.move(timeSig)
    fish22.interaction()

    shark1.move(timeSig)
    shark1.interaction()
    shark2.move(timeSig)
    shark2.interaction()
    shark3.move(timeSig)
    shark3.interaction()
    shark4.move(timeSig)
    shark4.interaction()
    shark5.move(timeSig)
    shark5.interaction()
    shark6.move(timeSig)
    shark6.interaction()
    shark7.move(timeSig)
    shark7.interaction()
    shark8.move(timeSig)
    shark8.interaction()
    shark9.move(timeSig)
    shark9.interaction()
    shark10.move(timeSig)
    shark10.interaction()

    player.livesRemaining()
    playerWinsHard()
    plankton.interaction()
  }, 100)
}

function startGameFinal() {
  gameTimer = setInterval(() => {
    const timeSig = Date.now()

    player.move()

    fish1.move(timeSig)
    fish1.interaction()
    fish2.move(timeSig)
    fish2.interaction()
    fish3.move(timeSig)
    fish3.interaction()
    fish4.move(timeSig)
    fish4.interaction()
    fish5.move(timeSig)
    fish5.interaction()
    fish6.move(timeSig)
    fish6.interaction()
    fish7.move(timeSig)
    fish7.interaction()
    fish8.move(timeSig)
    fish8.interaction()
    fish9.move(timeSig)
    fish9.interaction()
    fish10.move(timeSig)
    fish10.interaction()
    fish11.move(timeSig)
    fish11.interaction()
    fish12.move(timeSig)
    fish12.interaction()
    fish13.move(timeSig)
    fish13.interaction()
    fish14.move(timeSig)
    fish14.interaction()
    fish15.move(timeSig)
    fish15.interaction()
    fish16.move(timeSig)
    fish16.interaction()
    fish17.move(timeSig)
    fish17.interaction()
    fish18.move(timeSig)
    fish18.interaction()
    fish19.move(timeSig)
    fish19.interaction()
    fish20.move(timeSig)
    fish20.interaction()
    fish21.move(timeSig)
    fish21.interaction()
    fish22.move(timeSig)
    fish22.interaction()

    shark1.move(timeSig)
    shark1.interaction()
    shark2.move(timeSig)
    shark2.interaction()
    shark3.move(timeSig)
    shark3.interaction()
    shark4.move(timeSig)
    shark4.interaction()
    shark5.move(timeSig)
    shark5.interaction()
    shark6.move(timeSig)
    shark6.interaction()
    shark7.move(timeSig)
    shark7.interaction()
    shark8.move(timeSig)
    shark8.interaction()
    shark9.move(timeSig)
    shark9.interaction()
    shark10.move(timeSig)
    shark10.interaction()
    shark11.move(timeSig)
    shark11.interaction()
    shark12.move(timeSig)
    shark12.interaction()
    shark13.move(timeSig)
    shark13.interaction()
    shark14.move(timeSig)
    shark14.interaction()
    shark15.move(timeSig)
    shark15.interaction()
    shark16.move(timeSig)
    shark16.interaction()
    shark17.move(timeSig)
    shark17.interaction()

    player.livesRemaining()
    playerWinsFinal()
    plankton.interaction()
  }, 100)
}
