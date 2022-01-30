import {getAuth} from '@firebase/auth'
import {explodeQueryParams} from "../utils";
import axios from "axios";

export default class APIService {
    base = ""

    constructor(base) {
        console.log('APIService', base, process.env.REACT_APP_API_SERVICE)
        this.base = new URL(base, process.env.REACT_APP_API_SERVICE).href
    }

    async get(path, query) {
        try {
            console.log('fetching ', this.base, path, new URL(path, this.base).href, explodeQueryParams(query))
            const url = new URL(path, this.base).href;
            console.log(url + explodeQueryParams(query))
            return axios.get(url + explodeQueryParams(query), {
                headers: {
                    'X-Authorization-Firebase': getAuth().currentUser ?  await getAuth().currentUser.getIdToken() : null
                }
            })
        } finally {
            console.log('did call')
        }
    }

    async post(path, data, query) {
        const url = new URL(path, this.base).href;
        return axios.post(url + explodeQueryParams(query), data, {
            headers: {
                'X-Authorization-Firebase': getAuth().currentUser ?  await getAuth().currentUser.getIdToken() : null
            }
        })
    }

    async put(path, data, query) {
        const url = new URL(path, this.base).href;
        return axios.put(url + explodeQueryParams(query), data, {
            headers: {
                'X-Authorization-Firebase': getAuth().currentUser ?  await getAuth().currentUser.getIdToken() : null
            }
        })
    }

    async patch(path, data, query) {
        const url = new URL(path, this.base).href;
        return axios.patch(url + explodeQueryParams(query), data, {
            headers: {
                'X-Authorization-Firebase': getAuth().currentUser ?  await getAuth().currentUser.getIdToken() : null
            }
        })
    }

    async delete(path, query) {
        const url = new URL(path, this.base).href;
        return axios.delete(url + explodeQueryParams(query), {
            headers: {
                'X-Authorization-Firebase': getAuth().currentUser ?  await getAuth().currentUser.getIdToken() : null
            }
        })
    }
}