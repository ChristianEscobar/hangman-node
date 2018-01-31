const word = require("./Word");
const inquirer = require("inquirer");
const chalk = require("chalk");
const art = require("ascii-art");

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
			'Fox McCloud',
			'Toad',
			'Donkey Kong',
			'Sonic The Hedgehog',
			'Crash Bandicoot'];

const maxGuessesAllowed = 10;

// Start the game
// IIFE function
(function () {
	testAsciiArt();

	// Randomly select a word
	let currentWord = new word(selectRandomCharacterName());

	playGame(0, currentWord);
})();

function playGame(totalGuesses, theWord) {
	theWord.displayWord();

	if(theWord.hasWordBeenGuessed()) {
		displayWinner();

		return;
	}

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
		displayLoser();
	}
}

// Randomly selects a name from the array of names
function selectRandomCharacterName() {
	return characterNames[Math.floor(Math.random() * characterNames.length)];
}

// Displays information to the user
function displayHUD(totalGuesses, theWord) {
	console.log(chalk.whiteBright("\nThis is guess #"), chalk.yellowBright(totalGuesses + 1));
	console.log(chalk.whiteBright("Current guesses: "), chalk.yellowBright(theWord.lettersGuessed));
	console.log(chalk.whiteBright("Number of Guesses Remaining: "), chalk.yellowBright(maxGuessesAllowed - totalGuesses, "\n"));
}

// Displays a winning message
function displayWinner() {
	const messages = ["Winner Winner Chicken Dinner!",
		"You Win!",
		"Wow, that was amazing!  You Win!",
		"You are awesome!  You Win!",
		"Shuckey Duckey Quack Quack!  You Win!",
		"Wow, you know your stuff!   You Win!"
	];

	let winningMessage = messages[Math.floor(Math.random() * messages.length)];

	console.log(chalk.magentaBright("\n", winningMessage));
}

// Displays a losing message
function displayLoser() {
	const messages = ["Sorry, better luck next time.  Game Over!",
		"You need practice.  Game Over!",
		"You aren't that good.  Game Over!",
		"Sorry, try again next time.  Game Over!",
		"Come back when you are ready.  Game Over!",
		"You Lose.  Game Over!",
		"You are all out of guesses.  Game Over!",
		"Awww, so close.  Game Over!",
		"HA HA, you're too slow.  Game Over!"
	];

	let losingMessage = messages[Math.floor(Math.random() * messages.length)];

	console.log(chalk.redBright("\n", losingMessage));
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

function testChalk() {
	console.log(chalk.blue("Hello World!"));
}

function testAsciiArt() {
	art.Figlet.fontPath = "Fonts";
	art.font('my text', 'Doom', function(rendered){
    //do stuff here
});
}