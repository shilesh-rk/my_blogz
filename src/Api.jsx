import axios from "axios";

const api = axios.create({
	baseURL: "https://my-blogz-backend.onrender.com/api/v1",
});

export default api;
