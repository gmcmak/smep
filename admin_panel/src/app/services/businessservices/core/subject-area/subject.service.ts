import { Injectable } from "@angular/core";
import { Http, Headers, Response, RequestOptions, URLSearchParams } from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage/dist/local-storage.service";

@Injectable()

export class SubjectService{
    public API_ENDPOINT = "http://localhost:8000/api/";
    private loggedInUserList;

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ){
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData')); 
    }

    /**
    * get all subjects list
    * @return subjectlist
    */
    public getSubjectsList() {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'view-subject-area',
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * add subject
    */
    public addSubject(subject_area, descriptions) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams;
        body.append('name', subject_area);
        body.append('description', descriptions);
        return this.http.post(this.API_ENDPOINT + 'insert-subject-area', body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * get subject details for update
    */
    public getSubjectList(id) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'edit-subject-area/'+id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * update subject
    */
    public updateSubject(id, subject_area, descriptions) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams;
        body.append('name', subject_area);
        body.append('description', descriptions);
        return this.http.post(this.API_ENDPOINT + 'update-subject-area/'+id, body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * delete subject
    */
    public deleteSubject(deleteId) {

        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'delete-subject-area/' + deleteId,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}