import axios from "axios";

const BaseUrl = "http://localhost:8000/api";

const token = localStorage.getItem("token");
console.log("TOKEN : ", token);

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
  "ngrok-skip-browser-warning":true
};

const authHeaders = () => {
  let userToken = localStorage.getItem("token");
  return { headers: { Authorization: userToken } };
};

const registerUser = (requestBody) => {
  return axios.post(`${BaseUrl}/auth/register`, requestBody);
};

const loginUser = (requestBody) => {
  return axios.post(`${BaseUrl}/auth/login`, requestBody);
};

const deletePost = (id) => {
  return axios.delete(`${BaseUrl}/admin/location/${id}`);
};

const deleteDetails =(id) => {
  return axios.delete(`${BaseUrl}/buses/${id}` , { headers: headers });
}

const updateDetails = (id, requestBody) => {
  return axios.put(`${BaseUrl}/buses/${id}`, requestBody, { headers: headers });
};

export { registerUser, loginUser, deletePost ,deleteDetails , updateDetails};
