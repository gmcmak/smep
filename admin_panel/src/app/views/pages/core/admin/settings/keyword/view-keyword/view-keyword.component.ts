import {Component, OnInit} from '@angular/core';
import { KeywordService } from '../../../../../../../services/businessservices/core/settings/keyword.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-keyword',
    templateUrl: 'view-keyword.component.html',
    styleUrls: ['view-keyword.component.css']
})

export class ViewKeywordComponent implements OnInit{

    public keywordList;
    private loggedInUserList;

    public keywordDeletingStatus;

    constructor(
        private KeywordService: KeywordService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {
        setTimeout(function(){
            $('#keywordTable').DataTable({

            }); 
        }, 2000);

        this.getKeywords();
    }

    /**
     * get keyword details to table
     */
    getKeywords() {
        this.KeywordService.getKeywordList()
            .subscribe(
                success => {
                    this.keywordList = success.success;
                    // $("#keywordTable").find('tbody').empty();
                    // var dataClaims = this.keywordList;
                    // for (let i = 0; i < dataClaims.length; i++) {
                    //     $('#keywordTable').dataTable().fnAddData([
                    //         (i + 1),
                    //         dataClaims[i].en_name,
                    //         dataClaims[i].si_name,
                    //         dataClaims[i].ta_name,
                    //         '<a [routerLink]="[' + "'" + "../../../settings/keyword/update-keyword" + "'" + ']"' + ' class="fa fa-1x fa-pencil-square-o"></a>',
                    //         '<a data-toggle="modal" data-target="#deleteModal"><li class="fa  fa-1x fa-trash"></li></a>'
                    //     ]);
                    // }
                }
            );
    }

    /**
     * delete keyword
     */
    deleteKeyword(deleteId){
        this.KeywordService.deleteKeyword(
            deleteId
        ).subscribe(
            success => {
                this.keywordDeletingStatus = success.success;
                this.getKeywords();
            }
        );
    }

    
}