import axios from "axios";

const axiosInst = axios.create({
  baseURL: "http://localhost:3000/",
});

axiosInst.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("interceptor:", error.response);
    return error;
  }
);

export default axiosInst;
