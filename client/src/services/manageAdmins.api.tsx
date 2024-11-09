import axios from 'axios';

const fetchUsers = async (createdBy: string) => {
    console.log('Checking :', createdBy);
    try {
        const response = await axios.get(`http://localhost:5000/api/fetchUser?createdBy=${createdBy}`);
          
        console.log('User exists:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error;
    }
};

export default fetchUsers;