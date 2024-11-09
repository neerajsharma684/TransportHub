import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
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
    }

    const [users, setUsers] = useState<User[]>([]);
    const navigate = useNavigate();
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
                        <th className="p-4 text-center">Name</th>
                        <th className="p-4 text-center">Address</th>
                        <th className="p-4 text-center">Email</th>
                        <th className="p-4 text-center">Phone</th>
                        <th className="p-4 text-center">Manager</th>
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