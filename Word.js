const Letter = require("./Letter");

function Word(word) {
	this.word = [];
	this.displayWord = function() {
		let wordProgress = "";

		this.word.map((letter) => {
			wordProgress += (letter.toString() + " ");
		});

		console.log(wordProgress);
	};
	this.takeGuess = function(userGuess) {
		this.word.map((letter) => {
			letter.guess(userGuess);
		});
	};

	// Initialize the word array
	// function init() {
	// 	const charsInWord = word.split("");

	// 	charsInWord.map((char) => {
	// 		this.word.push(new Letter(char));
	// 	});
	// }

	Word.prototype.init = function() {
		const charsInWord = word.split("");

		charsInWord.map((char) => {
			this.word.push(new Letter(char));
		});
	}

	this.init();
}

module.exports = Word;