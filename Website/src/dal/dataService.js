import axios from 'axios';

const host_url = "https://tiltnpour.herokuapp.com"

export function getBreweryData() {
    return axios.get(host_url+'/api/breweries');
}

export function getGmapsApiKey() {
    return axios.get(host_url+'/api/gmapsapikey');
}

export default {
    getBreweryData
}