import axios from 'axios';

const API_KEY = "suCTvQWQwFR0MH7hyapNQzpR7MS7Ur4T";

export default axios.create({
    baseURL: "https://api.giphy.com/v1/",
    params: {api_key: API_KEY}  
})