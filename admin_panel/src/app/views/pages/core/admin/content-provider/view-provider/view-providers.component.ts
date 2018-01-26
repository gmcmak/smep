import { Component, OnInit } from "@angular/core";
import { ProviderService } from "../../../../../../services/businessservices/core/content-provider/provider.service";
import { Router } from "@angular/router";
import { LocalStorageService } from "angular-2-local-storage/dist/local-storage.service";
import { ContentService } from "../../../../../../services/businessservices/core/content/content.service";

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
    public statusId = 0;
    public status: number; //for get approved, rejected count

    public userIds = new Array();
    public approvedIds = new Array();
    public rejectedIds = new Array();

    constructor(
        private providerService: ProviderService,
        private router: Router,
        private localStorageService: LocalStorageService,
        private contentService: ContentService
    ) { }

    ngOnInit(): void {

        this.getProvidersList();
        this.loadTable();
    }

    /**
     * load table
     */
    public loadTable(){
        setTimeout(function () {
            $('#dataTableProviders').DataTable({
                "language": {
                    "search": "Search by: (Provider's name/ Institute represented/ Subject area)"
                }
            });
        }, 2000);
    }

    /**
     * delete table and load again
     */
    public deleteTable(){
        var x = 0;
        var table = $('#dataTableProviders').DataTable();
        if(table.destroy()){
            x = 1;
        }
        if(x == 1){
            this.loadTable();
        }
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
    public getProvidersList() {
        this.providerService.getProvidersList()
            .subscribe(
            success => {
                this.providerList = success.success;
                for(let i=0; i<this.providerList.length; i++){
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
    public getApprovedCount(userIds){
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
    public getRejectedCount(userIds){
        this.contentService.getCount(
            userIds,
            this.status = 2
        ).subscribe(
            success => {
                this.rejectedIds = success.count;
            }
        );
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
                this.providerDeletingStatus = success.success;
                this.error = success.error;
                this.hideAlert();
            }
            );
    }

    /**
     * delete provider
     */
    deleteProvider(deleteId, name) {
        if (confirm("Are you sure to delete ' " + name + " ' ?")) {
            this.providerService.deleteProvider(
                deleteId
            ).subscribe(
                success => {
                    this.providerDeletingStatus = success.success;
                    this.error = success.error;
                    this.getProvidersList();
                    this.hideAlert();
                    this.deleteTable();
                }
                );
        }
    }

}