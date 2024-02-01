import axios from 'axios';
// const BASE_URL = 'https://rice-server-be.onrender.com';
const BASE_URL = 'http://localhost:8000';

const api = {
  getUsers: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/listUser`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; // Rethrow lỗi để cho phép xử lý ở component gọi API
    }
  },

  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/deleteUser/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error; // Rethrow lỗi để cho phép xử lý ở component gọi API
    }
  },

  addUser: async (user) => {
    try {
      const response = await axios.post(`${BASE_URL}/addUser`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error adding user:', error);
      throw error;
    }
  },

  updateUser: async (user) => {
    try {
      const response = await axios.put(`${BASE_URL}/updateUser`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  },
};

export default api;