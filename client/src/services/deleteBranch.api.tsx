import axios from 'axios';

const deleteBranch = async (id: string) => {
  try {
    const response = await axios.delete(`http://localhost:5000/api/deleteBranch/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default deleteBranch;