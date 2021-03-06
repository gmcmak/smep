import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions } from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage/dist/local-storage.service";
import { Router } from "@angular/router";
import * as globalData from "../globals";

@Injectable()

export class CountryService{
    public API_ENDPOINT = globalData.api_endpoint;
    private loggedInUserList = new Array();

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService,
        private router: Router
    ){
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData').toString()); 
    }

    /**
    * get all country list
    * @return countryList
    */
    public getCountryList() {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'get-country',
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}