import { Component, OnInit } from "@angular/core";
import { AdvertisementService } from "../../../../../../services/businessservices/core/advertisement/advertisement.service";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-advertisement',
    templateUrl: 'view-advertisement.component.html',
    styleUrls: ['view-advertisement.component.css']
})
export class ViewAdvertisementComponent implements OnInit {

    public advertisementList;
    private error = 0;
    public advertisementDeletingStatus;
    private statusId: number;

    constructor(
        private advertisementService: AdvertisementService
    ){}

    ngOnInit(): void {
        this.getAdvertisements();
        this.loadTable();
    }

    /**
     * load table
     */
    public loadTable() {
        setTimeout(function () {
            $('#advertisementTable').DataTable({
                "language": {
                    "search": "Search by: (Title/ Explore/ Category/ Keyword)"
                }
            });
        }, 2000);
    }

    /**
     * delete table and load again
     */
    public deleteTable() {
        var x = 0;
        var table = $('#advertisementTable').DataTable();
        if (table.destroy()) {
            x = 1;
        }
        if (x == 1) {
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
    public changeAlertClass() {
        return {
            'alert-success': this.error === 0,
            'alert-danger': this.error != 0
        }
    }

    /**
     * get advertisement details
     */
    private getAdvertisements(){
        this.advertisementService.getAdvertisementData().subscribe(
            success => {
                this.advertisementList = success.success;
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
        this.advertisementService.changeAdvertisementStatus(
            id,
            this.statusId
        ).subscribe(
            success => {
                this.advertisementDeletingStatus = success.success;
                this.error = success.error;
                this.hideAlert();
            }
        );
    }

    /**
     * delete advertisement
     */
    public deleteAdvertisement(deleteId, title) {
        if (confirm("Are you sure to delete ' " + title + " ' ?")) {
            this.advertisementService.deleteAdvertisement(
                deleteId
            ).subscribe(
                success => {
                    this.advertisementDeletingStatus = success.success;
                    this.error = success.error;
                    this.getAdvertisements();
                    this.hideAlert();
                    this.deleteTable();
                }
            );
        }
    }
}