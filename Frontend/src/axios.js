import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/", // Replace with your API base URL
});

instance.interceptors.request.use(
  (config) => {
    const token=localStorage.getItem("token");    
    console.log(token,'helloo there token here');
    
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Add token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
