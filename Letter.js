function Letter(letter) {
	this.letter = letter;
	this.hasBeenGuessed = false;
	this.toString = function() {
		if(this.hasBeenGuessed === true) {
			return this.letter;
		} else {
			return '_';
		}
	};
	this.guess = function(userGuess) {
		if(this.letter.hasBeenGuessed === true) {
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