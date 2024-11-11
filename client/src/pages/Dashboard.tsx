import {useState} from 'react';
import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement);

const Dashboard = () => {
    const navigate = useNavigate();
    const [fromDate, setFromDate] = useState(new Date());
    const [toDate, setToDate] = useState(new Date());

    const handleNotificationClick = () => {
        navigate('/alerts');
    };

    const handleDetailClick = (path: string) => {
        navigate(path);
    };

    const barData = {
        labels: ['Truck', 'Pickup Truck', 'Mini Truck', 'Van', 'Tanker'],
        datasets: [
            {
                label: 'Number of Vehicles',
                data: [12, 19, 3, 5, 2],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const weightData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Total Trips',
                data: [500, 450, 365, 750, 725, 630, 680],
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    const lineData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Total Trips',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
            },
        ],
    };

    return (
        <div className="p-8 bg-gray-900 text-white">
            <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
                    <div>
                        <label className="block text-gray-400 mb-2" htmlFor="fromDate">From Date</label>
                        <input
                            type="date"
                            id="fromDate"
                            className="w-40 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={fromDate.toISOString().split('T')[0]}
                            onChange={(e) => setFromDate(new Date(e.target.value))} 
                         />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2" htmlFor="toDate">To Date</label>
                        <input
                            type="date"
                            id="toDate"
                            className="w-40 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={toDate.toISOString().split('T')[0]}
                            onChange={(e) => setToDate(new Date(e.target.value))} 
                         />
                    </div>
                </div>
                <button onClick={handleNotificationClick} className="text-white text-2xl">
                    <FontAwesomeIcon icon={faBell} />
                </button>
            </div>
            <h2 className="text-2xl font-bold mb-2">Financial Overview</h2>
            <button onClick={() => handleDetailClick('/financial-details')} className="text-blue-500 hover:underline mb-4">Detailed Info</button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2">Total Amount</h2>
                    <p className="text-2xl">$100,000</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2">Amount Received</h2>
                    <p className="text-2xl">$75,000</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2">Amount to be Received</h2>
                    <p className="text-2xl">$25,000</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2">Amount to be Paid</h2>
                    <p className="text-2xl">$10,000</p>
                </div>
            </div>
            <h2 className="text-2xl font-bold mb-2">Operational Overview</h2>
                <button onClick={() => handleDetailClick('/operational-details')} className="text-blue-500 hover:underline mb-4">Detailed Info</button>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2">Total Weight in Tons</h2>
                    <p className="text-2xl">4570 Tons</p>
                    <Line data={weightData} />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2">Total Number of Vehicles</h2>
                    <p className="text-2xl">41 Fleet</p>
                    <Bar data={barData} />
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2">Total Trips</h2>
                    <p className="text-2xl">425 Trips</p>
                    <Line data={lineData} />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2">Total Distance Covered</h2>
                    <p className="text-2xl">10,000 km</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2">Fuel Consumption</h2>
                    <p className="text-2xl">5,000/4800 Liters</p>
                </div>
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <h2 className="text-xl font-bold mb-2">Maintenance Costs</h2>
                    <p className="text-2xl">$2,000</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;