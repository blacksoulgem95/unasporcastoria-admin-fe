import {getAuth} from '@firebase/auth'
import {explodeQueryParams} from "../utils/utils";
import axios from "axios";

export default class APIService {
    base = ""

    constructor(base) {
        console.log('APIService', base, process.env.REACT_APP_API_SERVICE)
        this.base = new URL(base, process.env.REACT_APP_API_SERVICE).href
    }

    async get(path, query) {
        const url = new URL(this.base).href + '/' + path;
        return axios.get(url + explodeQueryParams(query), {
            headers: {
                'X-Authorization-Firebase': getAuth().currentUser ? await getAuth().currentUser.getIdToken() : null
            }
        })
    }

    async post(path, data, query) {
        const url = new URL(this.base).href + '/' + path;
        return axios.post(url + explodeQueryParams(query), data, {
            headers: {
                'X-Authorization-Firebase': getAuth().currentUser ? await getAuth().currentUser.getIdToken() : null
            }
        })
    }

    async put(path, data, query) {
        const url = new URL(this.base).href + '/' + path;
        return axios.put(url + explodeQueryParams(query), data, {
            headers: {
                'X-Authorization-Firebase': getAuth().currentUser ? await getAuth().currentUser.getIdToken() : null
            }
        })
    }

    async patch(path, data, query) {
        const url = new URL(this.base).href + '/' + path;
        return axios.patch(url + explodeQueryParams(query), data, {
            headers: {
                'X-Authorization-Firebase': getAuth().currentUser ? await getAuth().currentUser.getIdToken() : null
            }
        })
    }

    async delete(path, query) {
        const url = new URL(this.base).href + '/' + path;
        return axios.delete(url + explodeQueryParams(query), {
            headers: {
                'X-Authorization-Firebase': getAuth().currentUser ? await getAuth().currentUser.getIdToken() : null
            }
        })
    }
}