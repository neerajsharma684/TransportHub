import axios from "axios";

const createUser = async (email: string, password: string, createdBy: string) => {
    console.log('Creating user:', email, password, createdBy);
    try {
        const response = await axios.post('http://localhost:5000/api/signup', {
            email: email,
            password: password,
            createdBy: createdBy
        });
        
        console.log('User created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export default createUser;