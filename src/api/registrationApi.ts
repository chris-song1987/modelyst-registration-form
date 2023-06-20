import axiosInst from "./config/axiosConfig";

export type SampleDataType = {
  user: number;
  label: string;
  proposals: string;
  innerDiameter: number;
  outerDiameter: number;
};

export const addSampleData = (data: SampleDataType) => {
  return axiosInst.post("/register", {
    ...data,
  });
};
