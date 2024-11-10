import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import fetchUsers from '../services/manageUsers.api';
import { useNavigate } from 'react-router-dom';
import deleteUser  from '../services/deleteUser.api';

const ManageVehicle = () => {
    interface Vehicle {
        vehicleNumber: string;
        vehicleType: string;
        vehicleModel: string;
        vehicleMake: string;
        vehicleYear: number;
        vehicleCapacity: number;
        vehicleFuelType: string;
        vehicleInsuranceExpiry: Date;
        vehiclePermitExpiry: Date;
        vehicleFitnessExpiry: Date;
        vehiclePUCExpiry: Date;
        vehicleRegistration: Date;
        vehicleTDS: boolean;
        vehicleCurrentStatus: string;
        vehicleOwner: string;
        vehicleOwnerContact: string;
        vehicleOwnerEmail: string;
        vehicleOwnerAddress: string;
        vehicleOwnerPAN: string;
        vehicleOwnerAadhar: string;
    }

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
    const [visibleFields, setVisibleFields] = useState<string[]>([
        'vehicleNumber',
        'vehicleType',
        'vehicleYear',
        'vehicleCapacity',
        'vehicleFuelType',
        'vehicleOwner',
        'vehicleInsuranceExpiry',
        'vehicleTDS',
        'vehicleOwnerPAN',
        'vehicleCurrentStatus'
    ]);
    const createdBy = useSelector((state: RootState) => state.auth.id) || '';

    useEffect(() => {
        loadVehicles();
    }, []);

    const loadVehicles = async () => {
        try {
            const response = await fetchUsers(createdBy);
            setVehicles(response);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    const handleDelete = async (userEmail: string) => {
        const confirmed = window.confirm('Are you sure you want to delete ' + userEmail + '?');
        if (confirmed) {
            await deleteUser(userEmail);
            setVehicles(vehicles.filter(vehicles => vehicles.vehicleNumber !== userEmail));
        }
        };

    const handleFieldToggle = (field: string) => {
        setVisibleFields(prevFields =>
            prevFields.includes(field)
                ? prevFields.filter(f => f !== field)
                : [...prevFields, field]
        );
    };

    const handleSort = (key: keyof Vehicle) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        sortArray(key, direction);
    };

    const sortArray = (key: keyof Vehicle, direction: string) => {
        const sortedUsers = [...vehicles].sort((a, b) => {
            if (a[key] !== undefined && b[key] !== undefined) {
                if (a[key] < b[key]) {
                    return direction === 'ascending' ? -1 : 1;
                }
                if (a[key] > b[key]) {
                    return direction === 'ascending' ? 1 : -1;
                }
            }
            return 0;
        });
        setVehicles(sortedUsers);
    };

    const fields = [
        { label: 'Number', value: 'vehicleNumber' },
        { label: 'Type', value: 'vehicleType' },
        { label: 'Model', value: 'vehicleModel' },
        { label: 'Make', value: 'vehicleMake' },
        { label: 'Year', value: 'vehicleYear' },
        { label: 'Capacity', value: 'vehicleCapacity' },
        { label: 'Fuel Type', value: 'vehicleFuelType' },
        { label: 'Insurance Expiry', value: 'vehicleInsuranceExpiry' },
        { label: 'Permit Expiry', value: 'vehiclePermitExpiry' },
        { label: 'Fitness Expiry', value: 'vehicleFitnessExpiry' },
        { label: 'PUC Expiry', value: 'vehiclePUCExpiry' },
        { label: 'Registration', value: 'vehicleRegistration' },
        { label: 'TDS', value: 'vehicleTDS' },
        { label: 'Owner Name', value: 'vehicleOwner' },
        { label: 'Owner Contact', value: 'vehicleOwnerContact' },
        { label: 'Owner Email', value: 'vehicleOwnerEmail' },
        { label: 'Owner Address', value: 'vehicleOwnerAddress' },
        { label: 'Owner PAN', value: 'vehicleOwnerPAN' },
        { label: 'Owner Aadhar', value: 'vehicleOwnerAadhar' },
        { label: 'Current Status', value: 'vehicleCurrentStatus' }
    ];

    return (
        <div className=" bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Manage Vehicles</h1>
            <button
                    onClick={() => navigate('/add-vehicle')}
                    className={`bg-blue-500 text-white p-2 mb-4 rounded hover:bg-blue-600 transition duration-200 `}
                >
                    Add New Vehicle
                </button>
            <div className="mb-4">
                <h2 className="text-xl font-bold mb-2">Select Fields to Display</h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {fields.map(field => (
                        <label key={field.value} className="flex items-center">
                            <input
                                type="checkbox"
                                checked={visibleFields.includes(field.value)}
                                onChange={() => handleFieldToggle(field.value)}
                                className="mr-2"
                            />
                            {field.label}
                        </label>
                    ))}
                </div>
                
            </div>
            <table className="w-full bg-gray-800 rounded-lg shadow-lg">
                <thead>
                    <tr className="bg-gray-700">
                    {visibleFields.includes('vehicleNumber') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleNumber')}>
                                Number {sortConfig?.key === 'vehicleNumber' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehicleType') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleType')}>
                                Type {sortConfig?.key === 'vehicleType' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehicleModel') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleModel')}>
                                Model {sortConfig?.key === 'vehicleModel' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehicleMake') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleMake')}>
                                Make {sortConfig?.key === 'vehicleMake' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehicleYear') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleYear')}>
                                Year {sortConfig?.key === 'vehicleYear' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehicleCapacity') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleCapacity')}>
                                Capacity {sortConfig?.key === 'vehicleCapacity' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehicleFuelType') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleFuelType')}>
                                Fuel Type {sortConfig?.key === 'vehicleFuelType' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehicleInsuranceExpiry') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleInsuranceExpiry')}>
                                Insurance Expiry {sortConfig?.key === 'vehicleInsuranceExpiry' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehiclePermitExpiry') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehiclePermitExpiry')}>
                                Permit Expiry {sortConfig?.key === 'vehiclePermitExpiry' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehicleFitnessExpiry') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleFitnessExpiry')}>
                                Fitness Expiry {sortConfig?.key === 'vehicleFitnessExpiry' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehiclePUCExpiry') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehiclePUCExpiry')}>
                                PUC Expiry {sortConfig?.key === 'vehiclePUCExpiry' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehicleRegistration') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleRegistration')}>
                                Registration {sortConfig?.key === 'vehicleRegistration' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehicleTDS') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleTDS')}>
                                TDS {sortConfig?.key === 'vehicleTDS' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehicleOwner') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleOwner')}>
                                Owner Name {sortConfig?.key === 'vehicleOwner' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehicleOwnerContact') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleOwnerContact')}>
                                Owner Contact {sortConfig?.key === 'vehicleOwnerContact' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehicleOwnerEmail') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleOwnerEmail')}>
                                Owner Email {sortConfig?.key === 'vehicleOwnerEmail' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehicleOwnerAddress') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleOwnerAddress')}>
                                Owner Address {sortConfig?.key === 'vehicleOwnerAddress' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehicleOwnerPAN') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleOwnerPAN')}>
                                Owner PAN {sortConfig?.key === 'vehicleOwnerPAN' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehicleOwnerAadhar') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleOwnerAadhar')}>
                                Owner Aadhar {sortConfig?.key === 'vehicleOwnerAadhar' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        {visibleFields.includes('vehicleCurrentStatus') && (
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('vehicleCurrentStatus')}>
                                Current Status {sortConfig?.key === 'vehicleCurrentStatus' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
                            </th>
                        )}
                        <th className="p-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map(vehicle => (
                        <tr key={vehicle.vehicleNumber} className="border-b border-gray-700">
                            {visibleFields.includes('vehicleNumber') && <td className="text-center p-2">{vehicle.vehicleNumber}</td>}
                            {visibleFields.includes('vehicleType') && <td className="text-center p-2">{vehicle.vehicleType}</td>}
                            {visibleFields.includes('vehicleModel') && <td className="text-center p-2">{vehicle.vehicleModel}</td>}
                            {visibleFields.includes('vehicleMake') && <td className="text-center p-2">{vehicle.vehicleMake}</td>}
                            {visibleFields.includes('vehicleYear') && <td className="text-center p-2">{vehicle.vehicleYear}</td>}
                            {visibleFields.includes('vehicleCapacity') && <td className="text-center p-2">{vehicle.vehicleCapacity}</td>}
                            {visibleFields.includes('vehicleFuelType') && <td className="text-center p-2">{vehicle.vehicleFuelType}</td>}
                            {visibleFields.includes('vehicleInsuranceExpiry') && <td className="text-center p-2">{new Date(vehicle.vehicleInsuranceExpiry).toLocaleDateString()}</td>}
                            {visibleFields.includes('vehiclePermitExpiry') && <td className="text-center p-2">{new Date(vehicle.vehiclePermitExpiry).toLocaleDateString()}</td>}
                            {visibleFields.includes('vehicleFitnessExpiry') && <td className="text-center p-2">{new Date(vehicle.vehicleFitnessExpiry).toLocaleDateString()}</td>}
                            {visibleFields.includes('vehiclePUCExpiry') && <td className="text-center p-2">{new Date(vehicle.vehiclePUCExpiry).toLocaleDateString()}</td>}
                            {visibleFields.includes('vehicleRegistration') && <td className="text-center p-2">{new Date(vehicle.vehicleRegistration).toLocaleDateString()}</td>}
                            {visibleFields.includes('vehicleTDS') && <td className="text-center p-2">{vehicle.vehicleTDS ? 'Yes' : 'No'}</td>}
                            {visibleFields.includes('vehicleOwner') && <td className="text-center p-2">{vehicle.vehicleOwner}</td>}
                            {visibleFields.includes('vehicleOwnerContact') && <td className="text-center p-2">{vehicle.vehicleOwnerContact}</td>}
                            {visibleFields.includes('vehicleOwnerEmail') && <td className="text-center p-2">{vehicle.vehicleOwnerEmail}</td>}
                            {visibleFields.includes('vehicleOwnerAddress') && <td className="text-center p-2">{vehicle.vehicleOwnerAddress}</td>}
                            {visibleFields.includes('vehicleOwnerPAN') && <td className="text-center p-2">{vehicle.vehicleOwnerPAN}</td>}
                            {visibleFields.includes('vehicleOwnerAadhar') && <td className="text-center p-2">{vehicle.vehicleOwnerAadhar}</td>}
                            {visibleFields.includes('vehicleCurrentStatus') && <td className="text-center p-2">{vehicle.vehicleCurrentStatus}</td>}
                            <td className="text-center p-2">
                                <button
                                    onClick={() => handleDelete(vehicle.vehicleNumber)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                            </td>
                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageVehicle;