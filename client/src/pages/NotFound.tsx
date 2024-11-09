import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruckMoving, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate('/dashboard');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <div className="text-center">
                <FontAwesomeIcon icon={faTruckMoving} className="text-6xl text-blue-500 mb-4" />
                <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
                <p className="text-lg mb-6">Oops! The page you are looking for does not exist.</p>
                <button
                    onClick={handleGoBack}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
                    Go Back to Home
                </button>
            </div>
        </div>
    );
};

export default NotFound;