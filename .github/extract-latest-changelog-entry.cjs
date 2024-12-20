const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const extractLatestChangelogEntry = () => {
	const contents = readFileSync(join(__dirname, '..', 'CHANGELOG.md'), { encoding: 'utf8' });
	return contents.match(/## .*?\n(.*?)## [\d[]/s)[1].trim();
};

module.exports = extractLatestChangelogEntry;
