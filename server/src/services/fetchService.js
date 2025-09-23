const axios = require('axios');

const seen = new Set();

async function recursiveFetch(url, path, root) {
    if (seen.has(url)) { // if already seen, skip to avoid infinite loop in recursion
        return;
    }
    seen.add(url);

    try {
        // fetch HTML with GET request to input url 
        const res = await axios.get(url);
        const data = res.data;

        // todo: save data with another service 

        const { pageLinks, assetsLinks } = getContent(); // todo: get contents and links with another service 

        for (const link of assetsLinks) {
            try {
                // todo: save asset in another service
            } catch (err) {
                console.log(err.message);
            }
        }

        for (const link of pageLinks) {
            await recursiveFetch(link, path, root); // recursively visit links
        }

    } catch (err) {
        console.log(err.message);
    }
}

module.exports = { recursiveFetch };