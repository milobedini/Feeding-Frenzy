// grab the grid
const grid = document.querySelector(".grid")
// create reference to every cell
const cells = []
const height = 25
const width = 25
const score = document.getElementById("player-score")
const lives = document.getElementById("lives")
const startButton = document.querySelector("button")
// need to create and add restart button

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

// create the sky
const sky = {
  skyCells: [],
  createSky() {
    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < width; x++) {
        const skyDiv = cells[y][x]
        skyDiv.classList.add("sky")
        this.skyCells.push(skyDiv)
      }
    }
  },
}

// initialise the player
let playerDiv = cells[24][12]
playerDiv.classList.add("player")

// random list of numbers between 3 and 24 (y)

//initialise the fish nets
let maxFishNets = 12

const fishNets = {
  fishNetCells: [],
  createFishNets() {
    for (let i = 0; i < maxFishNets; i++) {
      const fishNetDiv =
        cells[Math.floor(Math.random() * height)][
          Math.floor(Math.random() * width)
        ]
      if (fishNetDiv.classList.contains("player") === true) {
        return
      }
      fishNetDiv.classList.add("fish-net")
      this.fishNetCells.push(fishNetDiv)
    }
  },
}
fishNets.createFishNets()

// same process for plankton
let maxPlankton = 80
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
        player.score += 50
        refresh()
      }
    })
  },
}
plankton.createPlankton()

const newOcean = () => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      cells[y][x].setAttribute("class", "")
    }
  }
  // INITIALISE PLAYER
  player.score = 0
  player.lives = 2
  fishNets.createFishNets()
  plankton.createPlankton()
  // INITIALISE SHARKS & FISH
}
// Ensure details are constantly up to date.
const refresh = () => {
  score.innerHTML = player.score
  lives.innerHTML = player.lives
}

// create function that hides the start button
// and maybe changes to some text elsewhere.

// reset the page option
const resetPage = () => {
  window.location.reload()
  startGame()
}

// activate buttons
// startButton.addEventListener("click", startGame)
// startButton.addEventListener('click', hideBtn)
// startButton.addEventListener('click', soundBegins)
// restartButton.addEventListener('click', resetPage)

const player = {
  score: 0,
  lives: 2,
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
        if (this.positionX < width - 1) this.positionX++
        console.log("player moves right")
        break
      case 37:
        if (this.positionX > 0) this.positionX--
        console.log("player moves left")
        break
      case 38:
        if (this.positionY > 0) this.positionY--
        console.log("player moves up")
        break
      case 40:
        if (this.positionY < height - 1) this.positionY++
        console.log("player moves down")
        break
    }
    cells[player.positionY][player.positionX].classList.add("player")
  },
  livesRemaining() {
    if (this.lives <= 0) {
      // update some test
      // play some audio
    }
  },
}

// add the player's event listener
document.addEventListener("keydown", player.handlePlayerInput)

// Classes

class movingObject {
  constructor(positionY, positionX, speed, name) {
    this.positionY = positionY
    this.positionX = positionX
    this.speed = speed
    this.name = name
  }
  lastMovedAt = null
  move(timeSig) {
    if (this.lastMovedAt === null || timeSig - this.lastMovedAt > this.speed) {
      if (this.positionX >= 0) {
        cells[this.positionY][this.positionX].classList.remove(this.name)
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
      cells[y][x].classList.remove("player")
      player.positionY = 24
      player.positionX = 12
      player.lives -= 1
      refresh()
    }
  }
}
class shark extends movingObject {
  constructor(positionY, positionX, speed, name) {
    super(positionY, positionX, speed, name)
  }
  move(timeSig) {
    const isPlayerOnShark =
      this.positionY === player.positionY && this.positionX === player.positionX
    super.move(timeSig)
    if (isPlayerOnShark) {
      cells[player.positionY][player.positionX].classList.remove("player")
      player.positionY = this.positionY
      player.positionX = this.positionX
      cells[player.positionY][player.positionX].classList.add("player")
    }
  }
}

// Create win logic
const playerWins = () => {
  if (player.score >= 1000) {
    update()
    // clearInterval(gameTimer)
    // update p text for win message
    // play some music
  }
}
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

// create the stuff

const shark1 = new movingObject(8, 4, 500, "shark")
const shark2 = new movingObject(10, 9, 500, "shark")
const shark3 = new movingObject(21, 12, 500, "shark")
const shark4 = new movingObject(18, 3, 500, "shark")
const shark5 = new movingObject(9, 6, 500, "shark")
const shark6 = new movingObject(3, 1, 500, "shark")

// execute
let gameTimer

function startGame() {
  gameTimer = setInterval(() => {
    const timeSig = Date.now()
    player.move()

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
    playerWins()
    plankton.interaction()
  }, 100)
}
startGame()
