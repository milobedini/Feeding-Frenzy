// grab the grid
const grid = document.querySelector(".grid")
// create reference to every cell
const cells = []
const height = 25
const width = 25
const score = document.getElementById("player-score")
const lives = document.getElementById("lives")
const startButton = document.getElementById("start-button")
const restartButton = document.getElementById("restart-button")
const welcomePage = document.querySelector(".welcome-page")
const levelOneDone = document.querySelector(".level-one-done")
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

// create space for endgame message to appear

// initialise the player
initialisePlayer = () => {
  let playerDiv = cells[24][12]
  playerDiv.classList.add("player")
}

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
        player.score += 10
        refresh()
      }
    })
  },
}
plankton.createPlankton()

// Ensure details are constantly up to date.
const refresh = () => {
  score.innerHTML = player.score
  lives.innerHTML = player.lives
}

const newOcean = () => {
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      cells[y][x].setAttribute("class", "")
    }
  }
  // INITIALISE PLAYER
  player.positionY = 24
  player.positionX = 12
  player.score = 0
  player.lives = 2
  refresh()

  fishNets.createFishNets()
  plankton.createPlankton()
  // INITIALISE SHARKS & FISH
}

// create function that hides the start button
// and maybe changes to some text elsewhere.

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
    // const isPlayerOnShark =
    // this.positionY === player.positionY && this.positionX === player.positionX
    if (this.lastMovedAt === null || timeSig - this.lastMovedAt > this.speed) {
      if (this.positionX >= 0) {
        cells[this.positionY][this.positionX].classList.remove(this.name)
      }
      this.positionX = (this.positionX + 1) % width
      cells[this.positionY][this.positionX].classList.add(this.name)
      this.lastMovedAt = timeSig
    }
    // if (isPlayerOnShark) {
    //   cells[player.positionY][player.positionX].classList.remove("player")
    //   player.positionY = this.positionY
    //   player.positionX = this.positionX
    //   cells[player.positionY][player.positionX].classList.add("player")
    // }
  }
  // take a life and return player to start position if eaten
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
  // currently removing the class whilst the player is on the fish but then reappears!
  interaction() {
    if (
      this.positionY === player.positionY &&
      this.positionX === player.positionX
    ) {
      const x = player.positionX
      const y = player.positionY
      cells[y][x].classList.remove("fish")
      // make sure that the fish does not reappear when the player moves away.
      this.positionX = null
      player.score = player.score += 50
      refresh()
    }
  }
}

// Create win logic
const playerWinsMedium = () => {
  if (player.score >= 500) {
    refresh()
    grid.classList.add("hidden")
    levelOneDone.classList.remove("hidden")

    // update p text for win message
    // play some music
  }
}
// reset the page option
const resetPage = () => {
  window.location.reload()
  startGame()
}

const revealGrid = () => {
  grid.classList.remove("hidden")
}

const hideWelcome = () => {
  welcomePage.classList.add("hidden")
}
// activate buttons
startButton.addEventListener("click", hideWelcome)
startButton.addEventListener("click", revealGrid)
startButton.addEventListener("click", startGameMedium)

restartButton.addEventListener("click", newOcean)
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

const shark1 = new Shark(8, 4, 300, "shark")
const shark2 = new Shark(10, 9, 300, "shark")
const shark3 = new Shark(21, 12, 300, "shark")
const shark4 = new Shark(18, 3, 300, "shark")
const shark5 = new Shark(9, 6, 300, "shark")
const shark6 = new Shark(3, 1, 300, "shark")

const fish1 = new Fish(7, 2, 400, "fish")
const fish2 = new Fish(14, 9, 400, "fish")
const fish3 = new Fish(11, 23, 400, "fish")
const fish4 = new Fish(24, 1, 400, "fish")
const fish5 = new Fish(12, 13, 400, "fish")
const fish6 = new Fish(19, 10, 400, "fish")
// execute
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
