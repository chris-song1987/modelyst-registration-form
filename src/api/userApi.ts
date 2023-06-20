import { UserType } from "../User";
import axiosInst from "./config/axiosConfig";

export const getUsers = async () => {
  const response = await axiosInst.get<UserType[]>("/users");
  return response.data;
};
