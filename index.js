const CharacterName = require('./characterName');
const inquirer = require('inquirer');
const chalk = require('chalk');
const figlet = require('figlet');

const maxGuessesAllowed = 10;

// Start the game
// IIFE function
(function() {
	displayTitle();
})();

function initializeGame() {
	try {
		// Randomly select a character name
		let currentName = new CharacterName();

		playGame(0, currentName);
	} catch (error) {
		throw error;
	}
}

function playGame(totalGuesses, name) {
	name.displayGuessProgress();

	if (name.hasNameBeenGuessed()) {
		displayWinOrLose(true);

		return;
	}

	if (totalGuesses < maxGuessesAllowed) {
		displayHUD(totalGuesses, name);

		inquirer
			.prompt([
				// User prompts go here
				{
					type: 'input',
					name: 'userInput',
					message: "What's your guess?",
					validate: function(input) {
						let pass = input.match(/^[a-zA-Z]/i);

						if (pass) {
							if (input.length > 1) {
								return 'Only single letters are allowed.';
							} else if (name.hasNameBeenGuessed(input) === false) {
								return true;
							} else {
								return (
									"The letter '" +
									input +
									"' has already been used.  Try another one."
								);
							}
						}

						return 'Invalid character entered, only letters are valid.';
					}
				}
			])
			.then(answers => {
				try {
					totalGuesses++;

					name.takeGuess(answers.userInput);

					// Store this guess
					name.letterGuessed = answers.userInput;

					// Recursive call
					playGame(totalGuesses, name);
				} catch (error) {
					throw error;
				}
			})
			.catch(error => {
				throw error;
			});
	} else {
		displayWinOrLose(false);
	}
}

// Displays information to the user
function displayHUD(totalGuesses, theWord) {
	console.log(
		chalk.whiteBright('\nThis is guess #'),
		chalk.yellowBright(totalGuesses + 1)
	);
	console.log(
		chalk.whiteBright('Current guesses: '),
		chalk.yellowBright(theWord.lettersGuessed)
	);
	console.log(
		chalk.whiteBright('Number of Guesses Remaining: '),
		chalk.yellowBright(maxGuessesAllowed - totalGuesses, '\n')
	);
}

// Display win or lose
function displayWinOrLose(isWinner) {
	if (isWinner) {
		figlet('You Win!', function(err, data) {
			if (err) {
				throw err;
			}

			console.log(data);

			playAgainPrompt();
		});
	} else {
		figlet('You Lose!', function(err, data) {
			if (err) {
				throw err;
			}

			console.log(data);

			playAgainPrompt();
		});
	}
}

// Display ascii art title
function displayTitle() {
	figlet('HANGMAN', function(err, word) {
		if (err) {
			throw err;
		}
		console.log(word);

		figlet('Video Game', function(err, word) {
			if (err) {
				throw err;
			}

			console.log(word);

			figlet('Characters', function(err, word) {
				if (err) {
					throw err;
				}

				console.log(word);

				initializeGame();
			});
		});
	});
}

// Displays play again prompt
function playAgainPrompt() {
	inquirer
		.prompt([
			// User prompts go here
			{
				type: 'confirm',
				name: 'playAgain',
				message: 'Would you like to play again?',
				default: 'Yes'
			}
		])
		.then(answers => {
			if (answers.playAgain) {
				initializeGame();
			} else {
				console.log(chalk.greenBright('OK, maybe next time.'));
			}
		});
}

//====================================//
// Test function section
//====================================//
// function testWordGeneration() {
// 	const randomWord = selectRandomCharacterName();

// 	console.log(randomWord);

// 	let currentWord = new Word(randomWord);

// 	currentWord.displayWord();
// }

// function testPrintWord(printThisWord) {
// 	printThisWord.word.map(ltr => {
// 		console.log(ltr.letter, ' ==> ', ltr.hasBeenGuessed);
// 	});
// }

// function testChalk() {
// 	console.log(chalk.blue('Hello World!'));
// }

// function testFiglet() {
// 	figlet('Hello World!!', function(err, data) {
// 		if (err) {
// 			console.log('Something went wrong...');
// 			console.dir(err);
// 			return;
// 		}
// 		console.log(data);
// 	});
// }
