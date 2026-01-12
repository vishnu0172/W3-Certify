import axios from "axios";

const API_URL = "http://localhost:5000/auth";

export const login = (data) => axios.post(`${API_URL}/login`, data);

export const signup = (data) => axios.post(`${API_URL}/signup`, data);
