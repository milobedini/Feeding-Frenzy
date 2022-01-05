# Feeding Frenzy- SEI Project 1

# Overview
Feeding Frenzy is an arcade-style aquatic game that took inspiration from the original version of 2004. The player’s fish must navigate the ocean and hunt down prey, whilst avoiding fishing nets and watching out for predators. The game consists of 3 levels of increasing difficulty.
This was my first project with General Assembly and within development generally. Feeding Frenzy was built using Vanilla JavaScript (as well as HTML and CSS) over a one week period.

## Deployed -> [Feeding Frenzy](https://milobedini.github.io/Feeding-Frenzy/) 

## Code Installation:
Simply clone or download the repository and open `index.html` with a browser’s live server.

<img width="1251" alt="Screenshot 2021-10-14 at 18 29 15" src="https://user-images.githubusercontent.com/89992629/137367300-3ca6fd1e-381d-43b0-967b-f11fdefbe76e.png">

# The Brief
* Render a grid-based game.
* Design logic for winning with visual indication of completion.
* Allow for restarting the game without reloading the browser.
* Use Vanilla JavaScript for DOM manipulation.
* Use semantic markup for HTML and CSS.
* The finished product should be publicly accessible and deployed.

# Technologies Used
* JavaScript 
* HTML 
* CSS
* Git and GitHub

# Approach

## 1) Planning

The first day of the project was spent solely on planning the project in the form of pseudocode and a wireframe. I broke these down into planning what each of the three files needed to provide to the game (such as the audio within the HTML file, the grid generation within the JavaScript file). I decided that the most logical approach would be to generate the (static) positions of the fishing nets and plankton algorithmically, whilst the sharks and the small fish would be determined at the start of each level with customisable traits. A 25x25 grid was used in order to allow enough space for the many game objects to interact reasonably.

## 2) Functionality

Feeding Frenzy’s win logic requires the player to get to 500 points on each level with 2 lives for the entire game. The grid was initialised using a for loop. Initially this was done so that each cell had a different ‘index’ number (i.e. from 0 to 624) but restructuring the grid so that each cell had an x and a y reference (from 0-24) was key in simplifying some of the later functionality.
For the player’s fish, an object was created with the score, lives, current position, and functionality to handle player input, moving the fish, and to check if the player had lost the game. A refresh function was used to continually update the DOM for the player’s score and lives. A snippet of the player object is shown below:
#### Code Snippet 
<img width="518" alt="Screenshot 2021-12-29 at 11 48 16" src="https://user-images.githubusercontent.com/89992629/147661758-e9f35a68-d9d3-4b3f-b5bc-1a29f6946c84.png">

The fish nets and plankton were also objects and were generated in the same way to each other. Using `Math.random()` I was able to simply set the number of each that were desired and have them randomly generated each time the game or level was initialised, crucially meaning that the game would never play in the same way. The below shows the plankton object, which also highlights how the interaction with the player was formulated.
#### Code Snippet 
<img width="574" alt="Screenshot 2021-12-29 at 11 51 15" src="https://user-images.githubusercontent.com/89992629/147661802-7c7c09d4-52c3-4d97-a10a-2dc73d8b8c15.png">


A `newOcean()` function was created in order to clear the cells from any game objects so that the game could be rebuilt between levels or when restarting the game.
The sharks and fish were created using classes, in order that many could be produced with varying values (namely position and speed). I was particularly happy with this code due to the ease it gave to modifying the difficulty of the levels. The shark class is in the below snippet:
#### Code Snippet 
<img width="583" alt="Screenshot 2021-12-29 at 11 57 07" src="https://user-images.githubusercontent.com/89992629/147661815-ed76b05d-3a9a-41d4-b4e2-ac314c43bad1.png">


Finally, the logic to win each level was created, as well as the functions to initialise each level with the appropriate components. For example the final level has 20 sharks, around half of which move over twice as quickly as in the first level which has just 6 sharks.


## 3) Styling

The final day of the project was spent cleaning things up and styling the game. Toggling classes was instrumental to allow the game to have a player result screen in between each level. The many sounds for the game were created using audio tags within the HTML, and triggered by the functionality of the JavaScript (for when the player interacts with a plankton for example). CSS keyframes were used for making the player’s fish pulse. Finally, a media query was used in order to ensure that the game was not playable on unsuitable screen sizes. This was necessary due to the large grid, but the game should be playable on all laptop/desktop devices (1,200px width minimum).

# Feeding Frenzy- Screenshot Walkthrough

#### Landing Page
<img width="1410" alt="Screenshot 2021-12-29 at 12 26 17" src="https://user-images.githubusercontent.com/89992629/147661957-987dbcac-b683-4961-a24e-3ac93f9b1acd.png">

#### The Game
<img width="1376" alt="Screenshot 2021-12-29 at 12 27 14" src="https://user-images.githubusercontent.com/89992629/147662032-bb0a52d8-9b71-474f-a22b-06f9c7b50c90.png">

#### Level Success
<img width="1431" alt="Screenshot 2021-12-29 at 12 28 13" src="https://user-images.githubusercontent.com/89992629/147662107-eb1fa9b5-e4a1-4ea2-a8d0-99671f0fbdde.png">

#### Game Over
<img width="1214" alt="Screenshot 2021-12-29 at 12 30 08" src="https://user-images.githubusercontent.com/89992629/147662270-83ccdb66-9c2d-4168-97c0-566edcc59405.png">

#### Player Wins
<img width="1256" alt="Screenshot 2021-12-29 at 12 31 34" src="https://user-images.githubusercontent.com/89992629/147662406-54acda94-9b6a-4c66-923b-17a03e0899fd.png">


# Wins & Blockers

### **Wins**
* Voted the cohort’s favourite game to play.
* The stationary game objects (the fish nets and the plankton) being randomly generated at each level to ensure the player will never play the same game twice.
* The use of classes in order to make the game generation much more logical and customisable.

### **Blockers**
* Initially I had some issues in how to create moving objects (the sharks and the fish), and to track where they were at all times to determine when they interacted with the player’s fish. As mentioned, this was solved by using classes which contained the shark object’s current position.

# Bugs
* There is an issue when the sharks move through the fish nets and the fish net temporarily disappears.
* Very occasionally the game’s background (the ocean) will not load.

# Future Improvements
* As per the original Feeding Frenzy, have the player’s fish increase in size with the number of points accumulated.
* Allow the sharks to swim in both horizontal directions. 

# Key Takeaways
I learnt a great deal from my first software engineering project, and gained a good grounding in Vanilla JavaScript. The use of classes, objects and intervals was a particularly useful experience for me going forward.
