import axios from 'axios'


export const api = axios.create({
    baseURL: 'https://www.thesportsdb.com/api/v1/json/3'
});
