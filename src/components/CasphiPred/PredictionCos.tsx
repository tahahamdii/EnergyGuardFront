import DefaultLayout from '../../layout/DefaultLayout';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import React, { useState } from 'react';
import { predictCosphi } from '../../Services/cosphiService';
import PredChart from '../../components/CasphiPred/PredChart';

interface Prediction {
    predictedCosphi: string;
    date: string;
    heure: string;
}

const PredictionCos = () => {
    const [date, setDate] = useState('');
    const [heure, setHeure] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [prediction, setPrediction] = useState<Prediction | null>(null);

    const handlePrediction = async () => {
        try {
            const result = await predictCosphi(selectedDate, selectedTime);
            setPrediction(result);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <DefaultLayout>
            <Breadcrumb pageName="Cosphi Prediction" />
            <div className="flex flex-col gap-10">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="max-w-full overflow-x-auto">
                        <div>
                            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#446D9A', marginBottom: '15px', marginTop: '15px' }}>Predicted Your Cosphi</h2>
                            <div className="flex flex-col items-center mb-6">
                                <div className="mb-6">
                                    <label htmlFor="date" className="mr-2 text-xl text-gray-600 block">Date: Choose a date for prediction</label>
                                    <input
                                        type="date"
                                        id="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="border border-gray-400 rounded px-3 py-2 text-lg w-[550px] mt-2"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="time" className="mr-2 text-xl text-gray-600 block">Time:  Choose a time for prediction</label>
                                    <input
                                        type="time"
                                        id="time"
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                        className="border border-gray-400 rounded px-3 py-2 text-lg w-[550px] mt-2"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <button onClick={handlePrediction} className="cursor-pointer rounded-lg border border-transparent bg-gradient-to-r from-teal-500 to-blue-500 font-bold py-2 px-4 mb-7 mt-2 text-white text-[16px] transition hover:bg-opacity-90 flex items-center justify-end">


                                    Get Prediction
                                </button>
                                {prediction && (
                                    <div className="mt-4 mb-14">
                                        <p className="text-xl" style={{ color: '#3F4FC4', fontWeight: 'bold' }}>Predicted Cosphi: {parseFloat(prediction.predictedCosphi).toFixed(3)}</p>

                                    </div>
                                )}
                            </div>
                            <PredChart />
                        </div>
                    </div>
                </div>

            </div>

        </DefaultLayout>
    );
};

export default PredictionCos;
