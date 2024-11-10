import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const AddVehicle = () => {
    const createdBy = useSelector((state: RootState) => state.auth.id || '');

    const initialValues = {
        vehicleNumber: '',
        vehicleType: '',
        vehicleModel: '',
        vehicleMake: '',
        vehicleYear: '',
        vehicleCapacity: '',
        vehicleFuelType: '',
        vehicleInsuranceExpiry: new Date(),
        vehiclePermitExpiry: new Date(),
        vehicleFitnessExpiry: new Date(),
        vehiclePUCExpiry: new Date(),
        vehicleRegistration: new Date(),
        vehicleTDS: false,
        vehicleCurrentStatus: '',
        vehicleOwner: '',
        vehicleOwnerContact: '',
        vehicleOwnerEmail: '',
        vehicleOwnerAddress: '',
        vehicleOwnerPAN: '',
        vehicleOwnerAadhar: '',
        createdBy: createdBy
    };

    const validationSchema = Yup.object({
        vehicleNumber: Yup.string().required('Required'),
        vehicleType: Yup.string().required('Required'),
        vehicleModel: Yup.string().required('Required'),
        vehicleMake: Yup.string().required('Required'),
        vehicleYear: Yup.number().required('Required').min(1900, 'Invalid year').max(new Date().getFullYear(), 'Invalid year'),
        vehicleCapacity: Yup.number().required('Required'),
        vehicleFuelType: Yup.string().required('Required'),
        vehicleInsuranceExpiry: Yup.date().required('Required'),
        vehiclePermitExpiry: Yup.date().required('Required'),
        vehicleFitnessExpiry: Yup.date().required('Required'),
        vehiclePUCExpiry: Yup.date().required('Required'),
        vehicleRegistration: Yup.date().required('Required'),
        vehicleCurrentStatus: Yup.string().required('Required'),
        vehicleOwner: Yup.string().required('Required'),
        vehicleOwnerContact: Yup.string().required('Required'),
        vehicleOwnerEmail: Yup.string().email('Invalid email address').required('Required'),
        vehicleOwnerAddress: Yup.string().required('Required'),
        vehicleOwnerPAN: Yup.string().required('Required'),
        vehicleOwnerAadhar: Yup.string().required('Required')
    });

    const handleSubmit = async (values: typeof initialValues) => {
        // try {
        //     const response = await fetch('/api/vehicles', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${localStorage.getItem('token')}`
        //         },
        //         body: JSON.stringify(values)
        //     });
        //     if (response.ok) {
        //         alert('Vehicle added successfully');
        //     } else {
        //         alert('Failed to add vehicle');
        //     }
        // } catch (error) {
        //     console.error('Error adding vehicle:', error);
        //     alert('Failed to add vehicle');
        // }
        alert('Vehicle added successfully');
    };

    const vehicleTypes = {
        Trucks: [
            'Truck', 'Pickup Truck', 'Mini Truck', 'Van', 'Tanker', 'Trailer', 'Container Truck', 'Flatbed Truck',
            'Refrigerated Truck', 'Open Truck', 'Box Truck', 'Tipper Truck', 'Dump Truck', 'Tow Truck', 'Car Carrier',
            'Livestock Carrier', 'Oil Tanker', 'Water Tanker', 'Garbage Truck', 'Heavy Hauler', 'Cement Mixer Truck',
            'Logging Truck', 'Flatbed Trailer', 'Lowboy Trailer', 'Dry Van', 'Reefer (Refrigerated Trailer)',
            'Curtain Side Trailer', 'Panel Van', 'Cargo Van', 'Utility Van', 'Covered Truck', 'Multi-Axle Trailer',
            'Bulk Carrier', 'Side Loader', 'Rollback Truck', 'Step Deck Trailer'
        ]
    };

    const fuelTypes = ['Diesel', 'CNG', 'Electric', 'Hybrid'];

    return (
        <div className="p-8 bg-gray-900 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Add Vehicle</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue, values }) => (
                    <Form className="space-y-4 grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehicleNumber">Vehicle Number</label>
                            <Field
                                type="text"
                                name="vehicleNumber"
                                id="vehicleNumber"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="vehicleNumber" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2 -mt-4" htmlFor="vehicleType">Vehicle Type</label>
                            <Field
                                as="select"
                                name="vehicleType"
                                id="vehicleType"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Vehicle Type</option>
                                {vehicleTypes.Trucks.map((vehicleType: string) => (
                                    <option key={vehicleType} value={vehicleType}>{vehicleType}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="vehicleType" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehicleModel">Vehicle Model</label>
                            <Field
                                type="text"
                                name="vehicleModel"
                                id="vehicleModel"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="vehicleModel" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehicleMake">Vehicle Make</label>
                            <Field
                                type="text"
                                name="vehicleMake"
                                id="vehicleMake"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="vehicleMake" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehicleYear">Vehicle Year</label>
                            <Field
                                type="number"
                                name="vehicleYear"
                                id="vehicleYear"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="vehicleYear" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehicleCapacity">Vehicle Capacity</label>
                            <Field
                                type="number"
                                name="vehicleCapacity"
                                id="vehicleCapacity"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="vehicleCapacity" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehicleFuelType">Vehicle Fuel Type</label>
                            <Field
                                as="select"
                                name="vehicleFuelType"
                                id="vehicleFuelType"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Fuel Type</option>
                                {fuelTypes.map(fuelType => (
                                    <option key={fuelType} value={fuelType}>{fuelType}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="vehicleFuelType" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehicleInsuranceExpiry">Insurance Expiry</label>
                            <Field
                                type="date"
                                name="vehicleInsuranceExpiry"
                                id="vehicleInsuranceExpiry"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="vehicleInsuranceExpiry" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehiclePermitExpiry">Permit Expiry</label>
                            <Field
                                type="date"
                                name="vehiclePermitExpiry"
                                id="vehiclePermitExpiry"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="vehiclePermitExpiry" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehicleFitnessExpiry">Fitness Expiry</label>
                            <Field
                                type="date"
                                name="vehicleFitnessExpiry"
                                id="vehicleFitnessExpiry"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="vehicleFitnessExpiry" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehiclePUCExpiry">PUC Expiry</label>
                            <Field
                                type="date"
                                name="vehiclePUCExpiry"
                                id="vehiclePUCExpiry"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="vehiclePUCExpiry" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehicleRegistration">Registration</label>
                            <Field
                                type="date"
                                name="vehicleRegistration"
                                id="vehicleRegistration"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="vehicleRegistration" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehicleTDS">TDS</label>
                            <Field
                                type="checkbox"
                                name="vehicleTDS"
                                id="vehicleTDS"
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-" htmlFor="vehicleCurrentStatus">Current Status</label>
                            <Field
                                as="select"
                                name="vehicleCurrentStatus"
                                id="vehicleCurrentStatus"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Status</option>
                                <option value="On trip">On trip</option>
                                <option value="Ideal">Ideal</option>
                                <option value="Halt">Halt</option>
                                <option value="Need Repair / Repairing">Need Repair / Repairing</option>
                            </Field>
                            <ErrorMessage name="vehicleCurrentStatus" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehicleOwner">Owner Name</label>
                            <Field
                                type="text"
                                name="vehicleOwner"
                                id="vehicleOwner"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="vehicleOwner" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehicleOwnerContact">Owner Contact</label>
                            <Field
                                type="text"
                                name="vehicleOwnerContact"
                                id="vehicleOwnerContact"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="vehicleOwnerContact" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehicleOwnerEmail">Owner Email</label>
                            <Field
                                type="email"
                                name="vehicleOwnerEmail"
                                id="vehicleOwnerEmail"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="vehicleOwnerEmail" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehicleOwnerAddress">Owner Address</label>
                            <Field
                                type="text"
                                name="vehicleOwnerAddress"
                                id="vehicleOwnerAddress"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="vehicleOwnerAddress" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehicleOwnerPAN">Owner PAN</label>
                            <Field
                                type="text"
                                name="vehicleOwnerPAN"
                                id="vehicleOwnerPAN"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="vehicleOwnerPAN" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="vehicleOwnerAadhar">Owner Aadhar</label>
                            <Field
                                type="text"
                                name="vehicleOwnerAadhar"
                                id="vehicleOwnerAadhar"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="vehicleOwnerAadhar" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        
                        <div className="col-span-2">
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Creating...' : 'Add Vehicle'}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default AddVehicle;