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
}