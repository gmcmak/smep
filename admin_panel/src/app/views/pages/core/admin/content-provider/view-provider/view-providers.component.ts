import { Component, OnInit } from "@angular/core";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-providers',
    templateUrl: 'view-providers.component.html',
    styleUrls: ['view-providers.component.css']
})

export class ViewProvidersComponent implements OnInit{
    ngOnInit(): void {
        this.dataTable();
     }
 
 
     dataTable(){
         $('#dataTableProviders').DataTable({
            "language": {
                "search": "Search by: (Provider's name/ Institute represented/ Subject area)"
              }
         });
     }
 
}