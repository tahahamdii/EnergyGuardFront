import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import fileService from "../../Services/fileService";
import { getFactureById } from '../../Services/factureService';
import PDFViewer from './PDFViewer';

const FileInput = () => {
    const { facture_id } = useParams();
    const [facture, setFacture] = useState(null);
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedFacture = await getFactureById(facture_id);
                setFacture(fetchedFacture.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [facture_id]);

    const handleFileChange = async (event) => {
        const uploadedFile = event.target.files && event.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
        }
    };

    const handleSubmit = async () => {
        if (file) {
            try {
                setLoading(true);
                await fileService.uploadFile(file, facture_id);
                const fetchedFile = await fileService.getFilesByFactureId(facture_id);
                console.log("File uploaded successfully:", fetchedFile);
                setFacture({ ...facture, fichier: fetchedFile.fileName }); // Update the facture object to trigger re-render
                setLoading(false);
            } catch (error) {
                console.error('Error uploading file:', error);
                setLoading(false);
            }
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="File related to facture" />
            <div className="container mt-3">
                {loading ? (
                    <div className="text-center">
                        <div className="spinner-border text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title text-xl font-normal text-gray-900 dark:text-white">Upload File</h5>
                            <input type="file" className="form-control-file" onChange={handleFileChange} />
                            <button className="btn btn-primary mt-3" onClick={handleSubmit} disabled={!file}>Upload File</button>
                            {facture && facture.fichier && (
                                <div className="mt-3">
                                    <PDFViewer key={facture.fichier} fileId={facture.fichier} />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </DefaultLayout>
    );
};

export default FileInput;
