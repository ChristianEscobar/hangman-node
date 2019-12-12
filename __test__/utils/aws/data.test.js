const AWS = require('aws-sdk-mock');
const { getGameData } = require('../../../utils/aws/data');

describe('data.js', () => {
	it('returns an object from S3', async () => {
		AWS.mock('S3', 'getObject', function(params, callback) {
			callback(null, { Body: { message: 'testing' } });
		});
		const gameData = await getGameData();
		expect(typeof gameData).toEqual('object');
	});
});
