// grab html elements as variables
const grid = document.querySelector(".grid")
const allTheCells = Array.from(document.querySelectorAll(".grid div"))
console.log(allTheCells)
let playerScoreText = document.getElementById("player-score")
let livesRemainingText = document.getElementById("lives")
// variables
let playerScore = 0
playerScoreText.innerText = playerScore
let livesRemaining = 2
livesRemainingText.innerText = livesRemaining
let maxScore = 1000
const fishNetIndex = []
const fishNetQuantity = 12
const planktonIndex = []
const planktonQuantity = 80
// initialise the player
const playerStartIndex = 612
let playerIndex = playerStartIndex
let sharkIndex
let allTheSharks = []

console.log(playerIndex)
allTheCells[playerIndex].classList.add("player")
// The below creates a randomised array of a specified length for the fish nets to be generated in.
for (let i = 0; i < fishNetQuantity; i++) {
  fishNetIndex.push(Math.floor(Math.random() * 625))
}
console.log(fishNetIndex)
// add the class of fish-net to the grid
for (let i = 0; i < fishNetIndex.length; i++) {
  let currentIndex = allTheCells[fishNetIndex[i]]
  currentIndex.classList.add("fish-net")
  //   prevent fishnets from appearing where player spawns
  if (currentIndex.classList.contains("player")) {
    currentIndex.classList.remove("fish-net")
  }
}
// Same process to add the plankton
for (let i = 0; i < planktonQuantity; i++) {
  planktonIndex.push(Math.floor(Math.random() * 625))
}
console.log(planktonIndex)
// add the class of fish-net to the grid
for (let i = 0; i < planktonIndex.length; i++) {
  let currentIndex = allTheCells[planktonIndex[i]]
  currentIndex.classList.add("plankton")
  //   prevent fishnets from appearing where player spawns
  if (
    currentIndex.classList.contains("player") ||
    currentIndex.classList.contains("fish-net")
  ) {
    currentIndex.classList.remove("plankton")
  }
}

// functions

const generateSharks = () => {
  // they can spawn at row 0, 24 etc. but not final row (600) so max is 576
  // create random number (multiples of 24)
  if (allTheSharks.length > 50) {
    allTheSharks = []
  }
  sharkIndex = Math.floor(Math.random() * 25) * 25
  console.log(sharkIndex)
  if (sharkIndex < 74 || sharkIndex === 600) {
    console.log("shark cannot be spawned here!")
    return
  }

  allTheCells[sharkIndex].classList.add("shark")
  allTheSharks.push(sharkIndex)
  console.log(allTheSharks)
}
const moveSharks = () => {
  for (let i = 0; i < allTheSharks.length; i++) {
    if (allTheSharks[i] >= 625) {
      return
    }
    allTheCells[allTheSharks[i]].classList.remove("shark")
  }
  allTheSharks = allTheSharks.map((shark) => shark + 1)
  console.log(allTheSharks)

  for (let i = 0; i < allTheSharks.length; i++) {
    allTheCells[allTheSharks[i]].classList.add("shark")
  }
}
setInterval(generateSharks, 2000)
setInterval(moveSharks, 1000)
console.log(allTheSharks)

// same process for the fish

const handleArrowUp = () => {
  const isPlayerOnTopEdge = (playerIndex) => playerIndex < 25
  tryMovePlayer(-25, isPlayerOnTopEdge)
}

const handleArrowLeft = () => {
  const isPlayerOnLeftEdge = (playerIndex) => playerIndex % 25 === 0
  tryMovePlayer(-1, isPlayerOnLeftEdge)
}

const handleArrowDown = () => {
  const isPlayerOnBottomEdge = (playerIndex) => playerIndex > 599
  tryMovePlayer(25, isPlayerOnBottomEdge)
}

const handleArrowRight = () => {
  const isPlayerOnRightEdge = (playerIndex) => (playerIndex + 1) % 25 === 0
  tryMovePlayer(1, isPlayerOnRightEdge)
}

const tryMovePlayer = (changeInIndex, isIndexAtLimit) => {
  if (isIndexAtLimit(playerIndex)) {
    console.log("end of row/column!")
    return
  }
  const newIndex = playerIndex + changeInIndex
  const newCell = allTheCells[newIndex]
  //   Stop the function if there is a fish net
  if (newCell.classList.contains("fish-net")) {
    console.log("fish net encountered!")
    return
  }
  if (newCell.classList.contains("plankton")) {
    newCell.classList.remove("plankton")
    playerScore += 10
  }
  // insert side effects for if new cell class list contains plankton, fish or sharks
  // plankton: add 10 to current points, fish add 50
  // shark: minus one from lives and return index to playerStartIndex
  allTheCells[playerIndex].classList.remove("player")
  newCell.classList.add("player")
  //   Below just to test player score variable, currently +1 on every move.
  playerScoreText.innerText = playerScore
  playerIndex = newIndex
}

// event listeners
document.addEventListener("keydown", function (e) {
  switch (e.key) {
    case "ArrowUp":
      handleArrowUp()
      break
    case "ArrowLeft":
      handleArrowLeft()
      break
    case "ArrowDown":
      handleArrowDown()
      break
    case "ArrowRight":
      handleArrowRight()
      break
  }
})
// prevent default browser action to stop arrows from scrolling the page
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
