import api from "./apis/api";
import storage from "./storage";
import { deHydratePerformance } from "./transformers/performanceTransformer";

const USERID = "USERID";

class PerformanceService {
  getPerformance(data) {
    return api.performance.getPerformances(deHydratePerformance(data));
  }
}

export default new PerformanceService();
