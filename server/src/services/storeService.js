const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { URL } = require('url');
const cheerio = require('cheerio');

async function saveHTML(data, url, storePath) {
    const newUrl = new URL(url);
    const newPath = path.join(storePath, newUrl.hostname); // store html under path: original path + hostname
    fs.mkdirSync(newPath, { recursive: true });

    const $ = cheerio.load(data);

    $('[src], [href]').each((index, element) => {
        // Determine which attribute to update: 'src' or 'href'
        const attrib = $(element).attr('src') ? 'src' : 'href';
        let link = $(element).attr(attrib);
        if (!link) return;

        try {
            const absUrl = new URL(link, url);
            if (absUrl.hostname === newUrl.hostname) {
                // Construct new relative path to the saved asset in snapshots folder
                const relativePath = path.posix.join(
                    '/snapshots',
                    newUrl.hostname,
                    path.basename(storePath),
                    absUrl.hostname,
                    absUrl.pathname
                );
                $(element).attr(attrib, relativePath); // Replace the element's src/href attribute with the new relative path
            }
        } catch (err) {
            console.log(err.message);
        }
    });

    let cleanedFile = newUrl.pathname.replace(/[\/:\\?%*|"<>]/g, '_'); // clean unwanted symbols like * or |
    if (!cleanedFile || cleanedFile == "_") {
        cleanedFile = 'default';
    }
    const fileName = cleanedFile + '.html';
    const filePath = path.join(newPath, fileName); // final full path cleaned and updated
    fs.writeFileSync(filePath, $.html(), 'utf-8');
}

async function saveAsset(link, storePath) {
    const res = await axios.get(link, {
        responseType: 'arraybuffer'
    });
    const data = res.data; // binary buffer not string for various data types

    const newUrl = new URL(link);
    const newPath = path.join(storePath, newUrl.hostname, newUrl.pathname);
    // Build the full path where the asset will be saved: original path + hostname + pathname
    const assetPath = path.dirname(newPath); // directory path except filename

    fs.mkdirSync(assetPath, { recursive: true });
    fs.writeFileSync(newPath, data);
}

module.exports = { saveHTML, saveAsset };