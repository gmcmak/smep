import { Component, OnInit } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { StartupService } from '../../../../../../services/settings/application-startup.service';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastCommunicationService } from '../../../../../../services/toast/toast-communication.service';
import { UserService } from "../../../../../../services/businessservices/core/user/user.service";

import { FormGroup, Validators, FormControl} from '@angular/forms';
import { LocalStorageStore } from '../../../../../../services/storage/local-storage.service';

declare var $: any;
declare var jQuery: any;

@Component({
    selector : 'view-users',
    templateUrl: 'view-users.component.html',
    styleUrls: ['view-users.component.css']
})

export class ViewUsersComponent implements OnInit{

    private token;
    private loggedInUserList;
    private usersList;

    public userDeletingStatus;

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

        //
    }    

    ngOnInit(): void {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        this.getUsers();    
        setTimeout(
            function(){
                $('#dataTableUsers').DataTable({
                    "language": {
                        "search": "Search by: (Name/ Email/ Role)"
                    }
                });                
            }
            , 2000);
        //this.hideAlert();
    }

    /**
     * hide success alert
     */
    // hideAlert(){
    //     window.setTimeout(function () {
    //         $(".alert").fadeTo(500, 0).slideUp(500, function () {
    //             $(this).remove();
    //         });
    //     }, 4000);
    // }
 
    /**
     * user data list
     * @param  
     */
    getUsers() {
        this.UserService.getUsersList()
            .subscribe( 
                success => {
                    this.usersList = success.success;
                }
            );      
    }
    
    /**
     * delete user
     */
    deleteUser(deleteId){
        
        this.UserService.deleteUser(
            deleteId
        ).subscribe(
            success => {
                this.userDeletingStatus = success.success;
                this.getUsers(); 
            }
        );
    }


}

