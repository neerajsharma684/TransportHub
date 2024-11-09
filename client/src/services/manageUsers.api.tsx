import axios from 'axios';

const fetchUsers = async (createdBy: string) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/fetchUser?createdBy=${createdBy}`);
        return response.data;
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error;
    }
};

export default fetchUsers;