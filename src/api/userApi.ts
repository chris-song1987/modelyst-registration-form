import axiosInst from "./config/axiosConfig";

export const getUsers = () => {
  return axiosInst.get("/beta/get-users");
};
