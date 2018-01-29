import { Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { StartupService } from '../../../services/settings/application-startup.service';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastCommunicationService } from '../../../services/toast/toast-communication.service';
import { UserService } from "../../../services/businessservices/core/user/user.service";

import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import { LocalStorageStore } from '../../../services/storage/local-storage.service';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])/;

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit{

    ngOnInit(): void {
        this.initializeLoginForm();
    }

    private subscribe:any;
    private username;
    loggedInUserList: any[];

    public ngForm: FormGroup;

    constructor(
        private translate: TranslateService, 
        private router: Router, 
        private startup: StartupService, 
        private slimLoader: SlimLoadingBarService, 
        private toastCommunicationService: ToastCommunicationService, 
        private UserService:UserService,
        private localStorageService: LocalStorageStore,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder
    ) {
    }

    /**
     * validate login form
     */
    initializeLoginForm(){
        this.ngForm = this.formBuilder.group({
            'email': [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
            'password': [null, [Validators.required]]
        });
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
                        window.location.reload();
                        this.router.navigate(['/dashboard']); 
                    }
                }
            );      
    }
    
    public isFieldValid(field: string) {
        return !this.ngForm.get(field).valid && this.ngForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }


}