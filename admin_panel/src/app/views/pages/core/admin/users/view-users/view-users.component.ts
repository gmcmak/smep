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

    constructor(
        private translate: TranslateService, 
        private router: Router, 
        private startup: StartupService, 
        private slimLoader: SlimLoadingBarService, 
        private toastCommunicationService: ToastCommunicationService, 
        private UserService:UserService,
        private localStorageService: LocalStorageStore,
        private activatedRoute: ActivatedRoute
    ) {}    

    ngOnInit(): void {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        this.getUsers();        
        this.dataTable();
    }
 
    dataTable(){
        $('#dataTableUsers').DataTable({
            "language": {
                "search": "Search by: (Name/ Email/ Role)"
            }
        });
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
                    $("#dataTableUsers").find('tbody').empty(); 
                    var dataClaims = this.usersList;
                    for (let i = 0; i < dataClaims.length; i++) {
                        $('#dataTableUsers').dataTable().fnAddData([
                            (i+1),
                            dataClaims[i].name,
                            dataClaims[i].email,
                            dataClaims[i].role.name,
                            '<a [routerLink]="['+"../../users/update-users"+']"'+' class="fa fa-1x fa-pencil-square-o"></a>',
                            '<a data-toggle="modal" data-target="#deleteModal"><li class="fa  fa-1x fa-trash"></li></a>'
                        ]);
                     }
                }
            );      
    }        


}