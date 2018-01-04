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

export class ViewProvidersComponent implements OnInit {

    public providerList;

    public providerDeletingStatus;

    constructor(
        private providerService: ProviderService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {

        this.getProvidersList();
        
        setTimeout(function(){
            $('#dataTableProviders').DataTable({
            "language": {
                "search": "Search by: (Provider's name/ Institute represented/ Subject area)"
            }
        });
        }, 2000);

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
     * get providers data list
     */
    private getProvidersList() {
        this.providerService.getProvidersList()
            .subscribe(
            success => {
                this.providerList = success.success;
                // $("#dataTableProviders").find('tbody').empty();
                // var dataClaims = this.providerList;
                // for (let i = 0; i < dataClaims.length; i++) {
                //     $('#dataTableProviders').dataTable().fnAddData([
                //         (i + 1),
                //         dataClaims[i].name,
                //         dataClaims[i].name,
                //         dataClaims[i].name,
                //         '<a>10</a>',
                //         '<a>5</a>',
                //         '<label class="switch"><input type= "checkbox" value= "' + dataClaims[i].status + '" ><span class="slider round" > </span></label>',
                //         '<a [routerLink]="[' + "'" + "../../content-provider/update-providers" + "'" + ']"' + ' class="fa fa-1x fa-pencil-square-o"></a>',
                //         '<a data-toggle="modal" data-target="#deleteModal"><li class="fa  fa-1x fa-trash"></li></a>'
                //     ]);
                // }
            }
            );
    }

    /**
     * delete provider
     */
    deleteProvider(deleteId){
        this.providerService.deleteProvider(
            deleteId
        ).subscribe(
            success => {
                this.providerDeletingStatus = success.success;
                this.getProvidersList();
                this.hideAlert();
            }
        );
    }

}