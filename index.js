/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        // create a new div element, which will become the game card
        // add the class game-card to the list
        let gameCard = document.createElement("div"); // create a new div element
        gameCard.classList.add("game-card"); // add the class "game-card" to it
        
        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        gameCard.innerHTML = `
            <img src="${games[i].img}" class="game-img" alt="${games[i].name}">
            <h3>${games[i].name}</h3>
            <p>${games[i].description}</p>
        `;
        
        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => acc + game.backers, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = totalContributions.toLocaleString();

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString()}`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = GAMES_JSON.length;


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

    // Secret Key component 1
    console.log(unfundedGames.length); // log the length of the filtered array

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGames);

    // Secret Key component 2
    console.log(fundedGames.length); // log the length of the filtered array

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const numUnfundedGames = unfundedGames.length; // This will give the number of unfunded games

// create a string that explains the number of unfunded games using the ternary operator
//const totalRaise = GAMES_JSON.reduce((acc, game) => acc + game.pledged, 0); // Sum all the pledges
const totalGames = GAMES_JSON.length; // Total number of games

const displayStr = `
  A total of $${totalRaised.toLocaleString()} has been raised for ${totalGames} game${totalGames !== 1 ? 's' : ''}.
  Currently, ${numUnfundedGames} game${numUnfundedGames !== 1 ? 's' : ''} remain unfunded.
  We need your help to fund these amazing games!`;


// create a new DOM element containing the template string and append it to the description container
//const descriptionContainer = document.getElementById("description-container");
const pElement = document.createElement("p"); // Create a new <p> element
pElement.innerHTML = displayStr; // Set its inner HTML to the string we created

descriptionContainer.appendChild(pElement); // Append the <p> to the descriptionContainer


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
// Step 1: Sort the games by the pledged amount in descending order
// const sortedGames = GAMES_JSON.sort((a, b) => b.pledged - a.pledged);

// Destructure the top 2 funded games from the sorted list
const [firstGame, secondGame, ...rest] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
//firstGameContainer.innerHTML = firstGame.name;  // Display the name of the most funded game
firstGameContainer.innerHTML = `
    <h3>🥇 Top Funded Game</h3>
    <p>${firstGame.name}</p>  <!-- Display the name of the most funded game -->
`;

// do the same for the runner up item
//secondGameContainer.innerHTML = secondGame.name;  // Display the name of the second most funded game
secondGameContainer.innerHTML = `
    <h3>🥈 Runner Up</h3>
    <p>${secondGame.name}</p>  <!-- Display the name of the second most funded game -->
`;