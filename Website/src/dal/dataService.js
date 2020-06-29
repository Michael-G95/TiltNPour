import axios from 'axios';

const host_url = "http://192.168.0.243:3000"//"http://localhost:3000";

export function getBreweryData() {
    return axios.get(host_url+'/api/breweries');
}

export function getGmapsApiKey() {
    return axios.get(host_url+'/api/gmapsapikey');
}

export default {
    getBreweryData
}