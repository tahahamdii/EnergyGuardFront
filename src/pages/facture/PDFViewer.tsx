import React, { useState, useEffect } from 'react';
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import fileService from "../../Services/fileService";

function PDFViewer({ fileId }) {
    const [fileUrl, setFileUrl] = useState<string | null>(null);
    const [filename, setFilename] = useState<string | null>(null); 

    useEffect(() => {
        const fetchFileContent = async () => {
            try {
                const fetchedFile = await fileService.getFileById(fileId);
                console.log(fetchedFile);
                setFilename(fetchedFile.name);
                
                const byteArray = new Uint8Array(fetchedFile.content.data);
                const blob = new Blob([byteArray], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);

                setFileUrl(url);
            } catch (error) {
                console.error('Error fetching file content:', error);
            }
        };

        fetchFileContent();
    }, [fileId]);

    const newPlugin = defaultLayoutPlugin();

    return (
        <div className='container'>
            <h6 className="card-subtitle mb-2 text">File Name: {filename}</h6>
            <div className='pdf-container'>
                {fileUrl ? (
                    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                        <Viewer fileUrl={fileUrl} plugins={[newPlugin]} />
                    </Worker>
                ) : (
                    <>No PDF</>
                )}
            </div>
        </div>
    );
}

export default PDFViewer;
