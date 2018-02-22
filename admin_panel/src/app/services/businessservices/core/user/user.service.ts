import { Injectable } from "@angular/core";
import { Http, Response, RequestOptions } from "@angular/http";
import { Headers } from '@angular/http';
import { URLSearchParams } from '@angular/http';
import { LocalStorageStore } from "../../../storage/local-storage.service";

@Injectable()

export class UserService {

    public API_ENDPOINT = "http://localhost:8000/api/";
    private loggedInUserList = new Array();

    constructor(
      private http: Http,
      private localStorageService: LocalStorageStore
    ) {
      if (this.localStorageService.get('userData')){
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData').toString()); 
      }
      
    }
   
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
       
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'Bearer '+this.loggedInUserList["token"]);
      let body = '';
      return this.http.get(this.API_ENDPOINT + 'get-all-users', 
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
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'Bearer '+this.loggedInUserList["token"]);
      let body = '';
      return this.http.get(this.API_ENDPOINT+'view-role', 
          {
            headers: headers
          })
       .map((response: Response) => response.json());  
    }

    /**
     * add user details
     */
    addUser(name, name_with_initials, email, nic, gender, birthday, mobile, designation, status, password, c_password, role_id, deleted){
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'Bearer '+this.loggedInUserList["token"]);      
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

    /**
     * get user details for edit
     * 
     */
    public editUsersList(editId) {
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
      let body = '';
      return this.http.get(this.API_ENDPOINT + 'edit-details/' + editId,
        {
          headers: headers
        })
        .map((response: Response) => response.json());
    }

    /**
     * update user's details
     */
  updateUserList(editId, role_id, user_fullName, user_nameWithInitials, user_email, user_nic, user_mobile, user_designation, user_gender, user_dob, user_status, deleted) {
      let headers = new Headers();
      headers.append('Accept', 'application/json');
      headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
      //let body = '';
      let body = new URLSearchParams;
      body.append('name', user_fullName);
      body.append('email', user_email);
      body.append('status', user_status);
      body.append('name_with_initials', user_nameWithInitials);
      body.append('gender', user_gender);
      body.append('nic', user_nic);
      body.append('mobile', user_mobile);
      body.append('designation', user_designation);
      body.append('birthday', user_dob);
      body.append('role_id', role_id);
      body.append('deleted', deleted);

      return this.http.post(this.API_ENDPOINT + 'update-details/'+ editId, body,
        {
          headers: headers
        })
        .map((response: Response) => response.json());
    }

  /**
   * delete users
   * 
   */
  public deleteUser(deleteId) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
    let body = '';
    return this.http.get(this.API_ENDPOINT + 'delete-details/' + deleteId,
      {
        headers: headers
      })
      .map((response: Response) => response.json());
  }

  /**
     * get logged user details
     */
  public getLoggedUser() {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
    let body = '';
    return this.http.get(this.API_ENDPOINT + 'get-details',
      {
        headers: headers
      })
      .map((response: Response) => response.json());
  }

  /**
     * update user's status
     */
  public updateUserStatus(id,statusId) {

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
    let body = '';
    return this.http.get(this.API_ENDPOINT + 'status-details/' + id + '/' + statusId,
      {
        headers: headers
      })
      .map((response: Response) => response.json());
  }

  /**
     * get institute id for logged user (Institute)
     */
  public loadInstituteId(user_id) {

    let headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.loggedInUserList["token"]);
    let body = '';
    return this.http.get(this.API_ENDPOINT + 'get-institute-id/' +user_id,
      {
        headers: headers
      })
      .map((response: Response) => response.json());
  }

}


