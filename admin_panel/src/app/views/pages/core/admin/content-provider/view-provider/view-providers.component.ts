import { Component, OnInit } from "@angular/core";
import { ProviderService } from "../../../../../../services/businessservices/core/content-provider/provider.service";
import { Router } from "@angular/router";
import { LocalStorageService } from "angular-2-local-storage/dist/local-storage.service";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-providers',
    templateUrl: 'view-providers.component.html',
    styleUrls: ['view-providers.component.css']
})

export class ViewProvidersComponent implements OnInit{

    public providerList;

    constructor(
        private providerService: ProviderService,
        private router: Router,
        private localStorageService: LocalStorageService
    ){}

    ngOnInit(): void {
        this.dataTable();
        this.getProvidersList();
     }
 
 
     dataTable(){
         $('#dataTableProviders').DataTable({
            "language": {
                "search": "Search by: (Provider's name/ Institute represented/ Subject area)"
              }
         });
     }

     /**
      * get providers data list
      */
    getProvidersList(){
        this.providerService.getProvidersList()
            .subscribe(
                success => {this.providerList = success.success}
            );
    }
 
}