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
    public error = 0;

    public keywordDeletingStatus;

    constructor(
        private KeywordService: KeywordService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.getKeywords();
        this.loadTable();
    }

    /**
     * load table
     */
    public loadTable(){
        setTimeout(function () {
            $('#keywordTable').DataTable({

            });
        }, 2000);
    }

    /**
     * delete table and reload table
     */
    public deleteTable(){
        var x = 0;
        var table = $('#keywordTable').DataTable();
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
     * get keyword details to table
     */
    getKeywords() {
        this.KeywordService.getKeywordList()
            .subscribe(
                success => {
                    this.keywordList = success.success;
                }
            );
    }

    /**
     * delete keyword
     */
    deleteKeyword(deleteId, name) {
        if (confirm("Are you sure to delete ' " + name + " ' ?")) {
            this.KeywordService.deleteKeyword(
                deleteId
            ).subscribe(
                success => {
                    this.keywordDeletingStatus = success.success;
                    this.error = success.error;
                    this.getKeywords();
                    this.hideAlert();
                    this.deleteTable();
                }
                );
        }
    }

    
}