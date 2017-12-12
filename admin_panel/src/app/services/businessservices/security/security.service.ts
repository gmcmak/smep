import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { LoggedInUser } from "../../../data/models/security/logged-in-user.model";
import { LoginRequest } from "../../../data/models/security/login-request.model";


@Injectable()
export class AuthenticateService {

  constructor(private _router: Router) { }

  logout() {
    localStorage.removeItem("user");
    this._router.navigate(['/login']);
  }

  login(user: any) {
    console.log('user ' + user);
  }

  checkCredentials() {
    if (localStorage.getItem("user") === null){
      this._router.navigate(['/login']);
    }
  }
}
