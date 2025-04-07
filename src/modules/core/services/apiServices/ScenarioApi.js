import ApiService from "./api";

class ScenarioApi {
  /**
   * @param {ApiService} ApiService
   */

  constructor(ApiService) {
    this.api = ApiService;
  }

  async getScenarios() {
    return this.api.get("/scenarios");
  }

  async getScenarioById(id) {
    return this.api.get(`/scenarios/${id}`);
  }
  async createScenario(data) {
    return this.api.post("/scenarios", data);
  }
  async updateScenario(id, data) {
    return this.api.put(`/scenarios/${id}`, data);
  }

  async deleteScenario(id) {
    return this.api.delete(`/scenarios/${id}`);
  }
}


// Create an instance of ApiService with the base URL
const apiService = new ApiService("https://api.example.com"); // Replace with your actual API URL
// Create an instance of ScenarioApi with the ApiService instance
const scenarioApi = new ScenarioApi(apiService);
// Export the scenarioApi instance for use in other modules
export default scenarioApi;