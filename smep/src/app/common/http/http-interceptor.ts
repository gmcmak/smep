import { Injectable } from '@angular/core';
import {
    Http,
    ConnectionBackend,
    RequestOptions,
    RequestOptionsArgs,
    Request,
    Response,
    Headers
} from '@angular/http';

import { Observable } from 'rxjs/Rx';

@Injectable()
export class HttpInterceptor extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }


    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        console.log('request...');
        return super.request(url, options).catch(this.catchErrors()); 
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        console.log('get...');
        return super.get(url, options).catch(this.catchErrors()); 
    }

    private catchErrors() {      
        return (response: Response) => {
        console.log('catchErrors.. + response.status : ' + response.status);
        if (response.status === 418) {
                // do some stuff here
        }
        return Observable.throw(response);
        };
    }
}