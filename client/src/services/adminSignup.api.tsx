import axios from "axios";

const createUser = async (name: string, email: string, password: string, role: string, plan: string, addons: String[], createdBy: string) => {
    console.log('Creating admin:', name, email, password, role, plan, addons);
    try {
        const response = await axios.post('http://localhost:5000/api/adminSignup', {
            name: name,
            email: email,
            password: password,
            role: role,
            plan: plan,
            addons: addons,
            createdBy: createdBy
        });
        
        console.log('Admin created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export default createUser;