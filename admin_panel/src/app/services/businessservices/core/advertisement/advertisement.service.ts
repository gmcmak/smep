import { Injectable } from "@angular/core";
import * as globalData from "../globals";
import { Http, Headers, Response, URLSearchParams } from "@angular/http";
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

    /**
    * change status of advertisement
    */
    public changeAdvertisementStatus(id,status) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'advertisement-status/'+ id + '/' + status,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * delete advertisement
    */
    public deleteAdvertisement(id) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'advertisement-delete/' + id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * add advertisement
    */
    public addAdvertisement(title, description, url, video_url, freeform_keyword, status, type, keyword, category, explore) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = new URLSearchParams;
        body.append('title', title);
        body.append('description', description);
        body.append('url', url);
        body.append('video_url', video_url);
        body.append('freeform_keyword', freeform_keyword);
        body.append('status', status);
        body.append('type', type);
        body.append('keyword', keyword);
        body.append('category', category);
        body.append('explore', explore);
        return this.http.post(this.API_ENDPOINT + 'add-advertisement', body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * get advertisement data for edit
    */
    public editAdvertisementData(id) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'edit-advertisement/' +id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
   * update advertisement
   */
    public updateAdvertisement(id, title, description, url, video_url, freeform_keyword, status, type, keyword, category, explore) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = new URLSearchParams;
        body.append('title', title);
        body.append('description', description);
        body.append('url', url);
        body.append('video_url', video_url);
        body.append('freeform_keyword', freeform_keyword);
        body.append('status', status);
        body.append('type', type);
        body.append('keyword', keyword);
        body.append('category', category);
        body.append('explore', explore);
        return this.http.post(this.API_ENDPOINT + 'update-advertisement/' +id , body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

}