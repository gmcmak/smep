import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage/dist/local-storage.service";

@Injectable()

export class ProviderService{
    public API_ENDPOINT = "http://localhost:8000/api/";
    private loggedInUserList;

    constructor(private http:Http, private localStorageService: LocalStorageService){}

    /**
    * get all providers list
    * @return providerList
    */
    public getProvidersList() {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'view-providers',
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * insert provider details
     */
    public insertProvider(cpName, cpFullName, gender, cpNic, cpDesignation, cpDob, cpEmail, cpMobile, cpPassword1, cpPassword2, highest_quali, highest_uni, highest_grade, highest_Country, highest_Year, pro_qualification_1, pro_institute_1, pro_grade_1, pro_year_1, pro_country_1, pro_qualification_2, pro_institute_2, pro_grade_2, pro_year_2, pro_country_2, pro_qualification_3, pro_institute_3, pro_grade_3, pro_year_3, pro_country_3, expert1, expert2, expert3, deleted, status) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams;
        body.append('name', cpName);
        body.append('name_with_initials', cpFullName);
        body.append('gender', gender);
        body.append('nic', cpNic);
        body.append('designation', cpDesignation);
        body.append('birthday', cpDob);
        body.append('email', cpEmail);
        body.append('mobile', cpMobile);
        body.append('password', cpPassword1);
        body.append('c_password', cpPassword2);
        body.append('deleted', deleted);
        body.append('status', status);
        body.append('highest_qualification', highest_quali);
        body.append('highest_university', highest_uni);
        body.append('highest_grade', highest_grade);
        body.append('country_id', highest_Country);
        body.append('highest_year', highest_Year);
        body.append('pro_qualification_1', pro_qualification_1);
        body.append('pro_institute_1', pro_institute_1);
        body.append('pro_grade_1', pro_grade_1);
        body.append('pro_year_1', pro_year_1);
        body.append('pro_country_1', pro_country_1);
        body.append('pro_qualification_2', pro_qualification_2);
        body.append('pro_institute_2', pro_institute_2);
        body.append('pro_grade_2', pro_grade_2);
        body.append('pro_year_2', pro_year_2);
        body.append('pro_country_2', pro_country_2);
        body.append('pro_qualification_3', pro_qualification_3);
        body.append('pro_institute_3', pro_institute_3);
        body.append('pro_grade_3', pro_grade_3);
        body.append('pro_year_3', pro_year_3);
        body.append('pro_country_3', pro_country_3);
        body.append('expert1', expert1);
        body.append('expert2', expert2);
        body.append('expert3', expert3);
        return this.http.post(this.API_ENDPOINT + 'insert-provider', body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * get specific provider's details for edit
    */
    public editProvider(id) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'edit-provider/'+id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * update provider details
     */
    public updateProvider(editId, cpName, cpFullName, gender, cpNic, cpDesignation, cpDob, cpEmail, cpMobile, highest_quali, highest_uni, highest_grade, highest_Country, highest_Year, pro_qualification_1, pro_institute_1, pro_grade_1, pro_year_1, pro_country_1, pro_qualification_2, pro_institute_2, pro_grade_2, pro_year_2, pro_country_2, pro_qualification_3, pro_institute_3, pro_grade_3, pro_year_3, pro_country_3, expert1, expert2, expert3, deleted, status) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams;
        body.append('name', cpName);
        body.append('name_with_initials', cpFullName);
        body.append('gender', gender);
        body.append('nic', cpNic);
        body.append('designation', cpDesignation);
        body.append('birthday', cpDob);
        body.append('email', cpEmail);
        body.append('mobile', cpMobile);
        body.append('deleted', deleted);
        body.append('status', status);
        body.append('highest_qualification', highest_quali);
        body.append('highest_university', highest_uni);
        body.append('highest_grade', highest_grade);
        body.append('country_id', highest_Country);
        body.append('highest_year', highest_Year);
        body.append('pro_qualification_1', pro_qualification_1);
        body.append('pro_institute_1', pro_institute_1);
        body.append('pro_grade_1', pro_grade_1);
        body.append('pro_year_1', pro_year_1);
        body.append('pro_country_1', pro_country_1);
        body.append('pro_qualification_2', pro_qualification_2);
        body.append('pro_institute_2', pro_institute_2);
        body.append('pro_grade_2', pro_grade_2);
        body.append('pro_year_2', pro_year_2);
        body.append('pro_country_2', pro_country_2);
        body.append('pro_qualification_3', pro_qualification_3);
        body.append('pro_institute_3', pro_institute_3);
        body.append('pro_grade_3', pro_grade_3);
        body.append('pro_year_3', pro_year_3);
        body.append('pro_country_3', pro_country_3);
        body.append('expert1', expert1);
        body.append('expert2', expert2);
        body.append('expert3', expert3);
        return this.http.post(this.API_ENDPOINT + 'update-provider/' + editId, body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * delete provider
    */
    public deleteProvider(deleteId) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'delete-provider/'+ deleteId,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * update provider's status
    */
    public updateProviderStatus(id,statusId) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'provider-status/' + id + '/' + statusId,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * get provider's content history
     */
    public getContentHistory(user_id, status_id) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'get-history/' + user_id + '/' + status_id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

}