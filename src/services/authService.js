import api from "./apis/api";
class AuthService {
  getDetail() {
    return api.auth.getDetail();
  }

  changePassword(formData) {
    return api.auth.changePassword(formData);
  }
}

export default new AuthService();
