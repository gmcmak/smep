import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage";

@Injectable()

export class RoleService{

    public API_ENDPOINT = "http://localhost:8000/api/";
    private loggedInUserList;

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ) { 
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
    }

    /**
     * get all roles' details
     */
    public getRolesList() {
        
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'view-role',
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * add role details
     */
    public addRoleList(role_name, role_status) {
        
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams;
        body.append('name', role_name);
        body.append('status', role_status);

        return this.http.post(this.API_ENDPOINT + 'insert-role', body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * get role's details for update
     */
    public editRolesList(id) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'edit-role/'+id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}