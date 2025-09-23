const cheerio = require('cheerio');
const { URL } = require('url');

function getContent(data, url, root) {
    const $ = cheerio.load(data); // load html data into cheerio to use selectors

    const pageLinks = new Set(); // all internal links
    const assetsLinks = new Set(); // all asset links

    // parse a tags with href 
    $('a[href]').each((index, element) => {
        const elem = $(element).attr('href'); // retrieve value of href attribute 
        if (!elem) {
            return;
        }

        try {
            const absolutePath = new URL(elem, url).href; // convert to absolute path from relative path

            if (absolutePath.startsWith(root)) { // we only care if the link is within our root url
                const cleanedAbsolutePath = absolutePath.split("#")[0];
                pageLinks.add(cleanedAbsolutePath);
            }
        } catch (err) {
            console.log(err.message);
        }
    });

    // collection of asset tags (css, js, images, videos, etc)
    $('link[rel="stylesheet"], script[src], img[src], video[src], audio[src], source[src]').each((index, element) => {
        const source = $(element).attr('href') || $(element).attr('src');
        // retrieve from either href or src attribute since we want all assets including images and css

        if (source) {
            try {
                const asset = new URL(source, url).href; // convert to absolute path from relative path
                assetsLinks.add(asset);
            } catch (err) {
                console.log(err.message);
            }
        }
    });

    // Return as arrays, not sets
    return {
        pageLinks: Array.from(pageLinks),
        assetsLinks: Array.from(assetsLinks)
    };
}

module.exports = { getContent };