import axios from 'axios';

const host_url = "https://tiltnpour.herokuapp.com"
// Testing url
//const host_url ="http://localhost:3000";

export function getBreweryData() {
    return axios.get(host_url+'/api/breweries');
}

export function getGmapsApiKey() {
    return axios.get(host_url+'/api/gmapsapikey');
}

export function getAllEvents(){
    return axios.get(host_url+"/api/events");
}


export function getHostUrl(){
    return host_url;
}

export function postNewMessage(message){
    return axios.post(host_url+"/api/message/new",message);
}

export function getArticleSummaries(){
    return axios.get(host_url+"/blog/get");
}

export function getArticleHtml(article){
    return axios.get(host_url+"/blog/get/"+article);
}

export default {
    getBreweryData
}