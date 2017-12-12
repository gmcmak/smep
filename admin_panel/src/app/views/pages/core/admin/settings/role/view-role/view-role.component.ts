import {Component, OnInit} from '@angular/core';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-role',
    templateUrl: 'view-role.component.html',
    styleUrls: ['view-role.component.css']
})

export class ViewRoleComponent implements OnInit{
    ngOnInit(): void {
        this.dataTable();
    }


    dataTable() {
        $('#roleTable').DataTable({
            "language": {
                "search": "Search by: (Role Name)"
            }

        });
    }
}