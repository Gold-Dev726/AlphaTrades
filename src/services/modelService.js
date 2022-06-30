import api from "./apis/api";
import storage from "./storage";
import { deHydrateGetModels,deHydratePurchaseModel,deHydrateGetSubscribedModel } from "./transformers/modelTransformer";

const USERID = "USERID";

class ModelService {

  getAllModels(data) {
    return api.model.getModels(deHydrateGetModels(data));
  }
  getSubscribedModels(data) {
    return api.model.getSubscribedModels(deHydrateGetSubscribedModel(data));
  }


  purcahseModel(data) {
    console.log("ModelService purcahseModel - ",data);
    return api.model.purchaseModel(deHydratePurchaseModel(data));
  }

  
}
export default new ModelService();
