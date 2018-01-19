import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams } from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage";

@Injectable()

export class ContentService{
    public API_ENDPOINT = "http://localhost:8000/api/";
    private loggedInUserList;

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
    }

    /**
    * get specific content/ contents details
    */
    public getContentList(submission_id) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'get-content/' + submission_id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * add or update content data
    */
    public addContentData(content_id, submission_id, sub_title1, sub_type1, sub_video_url1, keywordArray, sub_free1, categoryArray, exploreArray, sub_description1, status) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList.token);
        //let body = '';
        let body = new URLSearchParams;
        body.append('title', sub_title1);
        body.append('type', sub_type1);
        body.append('video_url', sub_video_url1);
        body.append('keyword', keywordArray);
        body.append('freeform_keyword', sub_free1);
        body.append('status', status);
        body.append('description', sub_description1);
        body.append('category', categoryArray);
        body.append('explore', exploreArray);
        return this.http.post(this.API_ENDPOINT + 'add-content/'+ content_id + '/' + submission_id, body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}