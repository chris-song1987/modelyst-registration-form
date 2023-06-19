import axiosInst from "./config/axiosConfig";

export type SampleDataType = {
  user: string;
  sampleLabels: string;
  proposalNumber: string;
  innerDiameter: number;
  outerDiameter: number;
};

export const addSampleData = (data: SampleDataType) => {
  return axiosInst.post("/beta/add-sample-data", {
    ...data,
  });
};
