import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions } from "@angular/http";
import { Headers } from '@angular/http';
import { LocalStorageStore } from '../../../../services/storage/local-storage.service';

@Injectable()

export class UserService {

    public API_ENDPOINT = "http://localhost:8000/api/";
    private loggedInUserList;

    constructor(private http: Http, private localStorageService: LocalStorageStore) {}
   
    /**
     * Login data
     * @param username 
     * @param password 
     * @return name and password
     */
    public getLogin(email: string, password: string) {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      let body = 'email='+email+'&password='+password;
        //   let urlSearchParams = new URLSearchParams();
        //   urlSearchParams.append('email', email);
        //   urlSearchParams.append('password', password);    
      return this.http.post(this.API_ENDPOINT+'login', body,
          {
            headers: headers
          })
       .map((response: Response) => response.json());
    } 

    /**
     * get all users list
     * @return userlist
     */
    public getUsersList(){
      this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));  
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'Bearer '+this.loggedInUserList.token);
      let body = '';
      return this.http.get(this.API_ENDPOINT+'get-details', 
          {
            headers: headers
          })
       .map((response: Response) => response.json());        
    }





}


