const word = require("./Word");
const inquirer = require("inquirer");

const characterNames = ['Mario',
			'Lara Croft',
			'Samus Aran',
			'Link',
			'Master Chief',
			'Kratos',
			'Gordon Freeman',
			'Nathan Drake',
			'Luigi',
			'Pikachu',
			'Sephiroth',
			'Glados',
			'Jill Valentine',
			'Marcus Fenix',
			'Cloud Strife',
			'Princess Zelda',
			'Niko Bellic',
			'Yoshi',
			'Ganon',
			'Sub Zero',
			'Ryu Hayabusa',
			'Fox McCloud'];

const maxGuessesAllowed = 10;

// Start the game
// IIFE function
(function () {
	// Randomly select a word
	let currentWord = new word(selectRandomCharacterName());

	playGame(0, currentWord);
})();

function playGame(totalGuesses, theWord) {
	theWord.displayWord();

	if(totalGuesses < maxGuessesAllowed) {
		displayHUD(totalGuesses, theWord);

		inquirer.prompt([
				// User prompts go here
				{
					type: "input",
					name: "userInput",
					message: "What's your guess?",
					validate: function(input) {
						var pass = input.match(/^[a-zA-Z]/i);

						if(pass) {
							if(theWord.letterHasBeenUsed(input) === false) {
								return true;
							} else {
								return "That letter has already been used.  Try another one.";
							}
						}

						return "Invalid character entered, only letters are valid.";
					}
				}
			])
		.then((answers) => {
			totalGuesses++;

			theWord.takeGuess(answers.userInput);

			// Store this guess
			theWord.lettersGuessed.push(answers.userInput);

			// Recursive call
			playGame(totalGuesses, theWord);
		});
	} else {
		console.log("Game Over!");
	}
}

function selectRandomCharacterName() {
	return characterNames[Math.floor(Math.random() * characterNames.length)];
}

function displayHUD(totalGuesses, theWord) {
	console.log("\nThis is guess #", totalGuesses + 1);
	console.log("Current guesses: ", theWord.lettersGuessed);
	console.log("Number of Guesses Remaining: ", maxGuessesAllowed - totalGuesses, "\n");
}


//====================================//
// Test function section
//====================================//
function testWordGeneration() {
	const randomWord = selectRandomCharacterName();

	console.log(randomWord);

	let currentWord = new word(randomWord);

	currentWord.displayWord();
}

function testPrintWord(printThisWord) {
	printThisWord.word.map((ltr) => {
		console.log(ltr.letter, ' ==> ', ltr.hasBeenGuessed);
	});
}