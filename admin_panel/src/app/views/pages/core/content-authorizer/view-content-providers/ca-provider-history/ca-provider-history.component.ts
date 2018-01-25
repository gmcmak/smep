import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProviderService } from "../../../../../../services/businessservices/core/content-provider/provider.service";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'ca-provider-history',
    templateUrl: 'ca-provider-history.component.html',
    styleUrls: ['ca-provider-history.component.css']
})

export class CaProviderHistoryComponent implements OnInit{

    private sub;
    private user_id: number;
    private status_id: number;
    public contentData = new Array();

    constructor(
        private route: ActivatedRoute,
        private providerService: ProviderService
    ) { }

    ngOnInit(): void {

        /**
        * get param id value from the router
        */
        this.sub = this.route.params.subscribe(params => {
            this.user_id = +params['user_id'];
            this.status_id = +params['status_id'];
        });

        this.getContentHistoryData(this.user_id, this.status_id);

        setTimeout(function () {
            $('#providerContentHistory').DataTable({
                "language": {
                    "search": "Search by: (Title/ Url/ Description)"
                }
            });
        }, 2000);
    }

    /**
     * get provider content approved rejected details
     */
    public getContentHistoryData(user_id, status_id) {
        this.providerService.getContentHistory(
            user_id,
            status_id
        ).subscribe(
            success => {
                this.contentData = success.success;
            }
            );
    }

}