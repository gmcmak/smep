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
    public error = 0;

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
     * change alert class
     */
    public changeAlertClass(){
        return{
            'alert-success': this.error === 0,
            'alert-danger': this.error != 0
        }
    }

    /**
     * get providers data list
     */
    private getProvidersList() {
        this.providerService.getProvidersList()
            .subscribe(
            success => {
                this.providerList = success.success;
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
                this.error = success.error;
                this.getProvidersList();
                this.hideAlert();
            }
        );
    }

}