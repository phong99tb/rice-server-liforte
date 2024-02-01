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

  getDeposit: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/listDeposit`);
      return response.data;
    } catch (error) {
      console.error('Error fetching deposit:', error);
      throw error; // Rethrow lỗi để cho phép xử lý ở component gọi API
    }
  },

  addDeposit: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/addDeposit`, data, {
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

  updateDeposit: async (data) => {
    try {
      const response = await axios.put(`${BASE_URL}/updateDeposit`, data, {
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

  deleteDeposit: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/deleteDeposit/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error; // Rethrow lỗi để cho phép xử lý ở component gọi API
    }
  },

  getSpend: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/listSpend`);
      return response.data;
    } catch (error) {
      console.error('Error fetching deposit:', error);
      throw error; // Rethrow lỗi để cho phép xử lý ở component gọi API
    }
  },

  addSpend: async (data) => {
    try {
      const response = await axios.post(`${BASE_URL}/addSpend`, data, {
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

  updateSpend: async (data) => {
    try {
      const response = await axios.put(`${BASE_URL}/updateSpend`, data, {
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

  deleteSpend: async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/deleteSpend/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error; // Rethrow lỗi để cho phép xử lý ở component gọi API
    }
  },
};

export default api;