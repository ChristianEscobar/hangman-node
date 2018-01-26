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
		if(userGuess === this.letter) {
			this.hasBeenGuessed = true;
		} else {
			this.hasBeenGuessed = false;
		}
	};
}

module.exports = Letter;