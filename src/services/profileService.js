import api from "./apis/api";
import {
  hydrateProfileDetails,
  dyHydrateProfile,
} from "./transformers/profileTransformer";

class ProfileService {
  fetchProfileDetails() {
    return api.profile.fetchProfileDetails().then(hydrateProfileDetails);
  }

  updateProfileDetails(data) {
    return api.profile
      .updateProfileDetails(dyHydrateProfile(data))
      .then(hydrateProfileDetails);
  }
}

export default new ProfileService();
