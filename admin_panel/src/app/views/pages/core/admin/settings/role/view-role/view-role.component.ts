import {Component, OnInit} from '@angular/core';
import { RoleService } from '../../../../../../../services/businessservices/core/settings/role.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-role',
    templateUrl: 'view-role.component.html',
    styleUrls: ['view-role.component.css']
})

export class ViewRoleComponent implements OnInit{

    public roleList;
    private loggedInUserList;

    public roleDeletingStatus;

    constructor(
        private RoleService: RoleService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {

        setTimeout(function(){
            $('#roleTable').DataTable({
                "language": {
                    "search": "Search by: (Role Name)"
                }
            });
        }, 2000);
        
        this.getRoles();

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
     * get roles' details
     */
    getRoles(){
        this.RoleService.getRolesList()
            .subscribe(
                success => {
                    this.roleList = success.success;
                    // $("#roleTable").find('tbody').empty();
                    // var dataClaims = this.roleList;
                    // for (let i = 0; i < dataClaims.length; i++) {
                    //     $('#roleTable').dataTable().fnAddData([
                    //         (i + 1),
                    //         dataClaims[i].name,
                    //         '<label class="switch"><input type= "checkbox" value= "' + dataClaims[i].status + '" ><span class="slider round" > </span></label>',
                    //         '<a [routerLink]="[' + "'" + "../../../settings/role/update-role" + "'" + ']"' + ' class="fa fa-1x fa-pencil-square-o"></a>',
                    //         '<a data-toggle="modal" data-target="#deleteModal"><li class="fa  fa-1x fa-trash"></li></a>'
                    //     ]);
                    // }
                }
            );
    }

    /**
     * delete role
     */
    deleteRole(deleteId){
        this.RoleService.deleteRole(
            deleteId
        ).subscribe(
            success => {
                this.roleDeletingStatus = success.success;
                this.getRoles();
                this.hideAlert();
            }
        );
    }

}