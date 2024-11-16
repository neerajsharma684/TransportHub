import axios from "axios";

const createBranch = async(name:string, street:string, state:string, city:string, zip:string, phone:string, email:string, manager:string, createdBy:string) => {
    console.log('Creating Branch: ', name, street, state, city, zip, phone, email, manager, createdBy)

    try {
        const response = await axios.post("http://localhost:5000/api/addBranch", {
            name: name,
            street: street,
            state: state, 
            city: city, 
            zip: zip,
            phone: phone,
            email: email,
            manager: manager,
            createdBy: createdBy     
        });
        console.log('Branch created:', response.data);
        return response.data;
        
    } catch (error) {
        console.error('Error creating branch:', error);
        throw error;
    }

}

export default createBranch;