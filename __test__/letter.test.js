const Letter = require('../utils/game/letter');

describe('letter.js', () => {
	it('creates a new letter object', () => {
		const ltrObject = new Letter('c');
		expect(ltrObject).not.toBe(null);
	});

	it('displays underscore when not guessed', () => {
		const ltrObject = new Letter('c');
		const display = ltrObject.toString();
		expect(display).toBe('_');
	});

	it('displays letter when guessed', () => {
		const ltrObject = new Letter('c');
		ltrObject.guess('c');
		const display = ltrObject.toString();
		expect(display).toBe('c');
	});

	it('displays underscore after incorrect guess', () => {
		const ltrObject = new Letter('c');
		ltrObject.guess('_');
		const display = ltrObject.toString();
		expect(display).toBe('_');
	});

	it('continues to display correct letter', () => {
		const ltrObject = new Letter('c');
		ltrObject.guess('c');
		const display = ltrObject.toString();
		ltrObject.guess('a');
		ltrObject.guess('b');
		ltrObject.guess('d');
		expect(display).toBe('c');
	});
});
