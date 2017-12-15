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
    
    constructor(
        private ExploreService: ExploreService,
        private router: Router,
        private localStorageService: LocalStorageService
    ){}

    ngOnInit(): void {
        this.dataTable();
        this.getExplores();
    }


    dataTable() {
        $('#exploreTable').DataTable({
            "language": {
                "search": "Search by: (English/ Sinhala/ Tamil)"
            }

        });
    }

    getExplores(){

        this.ExploreService.getExploresList()
            .subscribe(success =>{this.exploreList = success.success});
    }
}