import { Component, OnInit } from "@angular/core";
import { ProviderService } from "../../../../../services/businessservices/core/content-provider/provider.service";
import { Router } from "@angular/router";
import { ContentService } from "../../../../../services/businessservices/core/content/content.service";

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

    public status: number; //for get approved, rejected count

    public userIds = new Array();
    public approvedIds = new Array();
    public rejectedIds = new Array();

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
        private router: Router,
        private contentService: ContentService
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
                for (let i = 0; i < this.providerList.length; i++) {
                    this.userIds[i] = this.providerList[i].id;
                }
                this.getApprovedCount(this.userIds);
                this.getRejectedCount(this.userIds);
            }
            );
    }

    /**
     * get provider's content count of approved
     * @param userIds 
     */
    public getApprovedCount(userIds) {
        this.contentService.getCount(
            userIds,
            this.status = 1
        ).subscribe(
            success => {
                this.approvedIds = success.count;
            }
            );
    }

    /**
     * get provider's content count of rejected
     * @param userIds 
     */
    public getRejectedCount(userIds) {
        this.contentService.getCount(
            userIds,
            this.status = 2
        ).subscribe(
            success => {
                this.rejectedIds = success.count;
            }
            );
    }

}