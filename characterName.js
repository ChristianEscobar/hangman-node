const Letter = require('./letter');

const characterNames = [
	'Mario',
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
	'Subzero',
	'Ryu Hayabusa',
	'Fox McCloud',
	'Toad',
	'Donkey Kong',
	'Sonic The Hedgehog',
	'Crash Bandicoot',
	'Earthworm Jim',
	'Rayman',
	'Diddy Kong',
	'Bowser',
	'Megaman',
	'Max Payne',
	'Pacman',
	'Duke Nukem'
];
const initialize = Symbol('initialize'); // Used to implement a private method

// Randomly selects a character name
const getCharacterName = () => {
	return characterNames[Math.floor(Math.random() * characterNames.length)];
};

class CharacterName {
	constructor(characterName = null) {
		this.letterObjects = [];
		this.lettersGuessed = [];
		this.totalForWin = 0;
		this.name = characterName ? characterName : getCharacterName();
		this[initialize]();
	}

	[initialize]() {
		const charsInName = this.name.split('');

		// For each character in a name, create a Letter object
		charsInName.map(char => {
			// Handles spaces in name by adding an empty Letter and setting hasBeenGuessed value to true.
			if (char !== ' ') {
				this.letterObjects.push(new Letter(char));
				this.totalForWin++;
			} else {
				let spaceAsLetter = new Letter(char);
				spaceAsLetter.hasBeenGuessed = true;
				this.letterObjects.push(spaceAsLetter);
			}
		});
	}

	set letterGuessed(userGuess) {
		this.lettersGuessed.push(userGuess);
	}

	getGuessProgress() {
		// Display progress
		let guessProgress = '';

		this.letterObjects.map(ltr => {
			guessProgress += ltr.toString() + ' ';
		});

		guessProgress = guessProgress.trim();
		return guessProgress;
	}

	takeGuess(userGuess) {
		// Processes a users guess
		this.letterObjects.map(ltr => {
			ltr.guess(userGuess);
		});
	}

	hasLetterBeenUsed(userGuess) {
		// Checks if the letter has already been used
		return this.lettersGuessed.includes(userGuess);
	}

	hasNameBeenGuessed() {
		// Checks if the name has been correctly guessed
		let totalCorrect = 0;

		this.letterObjects.map(ltr => {
			if (ltr.hasBeenGuessed === true) {
				totalCorrect++;
			}
		});

		return totalCorrect === this.letterObjects.length;
	}
}

module.exports = {
	CharacterName,
	getCharacterName
};
