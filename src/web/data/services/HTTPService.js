/**
 * Created by dannyyassine on 2017-03-05.
 */

export class HTTPService {

    constructor() {
        this.method = 'GET';
        this.url = "";
        this.body = new Map();
        this.headers = new Map();
        this.httpRequest = new XMLHttpRequest();
    }

    URL(url) {
        this.url = url;
        return this;
    }

    addParameter(key, value) {
        this.body.set(key, value);
        return self;
    }

    addHeader(key, value) {
        this.headers.set(key, value);
        return self;
    }

    GET() {
        this.method = 'GET';
        return this;
    }

    POST() {
        this.method = 'POST';
        return this;
    }

    DELETE() {
        this.method = 'DELETE';
        return this;
    }

    PUT() {
        this.method = 'PUT';
        return this;
    }

    execute(success, error) {
        this.httpRequest.onreadystatechange = function() {
            if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
                var json = JSON.parse(this.responseText);
                success(json);
            }
            if (this.readyState == XMLHttpRequest.DONE && this.status != 200) {
                var json = JSON.parse(this.responseText);
                error(json);
            }
        };
        let json = null;
        var index = 0;
        if (this.method !== 'POST' || this.method !== 'PUT') {
            json = {};
            this.body.forEach((value, key) => {
                json[key] = value;
            });
        } else {
            this.body.forEach((value, key) => {
                if (index == 0) {
                    this.url += `?${key}=${value}`;
                } else {
                    this.url += `&${key}=${value}`;
                }
                index += 1;
            });
        }
        this.httpRequest.open(this.method, this.url, true);
        this.headers.forEach((value, key) => {
            this.httpRequest.setRequestHeader(key, value);
        });
        if (json) {
            console.log(json);
            this.httpRequest.send(JSON.stringify(json));
        } else {
            this.httpRequest.send();
        }
    }

}