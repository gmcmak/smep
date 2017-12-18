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

    constructor(
        private authorizerService: AuthorizerService,
        private router: Router,
        private localStorageService: LocalStorageService
    ){}

    ngOnInit(): void {
       this.dataTable();
       this.getAuthorizerDetails();
    }


    dataTable(){
        $('#dataTableAuthorizer').DataTable({
            "language": {
                "search": "Search by: (Authorizer's name/ Institute represented/ Subject area)"
              }
        });
    }

    /**
     * authorizer data list
     */
    getAuthorizerDetails(){
        this.authorizerService.getAuthorizersList()
            .subscribe(
                success => {this.authorizerList = success.success;}
            );
    }

}