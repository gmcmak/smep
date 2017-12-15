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

    constructor(
        private RoleService: RoleService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.getRoles();
        this.dataTable();

    }


    dataTable() {
        $('#roleTable').DataTable({
            "language": {
                "search": "Search by: (Role Name)"
            }
        });
      
    }

    getRoles(){
        this.RoleService.getRolesList()
            .subscribe(success => { this.roleList = success.success });
    } 
}