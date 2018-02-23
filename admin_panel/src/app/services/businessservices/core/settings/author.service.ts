import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions } from "@angular/http";
import { Headers } from '@angular/http';
import { LocalStorageStore } from '../../../../services/storage/local-storage.service';
import { URLSearchParams } from '@angular/http';
import * as globalData from "../globals";

@Injectable()

export class AuthorService{
    public API_ENDPOINT = globalData.api_endpoint;
    private loggedInUserList = new Array();
    constructor(
        private http: Http,
        private localStorageService: LocalStorageStore
    ) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData').toString());
     }

    /**
     * get all authors details
     */
    public getAuthorsList(){
       
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
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
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
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

    /**
     * get author's detail for edit
     */
    public editAuthors(editId) {
       
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'edit-author/'+ editId,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * update author data
     */
    updateAuthor(editId, english_name, sinhala_name, tamil_name) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        //let body = '';
        let body = new URLSearchParams();
        body.append('en_name', english_name);
        body.append('si_name', sinhala_name);
        body.append('ta_name', tamil_name);
        return this.http.post(this.API_ENDPOINT + 'update-author/'+ editId, body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * delete author
     */
    public deleteAuthor(deleteId) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'delete-author/' + deleteId,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}