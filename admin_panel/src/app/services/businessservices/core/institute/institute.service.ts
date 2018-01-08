import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
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

    /**
     * add institute data
     */
    addInstitute(instName, regNo, dateOfReg, adrz, mobileNum, instEmail, instStatus, deleted, user_fullName, user_nameWithInitials, user_email, user_nic, user_mobile, user_designation, user_gender, user_dob, user_status, user_password1, user_password2) {
        let headers = new Headers();
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams();
        body.append('name', instName);
        body.append('registration_number', regNo);
        body.append('registered_date', dateOfReg);
        body.append('contact_number', mobileNum);
        body.append('email', instEmail);
        body.append('address', adrz);
        body.append('status', instStatus);
        body.append('deleted', deleted);
        body.append('user_name', user_fullName);
        body.append('user_email', user_email);
        body.append('user_password', user_password2);
        body.append('user_c_password', user_password2);
        body.append('user_status', user_status);
        body.append('user_name_with_initials', user_nameWithInitials);
        body.append('user_gender', user_gender);
        body.append('user_nic', user_nic);
        body.append('user_mobile', user_mobile);
        body.append('user_designation', user_designation);
        body.append('user_birthday', user_dob);
    
        return this.http.post(this.API_ENDPOINT + 'insert-institute', body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * get institute details for update
     */
    public editInstitute(editId) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'edit-institute/'+ editId,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * update institute
     */
    updateInstitute(editId, instName, regNo, dateOfReg, adrz, mobileNum, instEmail, instStatus, deleted, user_fullName, user_nameWithInitials, user_email, user_nic, user_mobile, user_designation, user_gender, user_dob, user_status) {
        let headers = new Headers();
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams();
        body.append('name', instName);
        body.append('registration_number', regNo);
        body.append('registered_date', dateOfReg);
        body.append('contact_number', mobileNum);
        body.append('email', instEmail);
        body.append('address', adrz);
        body.append('status', instStatus);
        body.append('deleted', deleted);
        body.append('user_name', user_fullName);
        body.append('user_email', user_email);
        body.append('user_status', user_status);
        body.append('user_name_with_initials', user_nameWithInitials);
        body.append('user_gender', user_gender);
        body.append('user_nic', user_nic);
        body.append('user_mobile', user_mobile);
        body.append('user_designation', user_designation);
        body.append('user_birthday', user_dob);

        return this.http.post(this.API_ENDPOINT + 'update-institute/'+ editId, body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * delete institute
     */
    public deleteInstitute(deleteId) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'delete-institute/' + deleteId,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * get added authorizers' details
     */
    public getAddedAuthorizers(id) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'get-institute-authorizer/'+id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * get added providers' details
     */
    public getAddedProviders(institute_id) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'get-institute-provider/' + institute_id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * add authorizer
     */
    public addAuthorizer(institute_id, authorizerNic) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'insert-institute-authorizer/' + authorizerNic +'/'+ institute_id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * add provider
     */
    public addProvider(institute_id, providerNic) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'insert-institute-provider/' + providerNic + '/' + institute_id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * remove provider
     */
    public removeProvider(deleteId, institute_id) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'remove-institute-provider/' + deleteId + '/' + institute_id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * remove authorizer
     */
    public removeAuthorizer(deleteId, institute_id) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'remove-institute-authorizer/' + deleteId + '/' + institute_id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}