import { Component, OnInit } from "@angular/core";
import { ProviderService } from "../../../../../services/businessservices/core/content-provider/provider.service";
import { Router } from "@angular/router";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'ca-content-providers',
    templateUrl: 'ca-content-provider.component.html',
    styleUrls: ['ca-content-provider.component.css']
})

export class ViewContentProvidersComponent implements OnInit{

    public providerList;

    ngOnInit(): void {
        //throw new Error("Method not implemented.");
        this.dataTable();
        this.getProvidersList();
    }

    constructor(
        private providerService: ProviderService,
        private router: Router
    ){}

    dataTable(){
        $('#dataTableProviders').DataTable({
            "language": {
                "search" : "Search By: (Provider Name/ Institute Represented/ Subject Areas)"
            }
        });
    }

    /**
     * get all providers' details
     */
    getProvidersList() {
        this.providerService.getProvidersList(

        ).subscribe(
            success => {
                this.providerList = success.success;
                $("#dataTableProviders").find('tbody').empty();
                var dataClaims = this.providerList;
                for (let i = 0; i < dataClaims.length; i++) {
                    $('#dataTableProviders').dataTable().fnAddData([
                        (i + 1),
                        dataClaims[i].name,
                        '<a>NSBM</a>',
                        '<ul><li>Science</li><li>Management</li></ul>',
                        '<a>10</a>',
                        '<a>10</a>',
                        '<label class="switch"><input type= "checkbox" value= "' + dataClaims[i].status + '" ><span class="slider round" > </span></label>',
                        '<a [routerLink]="[' + "'" + "../../content-consumer/update-consumers" + "'" + ']"' + ' class="fa fa-1x fa-pencil-square-o"></a>'
                    ]);
                }
            }
            );
    }

}