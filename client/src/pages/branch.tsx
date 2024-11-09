import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import fetchUsers from '../services/manageUsers.api';

const statesAndCities = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur"],
    "Arunachal Pradesh": ["Itanagar"],
    "Assam": ["Guwahati", "Dibrugarh"],
    "Bihar": ["Patna", "Gaya"],
    "Chhattisgarh": ["Raipur"],
    "Goa": ["Panaji"],
    "Gujarat": ["Ahmedabad", "Surat"],
    "Haryana": ["Chandigarh", "Gurgaon"],
    "Himachal Pradesh": ["Shimla"],
    "Jharkhand": ["Ranchi"],
    "Karnataka": ["Bangalore", "Mysore"],
    "Kerala": ["Thiruvananthapuram", "Kochi"],
    "Madhya Pradesh": ["Bhopal", "Indore"],
    "Maharashtra": ["Mumbai", "Pune"],
    "Manipur": ["Imphal"],
    "Meghalaya": ["Shillong"],
    "Mizoram": ["Aizawl"],
    "Nagaland": ["Kohima"],
    "Odisha": ["Bhubaneswar"],
    "Punjab": ["Chandigarh", "Ludhiana"],
    "Rajasthan": ["Jaipur", "Udaipur"],
    "Sikkim": ["Gangtok"],
    "Tamil Nadu": ["Chennai", "Coimbatore"],
    "Telangana": ["Hyderabad"],
    "Tripura": ["Agartala"],
    "Uttar Pradesh": ["Lucknow", "Kanpur"],
    "Uttarakhand": ["Dehradun"],
    "West Bengal": ["Kolkata", "Darjeeling"]
};

const Branch = () => {
    const createdBy = useSelector((state: RootState) => state.auth.id || '');
    const [selectedState, setSelectedState] = useState<keyof typeof statesAndCities | ''>('');
    const [managers, setManagers] = useState([]);
    const initialValues = {
        name: '',
        address: {
            street: '',
            city: '',
            state: '',
            zip: ''
        },
        contact: {
            phone: '',
            email: ''
        },
        manager: '',
        createdBy: createdBy
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const users = await fetchUsers(createdBy);
        setManagers(users);
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        address: Yup.object({
            street: Yup.string().required('Required'),
            city: Yup.string().required('Required'),
            state: Yup.string().required('Required'),
            zip: Yup.string().required('Required')
        }),
        contact: Yup.object({
            phone: Yup.string().required('Required'),
            email: Yup.string().email('Invalid email address').required('Required')
        }),
        manager: Yup.string().required('Required')
    });

    const handleSubmit = async (values: typeof initialValues) => {
        try {
            const response = await fetch('/api/branches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(values)
            });
            if (response.ok) {
                alert('Branch created successfully');
            } else {
                alert('Failed to create branch');
            }
        } catch (error) {
            console.error('Error creating branch:', error);
            alert('Failed to create branch');
        }
    };

    return (
        <div className="bg-gray-900 text-white">
            <h1 className="text-3xl font-bold mb-6">Create Branch</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue }) => (
                    <Form className="space-y-4">
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="name">Branch Name</label>
                            <Field
                                type="text"
                                name="name"
                                id="name"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="street">Street</label>
                            <Field
                                type="text"
                                name="address.street"
                                id="street"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="address.street" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="state">State</label>
                            <Field
                                as="select"
                                name="address.state"
                                id="state"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const value = e.target.value;
                                    setSelectedState(value as keyof typeof statesAndCities);
                                    setFieldValue('address.state', value);
                                    setFieldValue('address.city', ''); // Reset city when state changes
                                }}
                            >
                                <option value="">Select State</option>
                                {Object.keys(statesAndCities).map(state => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="address.state" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="city">City</label>
                            <Field
                                as="select"
                                name="address.city"
                                id="city"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select City</option>
                                {selectedState
                                    ? statesAndCities[selectedState].map(city => (
                                        <option key={city} value={city}>{city}</option>
                                    ))
                                    : Object.keys(statesAndCities).map(state => (
                                        <optgroup key={state} label={state}>
                                            {statesAndCities[state as keyof typeof statesAndCities].map(city => (
                                                <option key={city} value={city}>{city}</option>
                                            ))}
                                        </optgroup>
                                    ))}
                            </Field>
                            <ErrorMessage name="address.city" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="zip">ZIP Code</label>
                            <Field
                                type="text"
                                name="address.zip"
                                id="zip"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="address.zip" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="phone">Phone</label>
                            <Field
                                type="text"
                                name="contact.phone"
                                id="phone"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="contact.phone" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                            <Field
                                type="email"
                                name="contact.email"
                                id="email"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage name="contact.email" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2" htmlFor="manager">Manager</label>
                            <Field
                                as="select"
                                name="manager"
                                id="manager"
                                className="w-full p-2 rounded bg-gray-700 text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Manager</option>
                                {
                                    managers.map((manager: any) => (
                                        <option key={manager.email} value={manager.email}>{manager.email}</option>
                                    ))
                                }
                            </Field>
                            <ErrorMessage name="manager" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Branch'}
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default Branch;