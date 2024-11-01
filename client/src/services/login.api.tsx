import axios from 'axios';

const userLogin = async (email: string, password: string) => {
    console.log('Checking user existence:', email, password);
    try {
        const response = await axios.post('http://localhost:5000/api/login', {
            email: email,
            password: password,
        });
          
        console.log('User exists:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error checking user existence:', error);
        throw error;
    }
};

export default userLogin;