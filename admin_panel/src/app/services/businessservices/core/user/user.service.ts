import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions } from "@angular/http";
import { Headers } from '@angular/http';
import { LocalStorageStore } from '../../../../services/storage/local-storage.service';
import { URLSearchParams } from '@angular/http';

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

    /**
     * get all roles list
     * @return rolelist
     */
    getRolesList(){
      this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));  
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'Bearer '+this.loggedInUserList.token);
      let body = '';
      return this.http.get(this.API_ENDPOINT+'view-role', 
          {
            headers: headers
          })
       .map((response: Response) => response.json());  
    }

    addUser(name, name_with_initials, email, nic, gender, birthday, mobile, designation, status, password, c_password, role_id, deleted){
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'Bearer '+this.loggedInUserList.token);      
      //let body = '';
      let body = new URLSearchParams();
      body.append('name', name);
      body.append('name_with_initials', name_with_initials); 
      body.append('email', email); 
      body.append('nic', nic); 
      body.append('gender', gender); 
      body.append('birthday', birthday); 
      body.append('mobile', mobile); 
      body.append('designation', designation); 
      body.append('status', status); 
      body.append('password', password); 
      body.append('c_password', c_password);
      body.append('role_id', role_id);
      body.append('deleted', deleted);    
      return this.http.post(this.API_ENDPOINT+'register', body,
          {
            headers: headers
          })
       .map((response: Response) => response.json());        
    }




}


