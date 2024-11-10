import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import fetchUsers from '../services/manageUsers.api';
import deleteUser  from '../services/deleteUser.api';

const ManageUsers = () => {
    interface User {
        id: string;
        name: string;
        email: string;
        role: string;
    }

    const [users, setUsers] = useState<User[]>([]);
    const createdBy = useSelector((state: RootState) => state.auth.id) || '';
    const plan = 'starter';
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: string } | null>(null);
    
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

    return (
        <div className="p-8 bg-gray-900 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
            <table className="w-full bg-gray-800 rounded-lg shadow-lg">
                <thead>
                    <tr className="bg-gray-700">
                    <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('email')}>
                            Email {sortConfig?.key === 'email' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} className='ml-6' /> : <FontAwesomeIcon icon={faSortDown} className='ml-6'/>)}
                        </th>
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

export default ManageUsers;