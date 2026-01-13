import axios from "axios";

export const registerUser = (data) =>
  axios.post("http://localhost:3000/users/register", data);

export const loginUser = (data) =>
  axios.post("http://localhost:3000/users/login", data);

export const getAllUsers = () =>
  axios.get("http://localhost:3000/users");
