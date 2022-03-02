const https = require('https');
const fs = require('fs');
const fsAsync = require('fs').promises;
const path = require('path');

const file = fs.createWriteStream('test.jpg');

const projectPath = process.cwd();

const sourcePath = path.join(projectPath, 'src/lib/data/types.json');

const storageFolderPath = path.join(projectPath, 'src/lib/images');

// console.log(testeObject);

const download = (url, filePath) => {
	const file = fs.createWriteStream(filePath);
	const request = https.get(url, (response) => {
		response.pipe(file);
	});
};

const main = async () => {
	console.log('async function');
	let filePath = path.join(process.cwd(), 'src/lib/data/heroList.json');
	let sourceData = await fsAsync.readFile(sourcePath, 'utf-8');

	let sourceJson = JSON.parse(sourceData);

	for (let index = 0; index < sourceJson.length; index++) {
		console.log(sourceJson[index]);
		const image = sourceJson[index].image;
		const imageName = image.split('/').slice(-1)[0];
		const imageSavePath = path.join(storageFolderPath, imageName);
		// const imageSaveFile = fs.createWriteStream(imageSavePath);
		// const request = https.get(image, (response) => {
		// 	response.pipe(imageSaveFile);
		// });
		download(image, imageSavePath);
		// console.log(response);

		// await new Promise((resolve, reject) => {
		// 	response.pipe(imageSaveFile);
		// 	imageSaveFile.on('close', resolve);
		// 	imageSaveFile.on('error', console.error);
		// });
	}
};

main();
