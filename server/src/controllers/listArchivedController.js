const path = require('path');
const fs = require('fs');

async function listArchived(req, res) {
    const { site } = req.params;

    try {
        const siteDir = path.join(__dirname, '../../snapshots', site);
        // Full path to site in snapshots folder

        if (!fs.existsSync(siteDir)) {
            return res.status(404).json({ error: 'No archives found for this site.' });
        }

        // for each file in siteDir directory, join parent and current file path
        // and return timestamp array  (different post requests)
        const timestamps = fs.readdirSync(siteDir).filter(file =>
            fs.statSync(path.join(siteDir, file)).isDirectory()
        );

        const snapshots = timestamps.map(timestamp => ({
            timestamp,
            url: `/snapshots/${site}/${timestamp}/${site}/default.html`,
            // The URL for the main page of each snapshot
        }));

        res.status(200).json({ site, snapshots });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to list snapshots' });
    }
}

module.exports = listArchived;