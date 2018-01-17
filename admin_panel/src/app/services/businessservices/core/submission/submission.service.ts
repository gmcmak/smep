import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage";

@Injectable()

export class SubmissionService{
    public API_ENDPOINT = "http://localhost:8000/api/";
    private loggedInUserList;

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
    }

    /**
    * add submission
    */
    public addSubmission(user_id, name, url, level, status) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams;
        body.append('user_id', user_id);
        body.append('name', name);
        body.append('url', url);
        body.append('level', level);
        body.append('status', status);
        return this.http.post(this.API_ENDPOINT + 'add-submission', body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * get submission data
    */
    public getSubmissionData(user_id) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        return this.http.get(this.API_ENDPOINT + 'view-submission/' + user_id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

}