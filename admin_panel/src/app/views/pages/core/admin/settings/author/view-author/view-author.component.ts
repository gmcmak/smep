import {Component, OnInit} from '@angular/core';
import { AuthorService } from "../../../../../../../services/businessservices/core/settings/author.service";
import { Router } from '@angular/router';
import { LocalStorageStore } from '../../../../../../../services/storage/local-storage.service';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-author',
    templateUrl: 'view-author.component.html',
    styleUrls: ['view-author.component.css']
})

export class ViewAuthorComponent implements OnInit{
    public authorList;
    private loggedInUserList;

    constructor(
        private AuthorService:AuthorService,
        private router: Router, 
        private localStorageService: LocalStorageStore,
    ){}

    ngOnInit(): void {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        this.dataTable();
        this.getAuthors();
    }


    dataTable() {
        $('#authorsTable').DataTable({
            "language": {
                "search": "Search by: (English/ Sinhala/ Tamil)"
            }

        });
    }

    private getAuthors(){
        this.AuthorService.getAuthorsList()
            .subscribe(success=>{this.authorList = success.success});
    }
    
}