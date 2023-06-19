import { FormType } from "../App";
import axiosInst from "./config/axiosConfig";

export const addSampleData = (data: FormType) => {
  return axiosInst.post("/beta/add-sample-data", {
    ...data,
  });
};
