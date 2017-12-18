import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage/dist/local-storage.service";

@Injectable()

export class AuthorizerService{
    public API_ENDPOINT = "http://localhost:8000/api/";
    private loggedInUserList;

    constructor(private http: Http, private localStorageService: LocalStorageService){}

    /**
    * get all authorizers list
    * @return authorizerList
    */
    public getAuthorizersList() {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'view-authorizers',
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}