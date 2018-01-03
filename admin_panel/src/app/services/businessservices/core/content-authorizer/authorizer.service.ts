import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage/dist/local-storage.service";

@Injectable()

export class AuthorizerService{
    public API_ENDPOINT = "http://localhost:8000/api/";
    private loggedInUserList;

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ){}

    /**
    * get all authorizers list
    * @return authorizerList
    */
    public getAuthorizersList() {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'view-authorizers',
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * add authorizer's details
     */
    public addAuthorizers(caName, caFullName, caGender, caNic, caDesignation, caDob, caEmail, caMobile, caPassword1, caPassword2, highest_quali, highest_uni, highest_grade, highest_Country, highest_Year, pro_qualification_1, pro_institute_1, pro_grade_1, pro_year_1, pro_country_1, pro_qualification_2, pro_institute_2, pro_grade_2, pro_year_2, pro_country_2, pro_qualification_3, pro_institute_3, pro_grade_3, pro_year_3, pro_country_3, expert1, expert2, expert3, status, deleted) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams;
        body.append('name', caName);
        body.append('email', caEmail);
        body.append('password', caPassword1);
        body.append('c_password', caPassword2);
        body.append('status', status);
        body.append('deleted', deleted);
        body.append('name_with_initials', caFullName);
        body.append('gender', caGender);
        body.append('nic', caNic);
        body.append('mobile', caMobile);
        body.append('designation', caDesignation);
        body.append('birthday', caDob);

        body.append('highest_qualification', highest_quali);
        body.append('highest_university', highest_uni);
        body.append('highest_grade', highest_grade);
        body.append('highest_year', highest_Year);
        body.append('country_id', highest_Country);

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

        return this.http.post(this.API_ENDPOINT + 'insert-authorizer', body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * get authorizer's details for update
    */
    public editAuthorizer(editId) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'edit-authorizer/'+ editId,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * add authorizer's details
     */
    public updateAuthorizer(id, caName, caFullName, caGender, caNic, caDesignation, caDob, caEmail, caMobile, highest_quali, highest_uni, highest_grade, highest_Country, highest_Year, pro_qualification_1, pro_institute_1, pro_grade_1, pro_year_1, pro_country_1, pro_qualification_2, pro_institute_2, pro_grade_2, pro_year_2, pro_country_2, pro_qualification_3, pro_institute_3, pro_grade_3, pro_year_3, pro_country_3, expert1, expert2, expert3, status, deleted) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams;
        body.append('name', caName);
        body.append('email', caEmail);
        body.append('status', status);
        body.append('deleted', deleted);
        body.append('name_with_initials', caFullName);
        body.append('gender', caGender);
        body.append('nic', caNic);
        body.append('mobile', caMobile);
        body.append('designation', caDesignation);
        body.append('birthday', caDob);

        body.append('highest_qualification', highest_quali);
        body.append('highest_university', highest_uni);
        body.append('highest_grade', highest_grade);
        body.append('highest_year', highest_Year);
        body.append('country_id', highest_Country);

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

        return this.http.post(this.API_ENDPOINT + 'update-authorizer/'+id, body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * delete authorizer
    */
    public deleteAuthorizer(deleteId) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'delete-provider/'+deleteId,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}