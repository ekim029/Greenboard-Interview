const { recursiveFetch } = require('../services/fetchService');
const path = require('path');

async function submit(req, res) {
    const { url } = req.body;

    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Invalid URL' });
    }

    try {
        // create timestamp as string, replacing : and . with - for file name safety
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const domain = new URL(url).hostname;
        const storePath = path.join(__dirname, '../../snapshots', domain, timestamp);
        // Define the base directory where the archive will be stored

        await recursiveFetch(url, storePath, new URL(url).origin);
        // recrusive fetch input url's origin to find links with the same root

        res.status(200).json({
            snapshotPath: `/snapshots/${domain}/${timestamp}`,
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: 'Failed to capture site' });
    }
}


module.exports = submit;