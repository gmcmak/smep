import { Component, OnInit } from "@angular/core";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'ca-content-providers',
    templateUrl: 'ca-content-provider.component.html',
    styleUrls: ['ca-content-provider.component.css']
})

export class ViewContentProvidersComponent implements OnInit{
    ngOnInit(): void {
        //throw new Error("Method not implemented.");
        this.dataTable();
    }

    dataTable(){
        $('#dataTableProviders').DataTable({
            "language": {
                "search" : "Search By: (Provider Name/ Institute Represented/ Subject Areas)"
            }
        });
    }

}