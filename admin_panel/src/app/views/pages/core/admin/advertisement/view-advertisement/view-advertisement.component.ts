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
     * get advertisement details
     */
    private getAdvertisements(){
        this.advertisementService.getAdvertisementData().subscribe(
            success => {
                this.advertisementList = success.success;
            }
        );
    }
}