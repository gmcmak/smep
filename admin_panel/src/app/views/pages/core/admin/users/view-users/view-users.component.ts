import { Component, OnInit } from "@angular/core";
import { TranslateService } from '@ngx-translate/core';

import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { StartupService } from '../../../../../../services/settings/application-startup.service';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastCommunicationService } from '../../../../../../services/toast/toast-communication.service';
import { UserService} from "../../../../../../services/businessservices/core/user/user.service";

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
    public userDataList;

    public error = 0;
    public statusId = 0;

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
        //this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
    }    

    ngOnInit(): void {
        
        this.getLoggedUserData();   
        
    }

    /**
     * load user table
     */
    public loadTable(){
        setTimeout(
            function () {
                $('#dataTableUsers').DataTable({
                    "language": {
                        "search": "Search by: (Name/ Email/ Role)"
                    }
                });
            }
            , 2000);
    }

    /**
     * delete table
     */
    public deleteTable(){
        var x = 0;
        var table = $('#dataTableUsers').DataTable();
        if(table.destroy()){
            x = 1;
        }
        if(x == 1){
            this.loadTable();
        }
    }
    

    /**
     * hide success alert
     */
    hideAlert() {
        $('#success_alert').show();
        setTimeout(function () {
            $('#success_alert').slideUp("slow");
        }, 2000);
    }

    /**
     * change alert class
     */
    public changeAlertClass(){
        return{
            'alert-success': this.error === 0,
            'alert-danger': this.error != 0
        }
    }

    /**
     * get logged user data
     */
    getLoggedUserData() {
        this.UserService.getLoggedUser().subscribe(
            success => {
                this.userDataList = success.success;
                this.getUsers();
                //console.log(this.userDataList.id);
            }
        );
    }
 
    /**
     * user data list
     * @param  
     */
    getUsers() {
        this.UserService.getUsersList()
            .subscribe( 
                success => {
                    this.usersList = success.success;
                    this.loadTable();
                }
            );      
    }

    /**
     * change status
     */
    public changeStatus(id, status) {
        if (status == false) {
            this.statusId = 0;
        }
        else {
            this.statusId = 1;
        }
        this.UserService.updateUserStatus(
            id,
            this.statusId
        ).subscribe(
            success => {
                this.userDeletingStatus = success.success;
                this.error = success.error;
                this.hideAlert();
            }
            );
    }
    
    /**
     * delete user
     */
    deleteUser(deleteId, name) {
        if (confirm("Are you sure to delete ' " + name + " ' ?")) {
            this.UserService.deleteUser(
                deleteId
            ).subscribe(
                success => {
                    this.userDeletingStatus = success.success;
                    this.error = success.error;
                    this.getUsers();
                    this.hideAlert();
                    this.deleteTable();
            }
            );
        }
    }


}

