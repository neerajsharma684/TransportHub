import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/authSlice';
import { faDashboard, faInfoCircle, faGear, faChevronDown, faChevronUp, faSignOutAlt, faDatabase } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
    const dropdownRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});
    const userRole = useSelector((state: RootState) => state.auth.role);


    const toggleDropdown = (key: string) => {
        setOpenDropdowns(prevState => ({
            ...prevState,
            [key]: !prevState[key]
        }));
    };

    const handleClickOutside = (event: MouseEvent) => {
        Object.keys(dropdownRefs.current).forEach(key => {
            if (dropdownRefs.current[key] && !dropdownRefs.current[key]?.contains(event.target as Node)) {
                setOpenDropdowns(prevState => ({
                    ...prevState,
                    [key]: false
                }));
            }
        });
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
        window.location.reload(); // To refresh the state in App component
    };
    

    // Function to determine if a route is active
    const isActive = (path: string) => location.pathname === path;

    // Function to check if a dropdown parent item should be highlighted
    const isDropdownActive = (paths: string[]) => paths.some(path => location.pathname === path);

    return (
        <div className="fixed top-0 left-0 h-screen bg-gray-900 text-white w-64 flex flex-col shadow-lg">
            <div className="flex items-center justify-center h-20 border-b border-gray-700">
                <h1 className="text-2xl font-bold">TransportHub</h1>
            </div>
            <nav className="flex-grow">
                <ul className="flex flex-col p-4 space-y-4">
                    <li>
                        <Link
                            to="/dashboard"
                            className={`flex items-center p-2 rounded transition duration-200 ${
                                isActive('/dashboard') ? 'bg-blue-700' : 'hover:bg-gray-700'
                            }`}
                        >
                            <FontAwesomeIcon icon={faDashboard} className="mr-2" />
                            <span>Dashboard</span>
                        </Link>
                    </li>
                    <li
                        ref={el => (dropdownRefs.current['master'] = el)}
                        className="relative"
                    >
                        <div
                            onClick={() => toggleDropdown('master')}
                            className={`flex items-center p-2 rounded transition duration-200 cursor-pointer ${
                                isDropdownActive(['/branch', '/rate-list', '/party-info', '/vehicle-info', '/driver-info'])
                                    ? 'bg-blue-700'
                                    : 'hover:bg-gray-700'
                            }`}
                        >
                            <FontAwesomeIcon icon={faDatabase} className="mr-2" />
                            <span>Master</span>
                            <FontAwesomeIcon
                                icon={openDropdowns['master'] ? faChevronUp : faChevronDown}
                                className="ml-auto"
                            />
                        </div>
                        {openDropdowns['master'] && (
                            <ul className="absolute left-0 mt-2 w-full bg-gray-800 rounded shadow-lg z-10 ml-2 pl-6">
                                <li>
                                    <Link
                                        to="/branch"
                                        className={`flex items-center p-2 rounded transition duration-200 ${
                                            isActive('/branch') ? 'bg-blue-600' : 'hover:bg-gray-700'
                                        }`}
                                    >
                                        <span>Branch</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/rate-list"
                                        className={`flex items-center p-2 rounded transition duration-200 ${
                                            isActive('/rate-list') ? 'bg-blue-600' : 'hover:bg-gray-700'
                                        }`}
                                    >
                                        <span>Rate List</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/Party-info"
                                        className={`flex items-center p-2 rounded transition duration-200 ${
                                            isActive('/party-info') ? 'bg-blue-600' : 'hover:bg-gray-700'
                                        }`}
                                    >
                                        <span>Party</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/vehicle-info"
                                        className={`flex items-center p-2 rounded transition duration-200 ${
                                            isActive('/vehicle-info') ? 'bg-blue-600' : 'hover:bg-gray-700'
                                        }`}
                                    >
                                        <span>Vehicle</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/driver-info"
                                        className={`flex items-center p-2 rounded transition duration-200 ${
                                            isActive('/driver-info') ? 'bg-blue-600' : 'hover:bg-gray-700'
                                        }`}
                                    >
                                        <span>Driver</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li
                        ref={el => (dropdownRefs.current['settings'] = el)}
                        className="relative"
                    >
                        <div
                            onClick={() => toggleDropdown('settings')}
                            className={`flex items-center p-2 rounded transition duration-200 cursor-pointer ${
                                isDropdownActive(['/account-settings'])
                                    ? 'bg-blue-700'
                                    : 'hover:bg-gray-700'
                            }`}
                        >
                            <FontAwesomeIcon icon={faGear} className="mr-2" />
                            <span>Settings</span>
                            <FontAwesomeIcon
                                icon={openDropdowns['create-user'] ? faChevronUp : faChevronDown}
                                className="ml-auto"
                            />
                        </div>
                        {openDropdowns['settings'] && (
                            <ul className="absolute left-0 mt-2 w-full bg-gray-800 rounded shadow-lg z-10 ml-2 pl-6">
                                <li>
                                    <Link
                                        to="/signup"
                                        className={`flex items-center p-2 rounded transition duration-200 ${
                                            isActive('/signup') ? 'bg-blue-600' : 'hover:bg-gray-700'
                                        }`}
                                    >
                                        <span>Create User</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/manage-users"
                                        className={`flex items-center p-2 rounded transition duration-200 ${
                                            isActive('/manage-users') ? 'bg-blue-600' : 'hover:bg-gray-700'
                                        }`}
                                    >
                                        <span>Manage Users</span>
                                    </Link>
                                </li>
                                {userRole != 'user' &&(
                                <>
                                <li>
                                    <Link
                                        to="/admin-signup"
                                        className={`flex items-center p-2 rounded transition duration-200 ${
                                            isActive('/admin-signup') ? 'bg-blue-600' : 'hover:bg-gray-700'
                                        }`}
                                    >
                                        <span>Create Admin</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/manage-admins"
                                        className={`flex items-center p-2 rounded transition duration-200 ${
                                            isActive('/manage-admins') ? 'bg-blue-600' : 'hover:bg-gray-700'
                                        }`}
                                    >
                                        <span>Manage Admins</span>
                                    </Link>
                                </li>
                                </>
                                )}
                            </ul>
                        )}
                    </li>
                    <li>
                        <Link
                            to="/about"
                            className={`flex items-center p-2 rounded transition duration-200 ${
                                isActive('/about') ? 'bg-blue-700' : 'hover:bg-gray-700'
                            }`}
                        >
                            <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                            <span>About</span>
                        </Link>
                    </li>
                    <li>
                    <div onClick={handleLogout} className="flex items-center p-2 hover:bg-gray-700 rounded transition duration-200 cursor-pointer">
                            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                            <span>Logout</span>
                        </div>
                    </li>
                </ul>
            </nav>
            <div className="p-4 border-t border-gray-700">
                <p className="text-sm text-gray-400">© 2024 TransportHub</p>
            </div>
        </div>
    );
};

export default Navbar;
