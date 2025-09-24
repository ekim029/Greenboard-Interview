import { useState } from 'react';

function NewArchive({ onSubmit }) {
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const cleaned = url.trim();
        if (!cleaned) {
            return;
        }

        onSubmit(cleaned);
        setUrl('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder='Input URL'
                required
            />

            <button type='submit'>
                Archive
            </button>
        </form>
    )
}

export default NewArchive