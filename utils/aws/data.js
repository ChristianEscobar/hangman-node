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
		return s3response.Body;
	} catch (error) {
		if (error.code === 'NoSuchKey') {
			return null;
		}
		throw new Error(`Error extracting game data | ${error}`);
	}
};

const writeGameData = async dataObj => {
	const params = {
		Bucket: bucket,
		Key: key,
		Body: JSON.stringify(dataObj)
	};

	try {
		const s3 = new AWS.S3({ apiVersion: '2006-03-01' });
		const s3response = await s3.putObject(params).promise();
		return s3response;
	} catch (error) {
		throw new Error(`Error writing game data | ${error}`);
	}
};

module.exports = { getGameData, writeGameData };
