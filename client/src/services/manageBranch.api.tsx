import axios from 'axios';

const fetchBranch = async (createdBy: string) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/fetchBranch?createdBy=${createdBy}`);
        return response.data;
    } catch (error) {
        console.error('Error checking Branch existence:', error);
        throw error;
    }
};

export default fetchBranch;