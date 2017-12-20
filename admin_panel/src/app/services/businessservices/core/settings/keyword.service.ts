import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions, URLSearchParams} from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage/dist/local-storage.service";

@Injectable()

export class KeywordService{
    public API_ENDPOINT = "http://localhost:8000/api/";
    private loggedInUserList;

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ){
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
    }

    /**
     * get all keywords' details
     */
    public getKeywordList() {
        
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'view-keyword',
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * add keyword details
     */
    public addKeywordList(english_name, sinhala_name, tamil_name) {
       
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams;
        body.append('en_name', english_name);
        body.append('si_name', sinhala_name);
        body.append('ta_name', tamil_name);

        return this.http.post(this.API_ENDPOINT + 'insert-keyword', body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * get keyword's details for update
     */
    public editKeywordList(id) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'edit-keyword/'+id,
            {
               headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * update keyword details
     */
    public updateKeywordList(id, english_name, sinhala_name, tamil_name) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams;
        body.append('en_name', english_name);
        body.append('si_name', sinhala_name);
        body.append('ta_name', tamil_name);
        return this.http.post(this.API_ENDPOINT + 'update-keyword/'+id, body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}