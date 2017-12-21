import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage/dist/local-storage.service";

@Injectable()

export class SubjectService{
    public API_ENDPOINT = "http://localhost:8000/api/";
    private loggedInUserList;

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ){
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData')); 
    }

    /**
    * get all subjects list
    * @return subjectlist
    */
    public getSubjectsList() {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'view-subject-area',
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}