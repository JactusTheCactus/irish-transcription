const fs = require('fs').promises;
const path = require('path');
async function readJSON(filePath) {
	try {
		const fullPath = path.resolve(filePath);
		const data = await fs.readFile(fullPath, 'utf-8');
		return JSON.parse(data);
	} catch (err) {
		console.error('Error reading JSON file:', err);
		throw err;
	}
};
async function writeToFile(filePath, type, content) {
	try {
		const fullPath = path.resolve(filePath);
		switch (type) {
			case "overwrite": await fs.writeFile(fullPath, content, 'utf-8');
			case "append": await fs.appendFile(fullPath, content, 'utf-8');
		}
		console.log(`Successfully wrote to ${fullPath}`);
	} catch (err) {
		console.error('Error writing to file:', err);
		throw err;
	}
};
(async () => {
	const C = await readJSON("data/c.json")
	console.table(C);
	const V = await readJSON("data/v.json")
	console.table(V);
})();