import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage/dist/local-storage.service";

@Injectable()

export class ConsumerService{
    public API_ENDPOINT = "http://localhost:8000/api/";
    private loggedInUserList;

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ){
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData')); 
    }

    /**
     * get all consumer data list
     * @return consumerlist
     */
    public getConsumerList() {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'get-consumer',
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * add consumer details
     */
    public addConsumer(caName, caWebUrl, permission) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams;
        body.append('modules', permission);
        return this.http.post(this.API_ENDPOINT + 'insert-consumer', body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}