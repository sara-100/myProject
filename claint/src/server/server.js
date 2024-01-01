import axios from "axios";

axios.defaults.baseURL = 'http://localhost:3000';

export default {
  getItems: async (path, currentPage) => {
    try {
      const res = await axios.get(`/${path}?page=${currentPage}`);
      return res.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // אפשר לטפל בשגיאה כאן או להעבירה הלאה
    }
  },

  getItemsByCategory: async (path, category, area, currentPage) => {
    try {
      const res = await axios.get(`/${path}?category=${category}&city=${area}&page=${currentPage}`);
      return res.data;
    } catch (error) {
      console.error('Error fetching filtered data:', error);
      throw error; // אפשר לטפל בשגיאה כאן או להעבירה הלאה
    }
  },



  addProduct: async (path, name, city, address, phone, email, numPills, pricePerPills, remarks) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/${path}`,
        { name, city, address, phone, email, numPills, pricePerPills, remarks, },
        { headers: { Authorization: `Bearer ${token}`, }, }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      throw error; // אפשר לטפל בשגיאה כאן או להעבירה הלאה
    }
  },


  loginUser: async (path, email, password) => {
    try {
      const response = await axios.post(`/${path}`, { email, password })
      console.log(`jhu${response}`);
      return response.data;  
    } catch (err) {
      console.log(err);
    }
  },

  addUser: async (path, userName, email, password) => {
    try {
      await axios.post(`/${path}`, { userName, email, password });
    } catch (error) {
      console.error(error);
    }
  },

  getUser: async (path) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/${path}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      return response.data;
    } catch (error) {
      console.error(error);
      throw error; // אפשר לטפל בשגיאה כאן או להעבירה הלאה
    }
  },

  getUserPosts: async (path) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/${path}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching user products:', error);
      throw error;
    }
  },

  deletePost: async (path,card_id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`/${path}/${card_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error delete products:', error);
      throw error;
    }
  },

  addLike: async (path,productId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`/${path}/${productId}`,null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error add like:',error);
      throw error;
    }
  },

  getProduct: async (path,card_id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`/${path}/${card_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error:',error);
      throw error;
    }
  },

  editProduct: async (path,card_id,editedData) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`/${path}/${card_id}`,editedData,
        // { city, address, phone, email, numPills, pricePerPills, remarks, },
        { headers: { Authorization: `Bearer ${token}`, }, }
      );
      return response.data;
      return response.data;
    } catch (error) {
      console.error('Error:',error);
      throw error;
    }
  },



}