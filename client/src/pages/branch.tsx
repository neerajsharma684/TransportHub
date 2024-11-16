import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { useNavigate } from 'react-router-dom';
import fetchbranch from '../services/manageBranch.api';
import deleteBranch from '../services/deleteBranch.api';

const Branch = () => {
    interface Branch {
        _id: string;
        name: string;
        address: {
            street: string;
            state: string;
            city: string;
            zip: string;
        };
        contact: {
            phone: string;
            email: string;
        };
        manager: string;
        createdBy: string;
    }

    type NestedKeyOf<ObjectType extends object> = {
        [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
            ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
            : `${Key}`
    }[keyof ObjectType & (string | number)];

    const [branches, setBranches] = useState<Branch[]>([]);
    const navigate = useNavigate();
    const [sortConfig, setSortConfig] = useState<{ key: NestedKeyOf<Branch>; direction: string } | null>(null);
    const createdBy = useSelector((state: RootState) => state.auth.id) || '';
    const plan = 'starter';

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const response = await fetchbranch(createdBy);
            setBranches(response);
        } catch (error) {
            console.error('Error fetching branches:', error);
        }
    }

    const handleDelete = async (branchId: string) => {
        const branch = branches.find(b => b._id === branchId);
        if (!branch) return;

        const confirmed = window.confirm('Are you sure you want to delete ' + branch.name + '?');
        if (confirmed) {
            await deleteBranch(branchId);
            setBranches(branches.filter(branch => branch._id !== branchId));
        }
    };

    const formatAddress = (address: Branch['address']) => {
        return `${address.street}, ${address.city}, ${address.state} - ${address.zip}`;
    };

    const handleSort = (key: NestedKeyOf<Branch>) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
        sortArray(key, direction);
    };

    const getNestedValue = (obj: any, path: string) => {
        return path.split('.').reduce((current, key) => current?.[key], obj);
    };

    const sortArray = (key: NestedKeyOf<Branch>, direction: string) => {
        const sortedBranches = [...branches].sort((a, b) => {
            const valueA = getNestedValue(a, key);
            const valueB = getNestedValue(b, key);

            if (valueA < valueB) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (valueA > valueB) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });
        setBranches(sortedBranches);
    };

    const maxBranches = plan === 'starter' ? 10 : 10;
    const branchesLeft = maxBranches - branches.length;

    return (
        <div className="p-8 bg-gray-900 text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Manage Branch</h1>
            
            <div className="mb-4">
                <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
                    <p className="text-lg">Branches Left: {branchesLeft} / {maxBranches}</p>
                    <div className="w-full bg-gray-700 rounded-full h-4 mt-2">
                        <div
                            className="bg-blue-500 h-4 rounded-full"
                            style={{ width: `${(branches.length / maxBranches) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <button
                onClick={() => navigate('/add-branch')}
                className={`bg-blue-500 text-white p-2 mb-4 rounded hover:bg-blue-600 transition duration-200 ${branchesLeft <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={branchesLeft <= 0}
            >
                Add New Branch
            </button>

            <div className="overflow-x-auto">
                <table className="w-full bg-gray-800 rounded-lg shadow-lg">
                    <thead>
                        <tr className="bg-gray-700">
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('name')}>
                                Name {sortConfig?.key === 'name' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} className='ml-2 inline'/> : <FontAwesomeIcon icon={faSortDown} className='ml-2 inline'/>)}
                            </th>
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('address.street')}>
                                Address {sortConfig?.key === 'address.street' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} className='ml-2 inline'/> : <FontAwesomeIcon icon={faSortDown} className='ml-2 inline'/>)}
                            </th>
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('contact.email')}>
                                Email {sortConfig?.key === 'contact.email' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} className='ml-2 inline'/> : <FontAwesomeIcon icon={faSortDown} className='ml-2 inline'/>)}
                            </th>
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('contact.phone')}>
                                Phone {sortConfig?.key === 'contact.phone' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} className='ml-2 inline'/> : <FontAwesomeIcon icon={faSortDown} className='ml-2 inline'/>)}
                            </th>
                            <th className="p-4 text-center cursor-pointer" onClick={() => handleSort('manager')}>
                                Manager {sortConfig?.key === 'manager' && (sortConfig.direction === 'ascending' ? <FontAwesomeIcon icon={faSortUp} className='ml-2 inline'/> : <FontAwesomeIcon icon={faSortDown} className='ml-2 inline'/>)}
                            </th>
                            <th className="p-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {branches.map(branch => (
                            <tr key={branch._id} className="border-b border-gray-700 hover:bg-gray-750">
                                <td className="p-4">{branch.name}</td>
                                <td className="p-4">{formatAddress(branch.address)}</td>
                                <td className="p-4">{branch.contact.email}</td>
                                <td className="p-4">{branch.contact.phone}</td>
                                <td className="p-4">{branch.manager}</td>
                                <td className="p-4 text-center">
                                    <button
                                        onClick={() => handleDelete(branch._id)}
                                        className="text-red-500 hover:text-red-700 transition duration-200"
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Branch;