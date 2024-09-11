import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../Bilan/pickerstyle.css"
import baseUrl from "../../enviroment/enviroment";

const Solar = () => {
  const [data, setData] = useState([]);
  const [puissanceMax, setPuissanceMax] = useState('');
  const [predictedPuissance, setPredictedPuissance] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const fetchData = async () => {
    try {
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];   
    console.log(formattedStartDate);
    console.log(formattedEndDate)
    const apiurl = `${baseUrl.baseUrl}/solorData/addSolarData/${formattedStartDate}/${formattedEndDate}`;
      const response = await fetch(apiurl, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const responseData = await response.json();
      setData(responseData.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]); 

  const generateSeriesData = () => {
    const seriesData = data.map((item) => {
      const formattedDate = new Date(item.date);
      return {
        name: formattedDate,
        y: item.electricity,
      };
    });
    return seriesData;
  };

  const handlePrediction = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${baseUrl.baseUrl}/predictSeuil`, {
        params: {
          puissance: puissanceMax,
        },
      });
      setPredictedPuissance(response.data.predicted_Puissance);
    } catch (error) {
      console.error('Error while predicting:', error);
    }
  };

  const handleInputChange = (e) => {
    setPuissanceMax(e.target.value);
  };

  const options = {
    chart: {
      type: 'column',
    },
    title: {
      align: 'left',
      text: 'Solar Photovoltaic Power',
    },
    xAxis: {
      type: 'category',
    },
    yAxis: {
      title: {
        text: 'Electricity (kWh)',
      },
      min: 0,
    },
    series: [
      {
        name: 'Electricity',
        colorByPoint: true,
        data: generateSeriesData(),
      },
    ],
  };

  const handleFetchData = () => {
    fetchData();
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Solar photovoltaic power" />
      <div className="d-flex justify-content-between">
        <div className='divDate'>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)}  className="custom-datepicker1" />
          <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} className="custom-datepicker2"  />

        </div>
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />

      <Form onSubmit={handlePrediction}>
        <Form.Label>Puissance Max:</Form.Label>
        <Form.Control placeholder="Enter power" value={puissanceMax} onChange={handleInputChange} />
        <Button type="submit" className="mt-4">
          Predict Seuil
        </Button>
        {predictedPuissance !== null && <p>Predicted Seuil: {predictedPuissance}</p>}
      </Form>
    </DefaultLayout>
  );
};

export default Solar;
