import axios from "axios";
import { toast } from "react-toastify";

export const BASE_URL = "http://localhost:8080";

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    // 'token': localStorage.getItem("LOGIN_USER")
  },
};

export const fetchFromAPI = async (url) => {
  const { data } = await axios.get(`${BASE_URL}/${url}`, options);

  return data;
};

// thêm interceptor
// B1: tạo axiosInstance
export const axiosInstance = axios.create({
  baseURL: `${BASE_URL}`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // check flag requireAuth
    // nếu requireAuth = true => truyền token vào header request
    // ngược lại => bình thường (ko cần truyền token)
    if (config.requireAuth) {
      // lấy accessToken từ localStorage
      let accessToken = localStorage.getItem("LOGIN_USER");
      if (accessToken) {
        config.headers["token"] = accessToken;
      }
      return config;
    }
  },
  () => {}
);

// define function call API get list video từ BE
export const getVideosAPI = async () => {
  try {
    const { data } = await axios.get(`${BASE_URL}/video/get-videos`);
    return data;
  } catch (error) {
    console.log("error: ", error);
  }
};

// define function call API get list type video từ BE
export const getTypesAPI = async () => {
  try {
    const { data } = await axiosInstance.get(`${BASE_URL}/video/get-types`, {
      requireAuth: true,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

// define function call API get list video by type id from BE
export const getVideosTypeIdAPI = async (typeID) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/video/get-videos/${typeID}`);
    return data;
  } catch (error) {
    console.log("error api get list video by type_id");
  }
};

export const getVideoById = async (videoId) => {
  try {
    let { data } = await axios.get(`${BASE_URL}/video/get-video/${videoId}`);
    return data;
  } catch (error) {
    console.log("error API get video by id");
  }
};

export const signUpAPI = async (payload) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/sign-up`, payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const loginAPI = async (payload) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/login`, payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const loginFacebookAPI = async (payload) => {
  try {
    // payload: email, name, id
    const { data } = await axios.post(`${BASE_URL}/auth/login-facebook`, payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassAPI = async (payload) => {
  try {
    // payload: email
    let { data } = await axios.post(`${BASE_URL}/auth/forgot-password`, payload);
    return data;
  } catch (error) {
    throw error;
  }
};

export const changePassAPI = async (payload) => {
  try {
    // payload: email, code, newPass
    let { data } = await axios.post(`${BASE_URL}/auth/change-password`, payload);
    return data;
  } catch (error) {
    throw error;
  }
};
