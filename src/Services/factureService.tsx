// @ts-ignore
import axios from 'axios';
import baseUrl from "../enviroment/enviroment"

const addFacture = async (formData:any) => {
  try {
    const response = await axios.post(`${baseUrl.baseUrl}/facture/addFacture`, formData);
    if (response.status === 201) {
      console.log('Form data successfully submitted to the server');
      return { success: true };
    } else {
      console.error('Failed to submit form data to the server');
      return { success: false, message: 'Failed to submit form data to the server' };
    }
  } catch (error) {
    console.error('Error occurred while submitting form data:', error);
    return { success: false, message: error.message };
  }
};


const getFactureById = async (factureId: string): Promise<{ success: boolean; data?: any; message?: string }> => {
    try {
      const response = await axios.get(`${baseUrl.baseUrl}/facture/getFactureByID/${factureId}`);
      if (response.status === 200) {
        console.log('Facture data retrieved successfully');
        console.log(response.data)

        return { success: true, data: response.data };
      } else {
        console.error('Failed to retrieve facture data');
        return { success: false, message: 'Failed to retrieve facture data' };
      }
    } catch (error) {
      console.error('Error occurred while retrieving facture data:', error);
      return { success: false, message: error.message };
    }
  };
  


  const editFacture = async (factureId: string, updatedFactureData: any): Promise<{ success: boolean, message: string }> => {
    try {
      const response = await axios.put(`${baseUrl.baseUrl}/facture/updateFacture/${factureId}`, updatedFactureData);
      if (response.status === 200) {
        console.log('Facture data updated successfully');
        return { success: true, message: 'Facture data updated successfully' };
      } else {
        console.error('Failed to update facture data');
        return { success: false, message: 'Failed to update facture data' };
      }
    } catch (error) {
      console.error('Error occurred while updating facture data:', error);
      return { success: false, message: error.message };
    }
  };
  


  

export { addFacture ,getFactureById, editFacture};
