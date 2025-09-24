import NewArchive from './components/newArchive';
import ArchivedSnapshots from './components/archivedSnapshots';
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [siteInput, setSiteInput] = useState('');
  const [selectedSite, setSelectedSite] = useState('');

  // Sends the URL to be archived to the backend server
  const handleSubmit = async (url) => {
    setLoading(true);
    setSuccess(false);
    setError(null);

    try {
      const res = await fetch('http://localhost:3000/submit', {
        method: "POST",
        body: JSON.stringify({ url }),
        headers: { 'Content-Type': 'application/json' }
      });

      if (!res.ok) {
        throw new Error('');
      }
      setSuccess(true);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSiteSearch = () => {
    setSelectedSite(siteInput.trim());
  };

  return (
    <div className="App">
      <h1>Website Archiving</h1>
      <NewArchive onSubmit={handleSubmit} />

      {loading && <p>Archiving URL...</p>}
      {success && <p>Successfully Archived</p>}
      {error && <p>{error}</p>}

      {/* Input and button to search/view archived snapshots */}
      {!selectedSite && (
        <div>
          <input
            type="text"
            placeholder="Enter site to view snapshots"
            value={siteInput}
            onChange={(e) => setSiteInput(e.target.value)}
          />
          <button onClick={handleSiteSearch}>View Snapshots</button>
        </div>
      )}

      {/* Show back to search button and snapshots only if site is selected */}
      {selectedSite && (
        <>
          <button onClick={() => {
            setSelectedSite('');
            setSiteInput('');
          }}>
            Back to Search
          </button>

          <ArchivedSnapshots site={selectedSite} />
        </>
      )}
    </div>
  );
}

export default App;
