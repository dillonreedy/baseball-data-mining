const axios = require('axios');
const cheerio = require('cheerio');
const fileHandler = require('./fileHandler.js');

const getPostTitles = async () => {
	try {
		const response = await axios.get('https://www.baseball-reference.com/boxes/MIL/MIL201909020.shtml');

        const $ = cheerio.load(response.data);

        $('*').contents().map((i, el) => {
            if (el.type === 'comment' && el.data.includes('ERA')) {
                fileHandler.writeToFile(el.data, `${Date.now().toString()}result.html`);
            }
        })

        let results = $('*').contents().map((i, el) => {
            if (el.type === 'comment' && el.data.includes('ERA')) return el.data;
        }).get()[0];

        
        console.log(results);

        //console.log(results);

	} catch (error) { 
		throw error;
	}
};

getPostTitles().then(() => {
    //console.log('All done.');
});