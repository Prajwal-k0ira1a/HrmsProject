// import axios from "axios";
// import Cookies from "js-cookie";

// export const publicAPI = axios.create({
//   baseURL: "http://localhost:3000/api",
//     withCredentials: true, // Include credentials for CORS
// });

// export const privateAPI = axios.create({
//     baseURL: "http://localhost:3000/api",
//     withCredentials: true, // Include credentials for CORS
// });

// privateAPI.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("token");
//     if (token) {
//       config.headers.Authorization = Bearer ${token};
//     }
//     return config;
//   });

//   export { publicAPI, privateAPI };