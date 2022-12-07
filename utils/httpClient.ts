import axios from "axios";

const httpClient = axios.create({
  baseURL: process.env.BACKEND_API_URL,//"https://dummyjson.com/",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  
  }
});
console.log(process.env.BACKEND_API_URL);
export default httpClient;
