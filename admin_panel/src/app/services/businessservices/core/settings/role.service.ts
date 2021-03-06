import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage";
import * as globalData from "../globals";

@Injectable()

export class RoleService{

    public API_ENDPOINT = globalData.api_endpoint;
    private loggedInUserList = new Array();

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ) { 
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData').toString());
    }

    /**
     * get all roles' details
     */
    public getRolesList() {
        
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
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
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
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
    public editRolesList(editId) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'edit-role/'+ editId,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * update role details
     */
    public updateRoleList(editId, role_name, role_status) {

        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        //let body = '';
        let body = new URLSearchParams;
        body.append('name', role_name);
        body.append('status', role_status);

        return this.http.post(this.API_ENDPOINT + 'update-role/'+ editId, body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * delete role
     */
    public deleteRole(deleteId) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'delete-role/' + deleteId,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * update role's status
     */
    public updateRoleStatus(id,statusId) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'status-role/' + id + '/' + statusId,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}