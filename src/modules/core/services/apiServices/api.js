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
    const response = await this.api.get(endpoint);
    return response.data;
  }

  async post(endpoint, data) {
    const response = await this.api.post(endpoint, data);
    return response.data;
  }

  async put(endpoint, data) {
    const response = await this.api.put(endpoint, data);
    return response.data;
  }

  async delete(endpoint) {
    const response = await this.api.delete(endpoint);
    return response.data;
  }

  async patch(endpoint, data) {
    const response = await this.api.patch(endpoint, data);
    return response.data;
  }
}

export default ApiService;
