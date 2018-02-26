import { Injectable } from "@angular/core";
import * as globalData from "../globals";
import { Http, Headers, Response } from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage";

@Injectable()

export class AdvertisementService{
    public API_ENDPOINT = globalData.api_endpoint;
    private loggedInUserList = new Array();

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ){
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData').toString());
    }

    /**
    * get advertisement data
    */
    public getAdvertisementData() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'get-advertisement',
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

}