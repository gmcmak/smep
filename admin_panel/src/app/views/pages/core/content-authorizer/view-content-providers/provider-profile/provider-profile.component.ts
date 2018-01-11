import { Component, OnInit } from "@angular/core";
import { ProviderService } from "../../../../../../services/businessservices/core/content-provider/provider.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'provider-profile',
    templateUrl: 'provider-profile.component.html',
    styleUrls: ['provider-profile.component.css']
})

export class ProviderProfileComponent implements OnInit{

    public providerDataList;

    public sub: any;
    public id: number;
    public providerId; //provider id

    constructor(
        private providerService: ProviderService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {

        /**
          * get param id value from the router
          */
        this.sub = this.route.params.subscribe(params => {
            this.providerId = +params['id'];
        });

        this.loadProviderDetails();
    }
    

    public loadProviderDetails(){
        this.providerService.editProvider(
            this.providerId
        ).subscribe(
            success => {
                this.providerDataList = success.success;
            }
        );
    }

}