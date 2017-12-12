import { Component } from '@angular/core';
import { AuthenticateService } from "../../../../../services/businessservices/security/security.service";
import { LoggedInUser } from "../../../../../data/models/security/logged-in-user.model";
import { LoginRequest } from "../../../../../data/models/security/login-request.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers : [AuthenticateService]
})
export class LoginComponent {
  public user = new LoginRequest("","");
  public errorMsg = '';

  constructor(private _service:AuthenticateService) {}

  login() {
    if(!this._service.login(this.user)) {
      this.errorMsg = 'Failed to login! try again ...';
    }
  }

  ngOnInit() {
    
  }

  

}
