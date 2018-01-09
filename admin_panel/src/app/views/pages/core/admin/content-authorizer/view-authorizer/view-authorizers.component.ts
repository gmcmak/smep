import { Component } from "@angular/core";
import { OnInit } from '@angular/core';
import { AuthorizerService } from "../../../../../../services/businessservices/core/content-authorizer/authorizer.service";
import { Router } from "@angular/router";
import { LocalStorageService } from "angular-2-local-storage/dist/local-storage.service";

declare var $: any;
declare var jQuery: any;
@Component({
    selector: 'view-authorizers',
    templateUrl: 'view-authorizers.component.html',
    styleUrls: ['view-authorizers.component.css']
})

export class ViewAuthorizersComponent implements OnInit {

    public authorizerList;
    private loggedInUserList;

    public authorizerDeletingStatus;
    public error = 0;

    constructor(
        private authorizerService: AuthorizerService,
        private router: Router,
        private localStorageService: LocalStorageService
    ){}

    ngOnInit(): void {
       this.getAuthorizerDetails();
       //this.deleteAuthorizer();
        setTimeout(
            function() {
                $('#dataTableAuthorizer').DataTable({
                    "language": {
                        "search": "Search by: (Authorizer's name/ Institute represented/ Subject area)"
                    }
                });
            }, 2000
        );
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
     * authorizers data list
     */
    private getAuthorizerDetails() {
        this.authorizerService.getAuthorizersList()
            .subscribe(
            success => {
                this.authorizerList = success.success;
            }
            );
    }

    /**
     * delete authorizer
     */
    deleteAuthorizer(deleteId){
        this.authorizerService.deleteAuthorizer(
            deleteId
        ).subscribe(
            success => {
                this.authorizerDeletingStatus = success.success;
                this.error = success.error;
                this.getAuthorizerDetails();
                this.hideAlert();
            }
        );
    }
}