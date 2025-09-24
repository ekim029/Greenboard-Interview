import NewArchive from './components/newArchive';
import { useState } from 'react';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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

  return (
    <div className="App">
      <h1>Website Archiving</h1>
      <NewArchive onSubmit={handleSubmit} />

      {loading && <p>Archiving URL...</p>}
      {success && <p>Successfully Archived</p>}
      {error && <p>{error}</p>}
    </div>
  );
}

export default App;
