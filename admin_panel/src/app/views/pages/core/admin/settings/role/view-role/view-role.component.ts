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
    public error = 0;
    public statusId = 0;

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
     * change alert class
     */
    public changeAlertClass(){
        return{
            'alert-success': this.error === 0,
            'alert-danger': this.error !=0
        }
    }

    /**
     * get roles' details
     */
    getRoles(){
        this.RoleService.getRolesList()
            .subscribe(
                success => {
                    this.roleList = success.success;
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
        this.RoleService.updateRoleStatus(
            id,
            this.statusId
        ).subscribe(
            success => {
                this.roleDeletingStatus = success.success;
                this.error = success.error;
                this.hideAlert();
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
                this.error = success.error;
                this.getRoles();
                this.hideAlert();
            }
        );
    }

}