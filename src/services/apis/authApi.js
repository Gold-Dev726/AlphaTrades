import api from "./api";

export default class AuthAPI {
  getDetail() {
    return api.get("todos/1");
  }

  changePassword(formData) {
    return api.post("user/change-password", formData);
  }
}
