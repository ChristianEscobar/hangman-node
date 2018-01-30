const Letter = require("./Letter");

function Word(word) {
	this.word = [];
	this.lettersGuessed = [];
	this.displayWord = function() {
		// Displays the current word's progress
		let wordProgress = "";

		this.word.map((ltr) => {
			wordProgress += (ltr.toString() + " ");
		});

		console.log(wordProgress);
	};
	this.takeGuess = function(userGuess) {
		// Processes a users guess
		this.word.map((ltr) => {
			ltr.guess(userGuess);
		});
	};
	this.letterHasBeenUsed = function(userGuess) {
		// Checks if the letter has already been used
		return this.lettersGuessed.includes(userGuess);
	};
	this.hasWordBeenGuessed = function() {
		// Checks if the word has been correctly guessed
		let totalCorrect = 0;

		this.word.map((ltr) => {
			if(ltr.hasBeenGuessed === true) {
				totalCorrect++;
			}
		});

		if(totalCorrect === this.word.length) {
			return true;
		}

		return false;
	}


	// Store an init function in the prototype that will be used
	// to populate the word array with Letter objects
	Word.prototype.init = function() {
		const charsInWord = word.split("");

		charsInWord.map((char) => {
			// Handles spaces in word by adding an empty letter and setting 
			// that letter objects guessed value to true.
			if(char !== " ") {
				this.word.push(new Letter(char));
				this.totalForWin++;
			} else {
				let thisIsAspace = new Letter(char);
				thisIsAspace.hasBeenGuessed = true;
				this.word.push(thisIsAspace);
			}
		});
	}

	// Call the init function
	this.init();
}

module.exports = Word;