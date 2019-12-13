const AWS = require('aws-sdk-mock');
const { getGameData, writeGameData } = require('../../../utils/aws/data');

describe('data.js', () => {
	it('returns an object from S3', async () => {
		AWS.mock('S3', 'getObject', function(params, callback) {
			callback(null, { Body: { message: 'testing' } });
		});
		const gameData = await getGameData();
		expect(gameData.message).toEqual('testing');

		AWS.restore('S3');
	});

	it('writes an object to S3', async () => {
		AWS.mock('S3', 'putObject', function(params, callback) {
			callback(null, { success: true });
		});
		const result = await writeGameData({ message: 'dummy' });
		expect(result.success).toBeTruthy();

		AWS.restore('S3');
	});
});
