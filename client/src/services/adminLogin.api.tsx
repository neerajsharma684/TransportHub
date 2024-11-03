import axios from 'axios';

const adminLogin = async (email: string, password: string) => {
    console.log('Checking user existence:', email, password);
    try {
        const response = await axios.post('http://localhost:5000/api/adminLogin', {
            email: email,
            password: password,
        });
          
        console.log('Admin exists:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error;
    }
};

export default adminLogin;