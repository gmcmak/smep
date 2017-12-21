import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage/dist/local-storage.service";

@Injectable()

export class ModuleService{
    public API_ENDPOINT = "http://localhost:8000/api/";
    private loggedInUserList;

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ){
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData')); 
    }

    /**
     * get modules data list
     * @return modulelist
     */
    public getModulesList() {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'view-module',
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * delete module
     */
    public deleteModule(deleteId) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'delete-module/'+deleteId,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * add module
     */
    public addModule(module_name) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams;
        body.append('moduleName', module_name)
        return this.http.post(this.API_ENDPOINT + 'add-module', body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * get modules data for edit
     * @return moduleList
     */
    public editModulesList(id) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'get-module/'+id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * update module
     */
    public updateModule(id, module_name) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams;
        body.append('moduleName', module_name)
        return this.http.post(this.API_ENDPOINT + 'update-module/'+id, body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}