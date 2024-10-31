import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Loader from '../components/Loader';
import {Link} from 'react-router-dom';
import * as Yup from 'yup';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    function handleSubmit() {
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
        }, 5000);
    }

    return (
        <div className="flex items-center justify-center">
            {isSubmitting && <Loader />}
            <div className={`bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md ${isSubmitting? "blur-md pointer-events-none": ""}`}>
                <h1 className="text-2xl font-bold text-white mb-6 text-center">Login</h1>
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={Yup.object({
                        email: Yup.string().email('Invalid email address').required('Required'),
                        password: Yup.string()
                            .required('Required')
                            .min(8, 'Password must be at least 8 characters')
                            .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                            .matches(/[0-9]/, 'Password must contain at least one number')
                            .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        console.log(values);
                        setSubmitting(false);
                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="mb-4">
                                <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter your email"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                                <div className='flex items-center bg-gray-700 rounded'>
                                    <Field
                                        type={!showPassword ? "password" : "text"}
                                        name="password"
                                        id="password"
                                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your password"
                                    />
                                    <FontAwesomeIcon icon={!showPassword ? faEye : faEyeSlash} className="mr-3 text-white h-5" cursor='pointer' onClick={togglePassword} />
                                </div>
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                                onClick={handleSubmit}

                            >
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className="mt-4 text-center">
                    <Link to={'/forgot-password'} className="text-sm text-blue-400 hover:underline">Forgot password?</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;