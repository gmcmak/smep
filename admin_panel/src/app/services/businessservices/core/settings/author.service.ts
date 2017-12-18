import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions, Headers } from "@angular/http";
import { LocalStorageStore } from "../../../storage/local-storage.service";

@Injectable()

export class AuthorService{
    public API_ENDPOINT = "http://localhost:8000/api/";
    private loggedInUserList;
    constructor(private http: Http, private localStorageService: LocalStorageStore) { }

    /**
     * get all authors details
     */
    public getAuthorsList(){
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'view-author',
            {
                headers: headers
            })
            .map((response: Response) => response.json()); 
    }

    /**
     * add author data
     */
    addAuthor(english_name, sinhala_name, tamil_name) {
        let headers = new Headers();
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams();
        body.append('en_name', english_name);
        body.append('si_name', sinhala_name);
        body.append('ta_name', tamil_name);

        return this.http.post(this.API_ENDPOINT + 'insert-author', body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}