import axios from "axios";
import authHeader from "./auth-header";

const API_URL =
  process.env.VUE_APP_API_URL !== undefined
    ? process.env.VUE_APP_API_URL
    : "//pepa.yebalabs.com/";

class SettingsService {
  //   manage countries
  async createCountry(formdata) {
    const res = await axios.post(
      `${API_URL}admin/locations/country`,
      {
        name: formdata.name,
        active: formdata.active,
        country_code: formdata.country_code,
      },
      { headers: authHeader() }
    );
    return res;
  }
  async getCountries() {
    const res = await axios.get(`${API_URL}admin/locations/countries`, {
      headers: authHeader(),
    });
    return res;
  }
  async updateStatus(formdata, id) {
    const res = await axios.put(
      `${API_URL}admin/locations/country/${id}`,
      {
        active: formdata.active,
      },
      {
        headers: authHeader(),
      },
      {
        errorHandle: false,
      }
    );
    return res;
  }
  //   manage provinces
  async createProvince(formdata) {
    const res = await axios.post(
      `${API_URL}admin/locations/province`,
      {
        name: formdata.name,
        active: formdata.active,
        province_id: formdata.province_id,
      },
      { headers: authHeader() }
    );
    return res;
  }
  async getProvinces() {
    const res = await axios.get(`${API_URL}admin/locations/provinces`, {
      headers: authHeader(),
    });
    return res;
  }
  async updateProvinceStatus(formdata, id) {
    const res = await axios.put(
      `${API_URL}admin/locations/province/${id}`,
      {
        active: formdata.active,
      },
      {
        headers: authHeader(),
      },
      {
        errorHandle: false,
      }
    );
    return res;
  }
}

export default new SettingsService();
