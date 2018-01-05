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
     * get explore details for table
     */
    getExplores(){

        this.ExploreService.getExploresList()
            .subscribe(
                success =>{
                    this.exploreList = success.success;
                    // $("#exploreTable").find('tbody').empty();
                    // var dataClaims = this.exploreList;
                    // for (let i = 0; i < dataClaims.length; i++) {
                    //     $('#exploreTable').dataTable().fnAddData([
                    //         (i + 1),
                    //         dataClaims[i].en_tag,
                    //         dataClaims[i].si_tag,
                    //         dataClaims[i].ta_tag,
                    //         '<label class="switch"><input type= "checkbox" value= "' + dataClaims[i].status + '" ><span class="slider round" > </span></label>',
                    //         '<a [routerLink]="[' + "'" + "../../../settings/explore/update-explore" + "'" + ']"' + ' class="fa fa-1x fa-pencil-square-o"></a>',
                    //         '<a data-toggle="modal" data-target="#deleteModal"><li class="fa  fa-1x fa-trash"></li></a>'
                    //     ]);
                    // }
                }
            );
    }

    /**
     * delete explore
     */
    deleteExplore(deleteId){
        this.ExploreService.deleteExplore(
            deleteId
        ).subscribe(
            success => {
                this.exploreDeletingStatus = success.success;
                this.getExplores();
            }
        );
    }
}