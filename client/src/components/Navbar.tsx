import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faInfoCircle, faGear, faChevronDown, faChevronUp, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});
    const dropdownRefs = useRef<{ [key: string]: HTMLLIElement | null }>({});

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
        localStorage.removeItem('token');
        navigate('/home');
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
                            to="/home"
                            className={`flex items-center p-2 rounded transition duration-200 ${
                                isActive('/home') ? 'bg-blue-700' : 'hover:bg-gray-700'
                            }`}
                        >
                            <FontAwesomeIcon icon={faDashboard} className="mr-2" />
                            <span>Dashboard</span>
                        </Link>
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
                    <li
                        ref={el => (dropdownRefs.current['settings'] = el)}
                        className="relative"
                    >
                        <div
                            onClick={() => toggleDropdown('settings')}
                            className={`flex items-center p-2 rounded transition duration-200 cursor-pointer ${
                                isDropdownActive(['/branch', '/account-settings', '/forgot-password'])
                                    ? 'bg-blue-700'
                                    : 'hover:bg-gray-700'
                            }`}
                        >
                            <FontAwesomeIcon icon={faGear} className="mr-2" />
                            <span>Settings</span>
                            <FontAwesomeIcon
                                icon={openDropdowns['settings'] ? faChevronUp : faChevronDown}
                                className="ml-auto"
                            />
                        </div>
                        {openDropdowns['settings'] && (
                            <ul className="absolute left-0 mt-2 w-full bg-gray-800 rounded shadow-lg z-10">
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
                                        to="/account-settings"
                                        className={`flex items-center p-2 rounded transition duration-200 ${
                                            isActive('/account-settings') ? 'bg-blue-600' : 'hover:bg-gray-700'
                                        }`}
                                    >
                                        <span>Account Settings</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/forgot-password"
                                        className={`flex items-center p-2 rounded transition duration-200 ${
                                            isActive('/forgot-password') ? 'bg-blue-600' : 'hover:bg-gray-700'
                                        }`}
                                    >
                                        <span>Forgot Password</span>
                                    </Link>
                                </li>
                            </ul>
                        )}
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
                <p className="text-sm text-gray-400">© 2023 TransportHub</p>
            </div>
        </div>
    );
};

export default Navbar;
