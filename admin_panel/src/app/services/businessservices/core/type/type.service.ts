import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams } from "@angular/http";
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

    /**
    * insert type data
    */
    public insertTypeData(name, description) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams;
        body.append('name', name);
        body.append('description', description);
        return this.http.post(this.API_ENDPOINT + 'insert-type', body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * edit type data
    */
    public editTypeData(id) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        return this.http.get(this.API_ENDPOINT + 'edit-type/' +id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * update type data
    */
    public updateTypeData(id, name, description) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams;
        body.append('name', name);
        body.append('description', description);
        return this.http.post(this.API_ENDPOINT + 'update-type/' +id, body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}