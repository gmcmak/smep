import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage/dist/local-storage.service";

@Injectable()

export class InstituteService{
    public API_ENDPOINT = "http://localhost:8000/api/";
    private loggedInUserList;

    constructor(private http: Http, private localStorageService: LocalStorageService){}

    /**
     * get all institutes list
     * @return instituteList
     */
    public getInstitutesList() {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'view-institute',
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}