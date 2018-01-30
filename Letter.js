function Letter(letter) {
	this.letter = letter;
	this.hasBeenGuessed = false;
	this.toString = function() {
		// Displays the letter or an underscore based on if it has been guessed
		if(this.hasBeenGuessed === true) {
			return this.letter;
		} else {
			return '_';
		}
	};
	this.guess = function(userGuess) {
		// Checks if a user's guess is a letter in the current word
		if(this.hasBeenGuessed === true) {
			return;
		} else {
			if(this.letter.toLowerCase() === userGuess.toLowerCase()) {
				this.hasBeenGuessed = true;
			} else {
				this.hasBeenGuessed = false;
			}
		}
	};
}

module.exports = Letter;