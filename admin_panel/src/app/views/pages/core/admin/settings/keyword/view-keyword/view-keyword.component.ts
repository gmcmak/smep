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

    constructor(
        private KeywordService: KeywordService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.dataTable();
        this.getKeywords();
    }

    dataTable() {
        $('#keywordTable').DataTable({
            "language": {
                "search": "Search by: (English/ Sinhala/ Tamil)"
            }

        });
    }

    getKeywords() {

        this.KeywordService.getExploresList()
            .subscribe(success => { this.keywordList = success.success });
    }
    

    
}