import React, { useEffect, useState } from 'react';

const FileList = () => {
    const [files, setFiles] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('/api/files');
                if (!response.ok) {
                    throw new Error(`Error fetching files: ${response.statusText}`);
                }

                const data = await response.json();
                setFiles(data.files || []);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false); 
            }
        };

        fetchFiles();
    }, []);

    if (loading) return <p>Loading files...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Uploaded Files</h2>
            <ul>
                {files.map((file, index) => (
                    <li key={index}>{file}</li>
                ))}
            </ul>
        </div>
    );
};

export default FileList;
