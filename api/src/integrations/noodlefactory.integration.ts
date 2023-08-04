import { config } from "../config";
import BaseIntegration from "./base.integration";
import axios from "axios";

class NoodleFactoryIntegration extends BaseIntegration {
  baseUrl: string = config.integrations.noodlefactory.baseUrl;

  async fetchData(endpoint: string) {
    try {
      const response = await axios.get(`${this.baseUrl}${endpoint}`);
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }

  async postData(endpoint: string, data: any) {
    try {
      const response = await axios.patch(
        `${this.baseUrl}${endpoint}`,
        data
      );
      console.log(response);
      return response.data;
    } catch (error) {
      throw new Error(`Error fetching data: ${error.message}`);
    }
  }

  async getProjects() {
    const data = await this.fetchData("/locales/projects");
    return data.data.projects;
  }

  async getLanguages() {
    const data = await this.fetchData("/locales/languages");
    return data.data.languages;
  }

  async getTerms() {
    const data = await this.fetchData("/locales/terms");
    return data.data.terms;
  }

  async getStats() {
    const data = await this.fetchData("/locales/stats");
    return data.data.stats;
  }

  async getTranslation(language_code: string) {
    const data = await this.fetchData(`/locales/${language_code}`);
    return data.data;
  }

  async updateTranslation(language_code: string, translations: any) {
    const data = await this.postData(
      `/locales/${language_code}`,
      translations
    );
    return data.data;
  }
}

export default new NoodleFactoryIntegration();
