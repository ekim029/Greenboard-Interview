const axios = require('axios');
const { getContent } = require('./parseService.js');
const { saveHTML, saveAsset } = require('./storeService.js');

const seen = new Set();

async function recursiveFetch(url, storePath, root) {
    if (seen.has(url)) { // if already seen, skip to avoid infinite loop in recursion
        return;
    }
    seen.add(url);

    try {
        // fetch HTML with GET request to input url 
        const res = await axios.get(url);
        const data = res.data;

        await saveHTML(data, url, storePath); // save html page

        const { pageLinks, assetsLinks } = getContent(data, url, root); // get internal links and assets

        for (const link of assetsLinks) {
            try {
                await saveAsset(link, storePath); // save all assets
            } catch (err) {
                console.log(err.message);
            }
        }

        for (const link of pageLinks) {
            await recursiveFetch(link, storePath, root); // recursively visit links
        }

    } catch (err) {
        console.log(err.message);
    }
}

module.exports = { recursiveFetch };