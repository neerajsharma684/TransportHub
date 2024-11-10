import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import fetchUsers from '../services/manageUsers.api';
import deleteUser  from '../services/deleteUser.api';

const Branch = () => {
    interface User {
        id: string;
        name: string;
        email: string;
        role: string;
        address?: string;
        phone?: string;
        manager?: string;
    }

    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
    const createdBy = useSelector((state: RootState) => state.auth.id) || '';
    const plan = 'starter';

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const response = await fetchUsers(createdBy);
            setUsers(response);
        } catch (error) {
            console.error('Error fetching users:', error);
        }


    }

    const handleDelete = async (userEmail: string) => {
    const confirmed = window.confirm('Are you sure you want to delete ' + userEmail + '?');
    if (confirmed) {
        await deleteUser(userEmail);
        setUsers(users.filter(user => user.email !== userEmail));
    }
    };

    const handleSort = (key: keyof User) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        sortArray(key, direction);
    };

    const sortArray = (key: keyof User, direction: string) => {
        const sortedUsers = [...users].sort((a, b) => {
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
        setUsers(sortedUsers);
    };

    const maxBranches = plan === 'starter' ? 10 : 10; // Example: 10 for starter, 10 for other plans
    const branchesLeft = maxBranches - users.length;


    return (
        <div className="p-8 bg-gray-900 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Manage Branch</h1>
            
                <div className="mb-4">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <p className="text-lg">Branches Left: {branchesLeft} / {maxBranches}</p>
                    <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
                        <div
                            className="bg-blue-500 h-4 rounded-full"
                            style={{ width: `${(users.length / maxBranches) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>
            <button
                    onClick={() => navigate('/add-branch')}
                    className={`bg-blue-500 text-white p-2 mb-4 rounded hover:bg-blue-600 transition duration-200 ${branchesLeft <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    Add New Branch
                </button>
            <table className="w-full bg-gray-800 rounded-lg shadow-lg">
                <thead>
                    <tr className="bg-gray-700">
                    <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('name')}>
                            Name {sortConfig?.key === 'name' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} className='ml-6'/> : <FontAwesomeIcon icon={faSortDown} className='ml-6'/>)}
                        </th>
                        <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('address')}>
                            Address {sortConfig?.key === 'address' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} className='ml-6'/> : <FontAwesomeIcon icon={faSortDown} className='ml-6'/>)}
                        </th>
                        <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('email')}>
                            Email {sortConfig?.key === 'email' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} className='ml-6'/> : <FontAwesomeIcon icon={faSortDown} className='ml-6'/>)}
                        </th>
                        <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('phone')}>
                            Phone {sortConfig?.key === 'phone' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} className='ml-6'/> : <FontAwesomeIcon icon={faSortDown} className='ml-6'/>)}
                        </th>
                        <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('manager')}>
                            Manager {sortConfig?.key === 'manager' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} className='ml-6'/> : <FontAwesomeIcon icon={faSortDown} className='ml-6'/>)}
                        </th>
                        <th className="p-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b border-gray-700">
                            <td className="text-center p-2">{user.email}</td>
                            <td className="text-center p-2">{user.email}</td>
                            <td className="text-center p-2">{user.email}</td>
                            <td className="text-center p-2">{user.email}</td>
                            <td className="text-center p-2">{user.email}</td>
                            <td className="text-center p-2">
                                <button
                                    onClick={() => handleDelete(user.email)}
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

export default Branch;