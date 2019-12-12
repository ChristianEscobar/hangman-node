const AWS = require('aws-sdk');

const bucket = 'hangman-node-store';
const key = 'game-data.json';
AWS.config.update({
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	region: process.env.AWS_REGION
});

const getGameData = async () => {
	try {
		const params = {
			Bucket: bucket,
			Key: key
		};
		const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
		const s3response = await s3.getObject(params).promise();
		console.log(s3response);
		// return JSON.parse(s3response.Body.toString()));
	} catch (error) {
		if (error.code === 'NoSuchKey') {
			return null;
		}
		throw new Error(`Error extracting game data | ${error}`);
	}
};

module.exports = { getGameData };
