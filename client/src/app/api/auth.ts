import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/auth";

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
  return response.data;
};

export const registerUser = async (name: string, email: string, password: string) => {
  const response = await axios.post(`${API_BASE_URL}/register`, { name, email, password });
  return response.data;
};