import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage";

@Injectable()

export class ExploreService{
    public API_ENDPOINT = 'http://localhost:8000/api/';
    private loggedInUserList;
    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ) { this.loggedInUserList = JSON.parse(this.localStorageService.get('userData')); }

    /**
     * get all categories' details
     */
    public getExploresList() {
        
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'get-explore',
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * insert explore details
     */
    public addExploresList(english_name, sinhala_name, tamil_name, explore_status, deleted) {
       
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams;
        body.append('en_tag', english_name);
        body.append('si_tag', sinhala_name);
        body.append('ta_tag', tamil_name);
        body.append('status', explore_status);
        body.append('deleted', deleted);
        return this.http.post(this.API_ENDPOINT + 'add-explore', body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}