import axios from "axios";

class ApiService {
  constructor(baseUrl) {
    this.axiosInstance = axios.create({
      baseURL: baseUrl,
      timeout: 10000,
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle error globally
        console.error("API Error:", error);
        return Promise.reject(error);
      }
    );
  }

  async get(endpoint) {
    console.log("GET", endpoint);
    const response = await this.axiosInstance.get(endpoint);
    return response.data;
  }

  async post(endpoint, data) {
    console.log("POST", endpoint, data);
    const response = await this.axiosInstance.post(endpoint, data);
    return response.data;
  }

  async put(endpoint, data) {
    console.log("PUT", endpoint, data);
    const response = await this.axiosInstance.put(endpoint, data);
    return response.data;
  }

  async delete(endpoint) {
    console.log("DELETE", endpoint);
    const response = await this.axiosInstance.delete(endpoint);
    return response.data;
  }

  async patch(endpoint, data) {
    console.log("PATCH", endpoint, data);
    const response = await this.axiosInstance.patch(endpoint, data);
    return response.data;
  }
}

export default ApiService;
