import Session from 'store2';
import { BASE_URL } from './Apiconfig';



class ApiHelper {

    static headers() {
        return {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }

    static GetToken() {
        return Session.session('userAccessToken');
    }

    static GetSessionToken() {
        return Session.session('session_token');
    }

    static getAnonymous(route, abortController) {
        return this.xhr(route, null, null, null, 'GET', abortController);
    }

    static getAuthenticated(route, params, abortController) {
        return this.xhr(route, params, ApiHelper.GetToken(), null, 'GET', abortController);
    }
    static getAuthenticatedData(route, params, abortController) {
        return this.xhr(route, params, null, null, 'GET', abortController);
    }

    static putAnonymous(route, params, abortController) {
        return this.xhr(route, params, null, null, 'PUT', abortController);
    }

    static putAuthenticated(route, params, abortController) {
        return this.xhr(route, params, ApiHelper.GetToken(), null, 'PUT', abortController);
    }

    static postAuthenticated(route, params, abortController) {
        return this.xhr(route, params, ApiHelper.GetToken(), null, 'POST', abortController);
    }

    static postAnonymous(route, params, abortController) {
        return this.xhr(route, params, null, null, 'POST', abortController);
    }
    static postAnonymousCheckVPN(route, params, abortController) {
        return this.xhr(route, params, null, null, 'GET', abortController);
    }

    static postAnonymousOTP(route, params, abortController) {
        return this.xhr(route, params, null, ApiHelper.GetSessionToken(), 'POST', abortController);
    }

    static deleteAnonymous(route, params, abortController) {
        return this.xhr(route, params, null, null, 'DELETE', abortController);
    }

    static deleteAuthenticated(route, params, abortController) {
        return this.xhr(route, params, ApiHelper.GetToken(), null, 'DELETE', abortController);
    }

    static async xhr(route, params, token = "", session_token = "", verb, abortController) {
        const host = BASE_URL;
        const url = host + route;
        let options = Object.assign({ method: verb }, params ? { body: JSON.stringify(params) } : null);
        if (abortController && abortController.signal) {
            options.signal = abortController.signal;
        }
        options.headers = ApiHelper.headers();
        if (token) {
            options.headers = {
                ...options.headers,
                'x-access-token':  ApiHelper.GetToken()
            }
        }
        if (session_token) {
            options.headers = {
                ...options.headers,
                'sessiontoken': session_token
            }
        }

        return fetch(url, options).then(resp => {
            if (resp.status === 401) {
                return resp.text().then(text => {
                    return text && JSON.parse(text);
                });
            }
            if (resp.status === 402) {
                return resp.text().then(text => {
                    return text && JSON.parse(text);
                });
            }
            if (resp.status === 500) {
                return resp.text().then(text => {
                    return text && JSON.parse(text);
                });
            }

            let json = resp.json();
            if (resp.ok) {
                return json;
            }
            return json.then(err => { throw err });
        });
    }
}

export default ApiHelper;