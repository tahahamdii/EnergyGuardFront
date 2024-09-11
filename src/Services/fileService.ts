// @ts-ignore
import axios from 'axios';
import baseUrlS from '../enviroment/enviroment';

const baseURL = 'http://localhost:5000/files'; 

const fileService = {
    uploadFile: async (file, factureId) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('factureId', factureId);

            const response = await axios.post(`${baseURL}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            throw new Error(`Error uploading PDF file: ${error.message}`);
        }
    },

    getFileById: async (fileId) => {
        try {
            const response = await axios.get(`${baseURL}/${fileId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching file: ${error.message}`);
        }
    },

    getFilesByFactureId: async (factureId) => {
        try {
            const response = await axios.get(`${baseURL}/facture/${factureId}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching files for Facture ID: ${error.message}`);
        }
    },

    getAllFiles: async () => {
        try {
            const response = await axios.get(`${baseURL}`);
            return response.data;
        } catch (error) {
            throw new Error(`Error fetching all files: ${error.message}`);
        }
    }
};

export default fileService;
