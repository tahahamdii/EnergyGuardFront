import React, { useState, useEffect } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchPrediction, fetchAllPredictions ,fetchCarbonEmissions} from '../../Services/predictionService';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import '../../css/predictionConso.css'; 
import debounce from 'lodash/debounce';
import { Margin } from '@mui/icons-material';

const PredictionPage = () => {
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const [predictionResult, setPredictionResult] = useState(null);
    const [allPredictions, setAllPredictions] = useState([]);
    const [weather, setWeather] = useState<WeatherInfo>({});  
    const [cityInput, setCityInput] = useState('Tunisia');
    const [carbonEmissionsData, setCarbonEmissionsData] = useState({
        carbon_g: 0,
        carbon_kg: 0,
        carbon_lb: 0,
        carbon_mt: 0
    });

    const API_KEY = "a95a3cb6f34d3039652de2a52b4bcefd"; 
    const location = "Tunisia"; 

    const fetchWeatherData = (inputLocation) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputLocation}&appid=${API_KEY}&units=metric`;
        axios.get(url).then(response => {
            const { name, main, weather } = response.data;
            setWeather({
                city: name,
                temperature: main.temp,
                description: weather[0].description,
                icon: weather[0].icon
            });
        }).catch(error => {
            console.error("Error fetching weather data:", error);
           
        });
    };
    
    useEffect(() => {
        const debouncedFetch = debounce(() => {
            fetchWeatherData(cityInput);
        }, 500);
    
        debouncedFetch();
        return () => debouncedFetch.cancel(); 
    }, [cityInput]); 
    
    const handleFetchPrediction = (year, month) => {
        fetchPrediction(year, month)
            .then(predictionData => {
                console.log(predictionData);
                setPredictionResult(predictionData);
                const predictedConsumption = predictionData.predictedConsumption;
    
                // Update allPredictions state to include the new prediction
                setAllPredictions(prevPredictions => [
                    ...prevPredictions,
                    { year, month, prediction: predictedConsumption }
                ]);
    
                fetchCarbonEmissions(predictedConsumption, 'us', 'fl')
                .then(emissionsResponse => {
                    if (emissionsResponse.success && emissionsResponse.emissionsData) {
                        console.log('Carbon Emissions Data:', emissionsResponse.emissionsData);
                        setCarbonEmissionsData(emissionsResponse.emissionsData);
                    } else {
                        console.log('No emissions data received');
                        setCarbonEmissionsData(null); // Clear previous data or indicate error
                    }
                })
                .catch(error => {
                    console.error('Failed to fetch carbon emissions:', error);
                    setCarbonEmissionsData(null); // Handle error by clearing or setting error state
                    alert('Failed to fetch carbon emissions. Please check console for details.');
                });
            })
            .catch(error => {
                console.error('Failed to fetch prediction:', error);
                alert('Failed to fetch prediction. Please check console for details.');
            });
    };
    

    useEffect(() => {
        fetchWeatherData(); 
        fetchAllPredictions().then(allData => {
            setAllPredictions(allData.predictions);
        }).catch(error => {
            console.error('Failed to fetch all predictions:', error);
        });
        console.log(fetchCarbonEmissions(1900000000,'us', 'fl'));  
    }, []);

    

    const chartOptions = {
        chart: {
            type: 'line',
            height: 350,
            toolbar: {
                show: true
            }
        },
        xaxis: {
            categories: allPredictions.map(pred => `${pred.year}-${pred.month}`),
            type: 'datetime',
            title: {
                text: 'Date'
            }
        },
        yaxis: {
            title: {
                text: 'Predicted Consumption'
            }
        },
        tooltip: {
            x: {
                format: 'MM-yyyy'
            }
        },
        stroke: {
            curve: 'smooth'
        }
    };

    const chartSeries = [{
        name: 'Predicted Consumption',
        data: allPredictions.map(pred => ({x: `${pred.year}-${pred.month}`, y: pred.prediction}))
    }];

    const handleSubmit = (event) => {
        event.preventDefault();
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        if (parseInt(year) < currentYear) {
            alert("The year must be this year or in the future.");
            return;
        }

        if (parseInt(year) === currentYear && parseInt(month) < currentMonth) {
            alert(`The month must be ${currentMonth} or later.`);
            return;
        }

        if (parseInt(month) < 1 || parseInt(month) > 12) {
            alert("The month must be between 1 and 12.");
            return;
        }
        console.log('Submitted:', { year, month });
        handleFetchPrediction(year, month);
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Consumption Prediction" />
            <div className="container mt-3">
                <div className="row">
                <div className="row">
                <div className="col-md-8">
    <div className="card">
        <div className="container">
            <h4><b>Carbon Emission Estimation</b></h4>
            {carbonEmissionsData ? (
                <div>
                    <p className="text-data">Carbon Emissions Data:</p>
                    <p className="number-data">Carbon (g): {Number(carbonEmissionsData.carbon_g).toLocaleString()} g</p>
                    <p className="number-data">Carbon (kg): {Number(carbonEmissionsData.carbon_kg).toLocaleString()} kg</p>
                    <p className="number-data">Carbon (lb): {Number(carbonEmissionsData.carbon_lb).toLocaleString()} lb</p>
                    <p className="number-data" style={{ marginBottom: '20px' }}>Carbon (mt): {Number(carbonEmissionsData.carbon_mt).toLocaleString()} mt</p>
                </div>
            ) : (
                <div className="alert alert-info">Loading carbon emissions data or not available.</div>
            )}
        </div>
    </div>
</div>

    <div className="col-md-4">
        <div className="card">
            <div className="card-body">
                <h2>Weather Information</h2>
                {weather.city ? (
                    <div>
                        <h3>Weather in {weather.city}</h3>
                        <p>{weather.temperature}°C, {weather.description}</p>
                        <img src={`https://openweathermap.org/img/w/${weather.icon}.png`} alt="Weather icon" />
                        <input
                            type="text"
                            className="form-control mt-2"
                            value={cityInput}
                            onChange={(e) => setCityInput(e.target.value)}
                            placeholder="Enter a city name"
                        />
                    </div>
                ) : (
                    <p>Loading weather...</p>
                )}
            </div> 
        </div>
    </div>
</div>
                    <div className="col-md-12">
                        <h1 className="mb-4">Predict Consumption</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="year" className="form-label">Year</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="year"
                                    style={{ height: '48px' }}
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="month" className="form-label">Month</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="month"
                                    style={{ height: '48px' }}
                                    value={month}
                                    onChange={(e) => setMonth(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Predict</button>
                        </form>
                        {predictionResult && (
                            <div className="alert alert-info mt-3">
                                Prediction Result: {predictionResult.predictedConsumption}
                            </div>
                        )}
                        <div className="col-md-12 mt-5">
                            <h2>Prediction Results</h2>
                            {allPredictions.length > 0 && (
                                <ReactApexChart 
                                    options={chartOptions} 
                                    series={chartSeries} 
                                    type="line" 
                                    height={350} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default PredictionPage;
