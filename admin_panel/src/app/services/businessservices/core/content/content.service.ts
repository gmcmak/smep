import { Injectable } from "@angular/core";
import { Http, Headers, Response, URLSearchParams } from "@angular/http";
import { LocalStorageService } from "angular-2-local-storage";
import * as globalData from "../globals";

@Injectable()

export class ContentService{
    public API_ENDPOINT = globalData.api_endpoint;
    private loggedInUserList = new Array();

    constructor(
        private http: Http,
        private localStorageService: LocalStorageService
    ) {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData').toString());
    }

    /**
    * get specific content/ contents details
    */
    public getContentList(submission_id) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
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
    public addContentData(content_id, submission_id, sub_title1, sub_type1, sub_video_url1, keywordArray, sub_free1, categoryArray, exploreArray, authorArray, sub_description1, status) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
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
        body.append('author', authorArray);
        return this.http.post(this.API_ENDPOINT + 'add-content/'+ content_id + '/' + submission_id, body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * get content count
    */
    public getContentCount(user_id,type_id) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'get-content-count/' + user_id + '/' + type_id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * get content provider all history
    */
    public getContentAllHistory(user_id, type_id) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'get-content-all/' + user_id + '/' + type_id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * get content provider content history
    */
    public getContentHistory(user_id, type_id, status_id) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'get-content-info/' + user_id + '/' + type_id + '/' + status_id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * get content provider content history count (approve,reject,pending,all)
    */
    public getContentAllCount(user_id, type_id, status_id) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'get-content-all-count/' + user_id + '/' + type_id + '/' + status_id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * get a content details for edit
    */
    public editContent(id, submission_id) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'edit-content/' + id + '/' + submission_id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * delete content
    */
    public deleteContent(id, submission_id) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        let body = '';
        return this.http.get(this.API_ENDPOINT + 'delete-content/' + id + '/' + submission_id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
    * get approved, rejected count for provider's table
    */
    public getCount(userIdArray, status_id) {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        //let body = '';
        return this.http.get(this.API_ENDPOINT + 'get-count/' + userIdArray + '/' + status_id,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }

    /**
     * provider content history
     */
    public providerContentsHistory(cpStatus, cpFromDate, cpToDate){
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
        //let body = '';
        let body = new URLSearchParams;
        body.append('status_id', cpStatus);
        body.append('fromDate', cpFromDate);
        body.append('toDate', cpToDate);
        return this.http.post(this.API_ENDPOINT + 'get-content-detail', body,
            {
                headers: headers
            })
            .map((response: Response) => response.json());
    }
}