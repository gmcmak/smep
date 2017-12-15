import { Injectable } from "@angular/core";
import { LocalStorageService } from "angular-2-local-storage/dist/local-storage.service";
import { Http, Response, RequestOptions, Headers } from "@angular/http";

@Injectable()

export class CategoryService{
    public API_ENDPOINT = 'http://localhost:8000/api/';
    private loggedInUserList;
    constructor(private http: Http, private localStorageService: LocalStorageService){}

    /**
     * get all categories' details
     */
    public getCategoriesList() {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'view-category',
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}