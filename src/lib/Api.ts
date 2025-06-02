import axios from "axios";

const Api = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1",
});

export default Api;
