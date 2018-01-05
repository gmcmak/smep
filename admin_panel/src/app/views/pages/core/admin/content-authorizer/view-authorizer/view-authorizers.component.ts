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
     * authorizers data list
     */
    private getAuthorizerDetails() {
        this.authorizerService.getAuthorizersList()
            .subscribe(
            success => {
                this.authorizerList = success.success;
                // $("#dataTableAuthorizer").find('tbody').empty();
                // var dataClaims = this.authorizerList;
                // for (let i = 0; i < dataClaims.length; i++) {
                //     $('#dataTableAuthorizer').dataTable().fnAddData([
                //         (i + 1),
                //         dataClaims[i].name,
                //         dataClaims[i].name,
                //         dataClaims[i].name,
                //         '<a>10</a>',
                //         '<a>5</a>',
                //         '<a>15</a>',
                //         '<label class="switch"><input type= "checkbox" value= "' + dataClaims[i].status + '" ><span class="slider round" > </span></label>',
                //         '<a [routerLink]="[' + "'" + "../../content-authorizer/update-authorizers" + "'" + ']"' + ' class="fa fa-1x fa-pencil-square-o"></a>',
                //         '<a data-toggle="modal" data-target="#deleteModal"><li class="fa  fa-1x fa-trash"></li></a>'
                //     ]);
                // }
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
                this.getAuthorizerDetails();
            }
        );
    }
}