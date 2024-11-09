import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import fetchUsers from '../services/manageUsers.api';
import deleteUser  from '../services/deleteUser.api';

const ManageAdmins = () => {
    interface User {
        id: string;
        name: string;
        email: string;
        role: string;
    }

    const [users, setUsers] = useState<User[]>([]);
    const createdBy = useSelector((state: RootState) => state.auth.id) || '';
    const plan = useSelector((state: RootState) => state.auth.name) || '';

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const response = await fetchUsers(createdBy);
            console.log('User exists:', response);
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

    return (
        <div className="p-8 bg-gray-900 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
            <table className="w-full bg-gray-800 rounded-lg shadow-lg">
                <thead>
                    <tr className="bg-gray-700">
                        <th className="p-4 text-center">Email</th>
                        <th className="p-4 text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id} className="border-b border-gray-700">
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

export default ManageAdmins;