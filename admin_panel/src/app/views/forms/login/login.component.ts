import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { StartupService } from '../../../services/settings/application-startup.service';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastCommunicationService } from '../../../services/toast/toast-communication.service';
import { UserService } from "../../../services/businessservices/core/user/user.service";

import { FormGroup, Validators, FormControl} from '@angular/forms';
import { LocalStorageStore } from '../../../services/storage/local-storage.service';

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent{
    private subscribe:any;
    private username;
    loggedInUserList: any[];

    constructor(
        private translate: TranslateService, 
        private router: Router, 
        private startup: StartupService, 
        private slimLoader: SlimLoadingBarService, 
        private toastCommunicationService: ToastCommunicationService, 
        private UserService:UserService,
        private localStorageService: LocalStorageStore,
        private activatedRoute: ActivatedRoute
    ) {
    }

    /**
     * login data capture
     * @param form 
     */
    login(form) {
        this.UserService.getLogin(form.email, form.password)
            .subscribe( 
                success => {
                    let userInfo = { "name":success.success.name, "token":success.success.token};
                    this.localStorageService.put('userData', JSON.stringify(userInfo));
                    if(success.success.token){
                        this.router.navigate(['/dashboard']);
                    }
                }
            );      
    }    


}