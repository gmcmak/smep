import { Injectable } from "@angular/core";
import { LocalStorageService } from "angular-2-local-storage/dist/local-storage.service";
import { Http, Response, RequestOptions, Headers, URLSearchParams } from "@angular/http";
import * as globalData from "../globals";

@Injectable()

export class CategoryService{
    public API_ENDPOINT = globalData.api_endpoint;
    private loggedInUserList = new Array();
    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ){
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData').toString());
    }

    /**
     * get all categories' details
     */
    public getCategoriesList() {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'view-category',
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * add category data
     */
    public addCategory(english_name, sinhala_name, tamil_name, category_status) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        //let body = '';
        let body = new URLSearchParams();
        body.append('en_name', english_name);
        body.append('si_name', sinhala_name);
        body.append('ta_name', tamil_name);
        body.append('status', category_status);
        return this.http.post(this.API_ENDPOINT + 'insert-category', body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * get category details for update
     */
    public editCategoriesList(editId) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'edit-category/'+ editId,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * update category data
     */
    public updateCategory(editId, english_name, sinhala_name, tamil_name, category_status) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        //let body = '';
        let body = new URLSearchParams();
        body.append('en_name', english_name);
        body.append('si_name', sinhala_name);
        body.append('ta_name', tamil_name);
        body.append('status', category_status);
        return this.http.post(this.API_ENDPOINT + 'update-category/'+ editId, body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * delete category
     */
    public deleteCategory(deleteId) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'delete-category/' + deleteId,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * update category status
     */
    public updateCategoryStatus(id,statusId) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'status-category/' + id + '/' + statusId,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}