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
		inquirer.prompt([
				// User prompts go here
				{
					type: "input",
					name: "userInput",
					message: "Guess a letter: ",
					validate: function(input) {
						var pass = input.match(/^[a-zA-Z]/i);

						if(pass) {
							return true;
						}

						return "Invalid character entered, only letters are valid.";
					}
				}
			])
		.then((answers) => {
			totalGuesses++;

			theWord.takeGuess(answers.userInput);

			console.log("Guess #" + totalGuesses, answers.userInput);
			console.log("Number of Guesses Remaining: ", maxGuessesAllowed - totalGuesses);

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