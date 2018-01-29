const Letter = require("./Letter");

function Word(word) {
	this.word = [];
	this.displayWord = function() {
		let wordProgress = "";

		this.word.map((ltr) => {
			wordProgress += (ltr.toString() + " ");
		});

		console.log(wordProgress);
	};
	this.takeGuess = function(userGuess) {
		this.word.map((ltr) => {
			ltr.guess(userGuess);
		});
	};

	// Store an init function in the prototype that will be used
	// to populate the word array with Letter objects
	Word.prototype.init = function() {
		const charsInWord = word.split("");

		charsInWord.map((char) => {
			// Handles spaces in word by adding an empty letter and setting 
			// that letter objects guessed value to true.
			if(char !== " ") {
				this.word.push(new Letter(char));
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