import {Component, OnInit} from '@angular/core';
import { ExploreService } from '../../../../../../../services/businessservices/core/settings/explore.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-explore',
    templateUrl: 'view-explore.component.html',
    styleUrls: ['view-explore.component.css']
})

export class ViewExploreComponent implements OnInit{

    public exploreList;
    private loggedInUserList;
    public error = 0;
    public statusId = 0;

    public exploreDeletingStatus;
    
    constructor(
        private ExploreService: ExploreService,
        private router: Router,
        private localStorageService: LocalStorageService
    ){}

    ngOnInit(): void {

        setTimeout(function(){
            $('#exploreTable').DataTable({

            }); 
        }, 2000);

        this.getExplores();
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
     * get explore details for table
     */
    getExplores(){

        this.ExploreService.getExploresList()
            .subscribe(
                success =>{
                    this.exploreList = success.success;
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
        this.ExploreService.updateExploreStatus(
            id,
            this.statusId
        ).subscribe(
            success => {
                this.exploreDeletingStatus = success.success;
                this.error = success.error;
                this.hideAlert();
            }
            );
    }

    /**
     * delete explore
     */
    deleteExplore(deleteId, name) {
        if (confirm("Are you sure to delete ' " + name + " ' ?")) {
            this.ExploreService.deleteExplore(
                deleteId
            ).subscribe(
                success => {
                    this.exploreDeletingStatus = success.success;
                    this.error = success.error;
                    this.getExplores();
                    this.hideAlert();
                }
                );
        }
    }
}