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
    public deleteId=10;

    constructor(
        private RoleService: RoleService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.getRoles();
        this.dataTable();
        this.deleteRole();

    }


    dataTable() {
        $('#roleTable').DataTable({
            "language": {
                "search": "Search by: (Role Name)"
            }
        });
      
    }

    /**
     * get roles' details
     */
    getRoles(){
        this.RoleService.getRolesList()
            .subscribe(
                success => {
                    this.roleList = success.success;
                    $("#roleTable").find('tbody').empty();
                    var dataClaims = this.roleList;
                    for (let i = 0; i < dataClaims.length; i++) {
                        $('#roleTable').dataTable().fnAddData([
                            (i + 1),
                            dataClaims[i].name,
                            '<label class="switch"><input type= "checkbox" value= "' + dataClaims[i].status + '" ><span class="slider round" > </span></label>',
                            '<a [routerLink]="[' + "'" + "../../../settings/role/update-role" + "'" + ']"' + ' class="fa fa-1x fa-pencil-square-o"></a>',
                            '<a data-toggle="modal" data-target="#deleteModal"><li class="fa  fa-1x fa-trash"></li></a>'
                            //'<button type="button" (click)="sendId(dataClaims[i].id)"></button>'
                        ]);
                    }
                }
            );
    }

    /**
     * delete role
     */
    deleteRole(){
        this.RoleService.deleteRole(
            this.deleteId
        ).subscribe(
            success => {
                this.roleDeletingStatus = success.success
            }
        );
    }

}