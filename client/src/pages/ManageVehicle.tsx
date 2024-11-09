import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import fetchUsers from '../services/manageUsers.api';

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
        vehicleOwner: string;
        vehicleOwnerContact: string;
    }

    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [visibleFields, setVisibleFields] = useState<string[]>([
        'vehicleNumber',
        'vehicleType',
        'vehicleYear',
        'vehicleCapacity',
        'vehicleFuelType',
        'vehicleOwner',
        'vehicleInsuranceExpiry'
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

    const handleFieldToggle = (field: string) => {
        setVisibleFields(prevFields =>
            prevFields.includes(field)
                ? prevFields.filter(f => f !== field)
                : [...prevFields, field]
        );
    };

    const fields = [
        { label: 'Vehicle Number', value: 'vehicleNumber' },
        { label: 'Vehicle Type', value: 'vehicleType' },
        { label: 'Vehicle Model', value: 'vehicleModel' },
        { label: 'Vehicle Make', value: 'vehicleMake' },
        { label: 'Vehicle Year', value: 'vehicleYear' },
        { label: 'Vehicle Capacity', value: 'vehicleCapacity' },
        { label: 'Vehicle Fuel Type', value: 'vehicleFuelType' },
        { label: 'Vehicle Insurance Expiry', value: 'vehicleInsuranceExpiry' },
        { label: 'Vehicle Permit Expiry', value: 'vehiclePermitExpiry' },
        { label: 'Vehicle Fitness Expiry', value: 'vehicleFitnessExpiry' },
        { label: 'Vehicle PUC Expiry', value: 'vehiclePUCExpiry' },
        { label: 'Vehicle Registration', value: 'vehicleRegistration' },
        { label: 'Vehicle Owner', value: 'vehicleOwner' },
        { label: 'Vehicle Owner Contact', value: 'vehicleOwnerContact' }
    ];

    return (
        <div className=" bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Manage Vehicles</h1>
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
                        {visibleFields.includes('vehicleNumber') && <th className="p-4 text-center">Vehicle Number</th>}
                        {visibleFields.includes('vehicleType') && <th className="p-4 text-center">Vehicle Type</th>}
                        {visibleFields.includes('vehicleModel') && <th className="p-4 text-center">Vehicle Model</th>}
                        {visibleFields.includes('vehicleMake') && <th className="p-4 text-center">Vehicle Make</th>}
                        {visibleFields.includes('vehicleYear') && <th className="p-4 text-center">Vehicle Year</th>}
                        {visibleFields.includes('vehicleCapacity') && <th className="p-4 text-center">Vehicle Capacity</th>}
                        {visibleFields.includes('vehicleFuelType') && <th className="p-4 text-center">Vehicle Fuel Type</th>}
                        {visibleFields.includes('vehicleInsuranceExpiry') && <th className="p-4 text-center">Insurance Expiry</th>}
                        {visibleFields.includes('vehiclePermitExpiry') && <th className="p-4 text-center">Permit Expiry</th>}
                        {visibleFields.includes('vehicleFitnessExpiry') && <th className="p-4 text-center">Fitness Expiry</th>}
                        {visibleFields.includes('vehiclePUCExpiry') && <th className="p-4 text-center">PUC Expiry</th>}
                        {visibleFields.includes('vehicleRegistration') && <th className="p-4 text-center">Registration</th>}
                        {visibleFields.includes('vehicleOwner') && <th className="p-4 text-center">Owner</th>}
                        {visibleFields.includes('vehicleOwnerContact') && <th className="p-4 text-center">Owner Contact</th>}
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
                            {visibleFields.includes('vehicleOwner') && <td className="text-center p-2">{vehicle.vehicleOwner}</td>}
                            {visibleFields.includes('vehicleOwnerContact') && <td className="text-center p-2">{vehicle.vehicleOwnerContact}</td>}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageVehicle;