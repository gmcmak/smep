import { Injectable } from "@angular/core";
import { Http, Headers, Response } from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage";

@Injectable()

export class TypeService{
    public API_ENDPOINT = "http://localhost:8000/api/";
    private loggedInUserList;

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
    }

    /**
    * get type data
    */
    public getTypeData(){

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        return this.http.get(this.API_ENDPOINT + 'get-type',
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}