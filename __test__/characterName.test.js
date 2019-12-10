const { CharacterName, getCharacterName } = require('../characterName');

describe('characterName.js', () => {
	it('instantiates a new instance', () => {
		const character = new CharacterName('Mario');
		expect(character).not.toBe(null);
	});

	it('returns false when letter has not been used', () => {
		const character = new CharacterName('Mario');
		const ltrHasBeenUsed = character.hasLetterBeenUsed('n');
		expect(ltrHasBeenUsed).toBeFalsy();
	});

	it('returns true when letter has been used', () => {
		const character = new CharacterName('Mario');
		character.takeGuess('n');
		character.letterGuessed = 'n';
		const ltrHasBeenUsed = character.hasLetterBeenUsed('n');
		expect(ltrHasBeenUsed).toBeTruthy();
	});

	it('correctly displays guess progress', () => {
		const character = new CharacterName('Mario');
		let progress = character.displayGuessProgress();
		expect(progress).toEqual('_ _ _ _ _');
	});

	it('returns false if name has not been guessed', () => {
		const character = new CharacterName('Mario');
		const nameGuessed = character.hasNameBeenGuessed();
		expect(nameGuessed).toBeFalsy();
	});

	it('returns true if name has been guessed', () => {
		const character = new CharacterName('Mario');
		character.takeGuess('M');
		character.takeGuess('a');
		character.takeGuess('r');
		character.takeGuess('i');
		character.takeGuess('o');
		const nameGuessed = character.hasNameBeenGuessed();
		expect(nameGuessed).toBeTruthy();
	});

	it('returns a character name', () => {
		const name = getCharacterName();
		expect(name.length).toBeGreaterThan(0);
	});
});
