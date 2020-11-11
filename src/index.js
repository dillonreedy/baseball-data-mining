const axios = require('axios');
const cheerio = require('cheerio');
const fileHandler = require('./fileHandler.js');

const getPitchingTable = async () => {
	try {
		const response = await axios.get('https://www.baseball-reference.com/boxes/MIL/MIL201909020.shtml');
        
        fileHandler.clearFolder();

        const $ = cheerio.load(response.data);

        // Getting the pitching data out of the commented out HTML, by seeing that it includes the "ERA" column name.
        // There is probably a better way to be doing this, but for now this will do.
        const pitchingDataHTMLString = $('*').contents().map((i, el) => {
            if (el.type === 'comment' && el.data.includes('ERA')) return el.data;
        }).get(0);
        
        const $pitchingData = cheerio.load(pitchingDataHTMLString);
        
        const tables = $pitchingData('.overthrow.table_container').get();

        tables.forEach(table => {
            let $curTable = cheerio.load($pitchingData(table).html());

            let rows = $curTable('tbody > tr').get();

            let resultData = [];

            rows.forEach(row => {
                let rowResult = {};
                row.children.forEach(childNode => {
                    rowResult[childNode.attribs['data-stat']] = (childNode.name === 'th') 
                                                              ? childNode.attribs['data-append-csv'] 
                                                              : $curTable(childNode).text().trim()
                });
                resultData.push(rowResult);
            });

            fileHandler.writeToFile(JSON.stringify(resultData), undefined, 'json');
        })

	} catch (error) { 
		throw error;
	}
};

getPitchingTable().then(() => {
    //console.log('All done.');
});