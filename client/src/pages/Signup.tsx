import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Loader, successMessage, failureMessage } from '../components/index';
import * as Yup from 'yup';
import createUser from '../services/signup.api'
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const createdBy = useSelector((state: RootState) => state.auth.id);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (values: { email: string; password: string }) => {
        const { email, password } = values;
        setSubmitting(true);
        try {
            if (createdBy) {
                await createUser(email, password, createdBy);
            } else {
                alert('Admin Id not found');
                throw new Error('User ID is null');
            }
            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
            }, 3000);
        } catch (error) {
            setFailure(true);
            setTimeout(() => {
                setFailure(false);
            }, 3000);
        }
        setSubmitting(false);
    };

    return (
        <>
            {success ? successMessage('User Created Successfully') : null}
            {failure ? failureMessage('User Already Exists') : null}
            <div className="flex items-center justify-center">
                {isSubmitting ? <Loader /> : null}
                <div className={`bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md ${isSubmitting ? "blur-md pointer-events-none" : ""}`}>
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Signup</h1>
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
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, handleChange, handleBlur, values }) => (
                            <Form>
                                <div className="mb-4">
                                    <label className="block text-gray-400 mb-2" htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div className="mb-6 relative">
                                    <label className="block text-gray-400 mb-2" htmlFor="password">Password</label>
                                    <Field
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        id="password"
                                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter your password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    <FontAwesomeIcon icon={!showPassword ? faEye : faEyeSlash} className="absolute right-3 top-10 text-white h-5 cursor-pointer" onClick={togglePassword} />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
                                    disabled={isSubmitting}
                                >
                                    Signup
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default Signup;