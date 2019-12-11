const isGuessCorrect = (userGuess, letter) => {
	return userGuess.toLowerCase() === letter.toLowerCase();
};

class Letter {
	constructor(letter) {
		this.letter = letter;
		this.hasBeenGuessed = false;
	}

	toString() {
		// Displays the letter or an underscore based on if it has been guessed
		const displayChar = this.hasBeenGuessed ? this.letter : '_';
		return displayChar;
	}

	guess(userGuess) {
		// Checks if a user's guess is a letter in the current word
		if (!this.hasBeenGuessed) {
			if (isGuessCorrect(userGuess, this.letter)) {
				this.hasBeenGuessed = true;
			} else {
				this.hasBeenGuessed = false;
			}
		}
	}
}

module.exports = Letter;
