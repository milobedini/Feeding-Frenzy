// grab html elements as variables
const grid = document.querySelector(".grid")
const allTheCells = document.querySelectorAll(".grid div")
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
// initialise the player
const playerStartIndex = 612
let playerIndex = playerStartIndex

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

// let playerIndex = playerStartIndex
// console.log(playerIndex)
// functions

// event listeners
