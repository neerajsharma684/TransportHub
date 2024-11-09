import axios from 'axios';

const deleteUser = async (email: string) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/deleteUser/${email}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default deleteUser;