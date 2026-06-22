import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "https://w3certify-api.onrender.com";
const API_URL = `${BASE_URL}/auth`;

export const login = (data) => axios.post(`${API_URL}/login`, data);

export const signup = (data) => axios.post(`${API_URL}/signup`, data);
