import React, { useEffect, useState } from 'react';

const ArchivedSnapshots = ({ site }) => {
    const [snapshots, setSnapshots] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedTimestamp, setSelectedTimestamp] = useState('');

    // Fetch snapshot data when a site is selected
    useEffect(() => {
        if (!site) {
            return;
        }
        const fetchSnapshots = async () => {
            setLoading(true);
            setError(null);
            try {
                const normalizedSite = new URL(site).hostname;
                const res = await fetch(`http://localhost:3000/archived/${normalizedSite}`);
                // fetch cleaned data from backend
                if (!res.ok) {
                    throw new Error('Failed to fetch snapshots');
                }
                const data = await res.json();

                // If no data or invalid format
                setSnapshots(data.snapshots || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSnapshots();
    }, [site]);


    // Show users all snapshots, but if selectted a timestamp, only show that snapshot
    let filteredSnapshots = snapshots;
    if (selectedTimestamp) {
        filteredSnapshots = snapshots.filter(
            (snap) => snap.timestamp === selectedTimestamp
        );
    }

    return (
        <div>
            <h2>Archived Snapshots: {site}</h2>

            {loading && <p>Loading snapshots...</p>}
            {error && <p>Error: {error}</p>}

            {!loading && !error && snapshots.length === 0 && (
                <p>No snapshots found</p>
            )}

            {!loading && snapshots.length > 0 && (
                <div>
                    <label>
                        {/* Dropdown for filter snapshots by timestamp  */}
                        Filter by timestamp:{' '}
                        <select
                            value={selectedTimestamp}
                            onChange={(e) => setSelectedTimestamp(e.target.value)}
                        >
                            <option value="">All Snapshots</option>
                            {snapshots.map((snap) => (
                                <option key={snap.timestamp} value={snap.timestamp}>
                                    {snap.timestamp}
                                </option>
                            ))}
                        </select>
                    </label>

                    {/* Clear filter button appears only when timestamp is selected */}
                    {selectedTimestamp && (
                        <button onClick={() => setSelectedTimestamp('')}>
                            Clear Filter
                        </button>
                    )}

                    <ul>
                        {/* Display filtered snapshot list */}
                        {filteredSnapshots.map((snap) => (
                            <li key={snap.timestamp}>
                                <a
                                    href={snap.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSelectedTimestamp(snap.timestamp);
                                    }}
                                >
                                    {snap.timestamp}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Preview the first snapshot in the filtered list */}
                    {selectedTimestamp && (
                        <div>
                            <h3>Preview Snapshot</h3>
                            <iframe
                                src={
                                    filteredSnapshots[0].url.startsWith('/')
                                        ? `http://localhost:3000${filteredSnapshots[0].url}`
                                        : filteredSnapshots[0].url
                                    // If the snapshot URL is a relative path, add localhost origin.
                                    // Otherwise, use the full URL as is.
                                }

                                title={`Snapshot preview for ${selectedTimestamp}`}
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ArchivedSnapshots;
