import { Component, OnInit } from "@angular/core";

declare var $: any;
declare var jQuery: any;

@Component({
    selector : 'view-users',
    templateUrl: 'view-users.component.html',
    styleUrls: ['view-users.component.css']
})

export class ViewUsersComponent implements OnInit{
    ngOnInit(): void {
        this.dataTable();
     }
 
 
     dataTable(){
         $('#dataTableUsers').DataTable({
                "language": {
                    "search": "Search by: (Name/ Email/ Role)"
                  }
            
         });
     }
 
}