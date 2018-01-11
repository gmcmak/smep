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
    public statusId;
    public providerStatus;
    public error = 0;

    ngOnInit(): void {
       
        setTimeout(function(){
            $('#dataTableProviders').DataTable({
                "language": {
                    "search": "Search By: (Provider Name/ Institute Represented/ Subject Areas)"
                }
            });
        }, 2000);
        
        this.getProvidersList();
    }

    constructor(
        private providerService: ProviderService,
        private router: Router
    ){}

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
    public changeAlertClass() {
        return {
            'alert-success': this.error === 0,
            'alert-danger': this.error != 0
        }
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
        this.providerService.updateProviderStatus(
            id,
            this.statusId
        ).subscribe(
            success => {
                this.providerStatus = success.success;
                this.error = success.error;
                this.hideAlert();
            }
            );
    }

    /**
     * get all providers' details
     */
    getProvidersList() {
        this.providerService.getProvidersList(

        ).subscribe(
            success => {
                this.providerList = success.success;
            }
            );
    }

}