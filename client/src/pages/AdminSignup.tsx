import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Loader, successMessage, failureMessage } from '../components/index';
import * as Yup from 'yup';
import createUser from '../services/adminSignup.api'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [failure, setFailure] = useState(false);
    const [showAddons, setShowAddons] = useState(false);
    const userRole = useSelector((state: RootState) => state.auth.role);
    const userEmail = useSelector((state: RootState) => state.auth.email);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (values: { name: string; email: string; password: string; role: string, plan: string, addons: String[] }) => {
        if (userEmail === null) {
            alert('Please login to create a user');
            return;
        }
        const { name, email, password, role, plan, addons } = values;
        setSubmitting(true);
        try {
            await createUser(name, email, password, role, plan, addons, userEmail);
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
                    <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Signup</h1>
                    <Formik
                        initialValues={{ name: '', email: '', password: '', role: 'admin', plan: 'starter', addons: ['none'] }}
                        validationSchema={Yup.object({
                            name: Yup.string().required('Required'),
                            email: Yup.string().email('Invalid email address').required('Required'),
                            password: Yup.string()
                                .required('Required')
                                .min(8, 'Password must be at least 8 characters')
                                .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
                                .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
                                .matches(/[0-9]/, 'Password must contain at least one number')
                                .matches(/[@$!%*?&#]/, 'Password must contain at least one special character'),
                            role: Yup.string().oneOf(['admin', 'superadmin']).required('Required'),
                            plan: Yup.string().oneOf(['starter', 'growth', 'professional', 'enterprise', 'custom']).required('Required'),
                            addons: Yup.array().of(Yup.string().oneOf(['none', 'doccument-expiry-alerts', 'vehicle-reports', 'financial-reports', 'auto-invoices'])).required('Required')
                        })}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, handleChange, handleBlur, values }) => (
                            <Form>
                                <div className="mb-4">
                                    <label className="block text-gray-400 mb-2" htmlFor="email">Name</label>
                                    <Field
                                        type="name"
                                        name="name"
                                        id="name"
                                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Enter Company Name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
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
                                {userRole === 'superadmin' &&(
                                <div className="mb-6">
                                    <label className="block text-gray-400 mb-2" htmlFor="role">Role</label>
                                    <Field
                                        as="select"
                                        name="role"
                                        id="role"
                                        className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.role}
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="superadmin">Superadmin</option>
                                    </Field>
                                    <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                )}
                                {userRole === "superadmin" && values.role==="admin" &&(
                                    <div className='mb-6'>
                                        <label className='block text-gray-400 mb-2' htmlFor='plan'>Plan</label>
                                        <Field
                                            as='select'
                                            name='plan'
                                            id='plan'
                                            className='w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.plan}
                                        >
                                            <option value='starter'>Starter</option>
                                            <option value='growth'>Growth</option>
                                            <option value='professional'>Professional</option>
                                            <option value='enterprise'>Enterprise</option>
                                            <option value='custom'>Custom</option>
                                        </Field>
                                        <ErrorMessage name="plan" component="div" className="text-red-500 text-sm mt-1" />

                                        <div className='flex justify-center'>
                                            <label className='block text-gray-400 mb-2 mt-2' htmlFor='addons'>Addons</label>
                                            <Field
                                                type='checkbox'
                                                name='showaddons'
                                                id='showaddons'
                                                value='none'
                                                className='mr-2 ml-4'
                                                onClick={() => {setShowAddons(!showAddons)
                                                    values.addons = ['none']
                                                }}
                                            ></Field>
                                            </div>
                                            {showAddons &&(
                                            <>
                                        <Field
                                            as='select'
                                            name='addons'
                                            id='addons'
                                            className='w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500'
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.addons}
                                            multiple
                                        >
                                            <option value='doccument-expiry-alerts'>📅 Document Expiry Alerts</option>
                                            <option value='vehicle-reports'>🚗 Vehicle Reports</option>
                                            <option value='financial-reports'>💰 Financial Reports</option>
                                            <option value='auto-invoices'>🧾 Auto Invoices</option>
                                        </Field>
                                        <ErrorMessage name="addons" component="div" className="text-red-500 text-sm mt-1" />
                                        </>
                                )}
                                    </div>
                                )}
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

export default Login;