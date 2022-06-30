import api from "./api";

export default class ProfileAPI {
  fetchProfileDetails() {
    return api.get(`/user/user-profile`);
  }

  updateProfileDetails(data) {
    return api.put(`/user/update-profile`, data);
  }
}
