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
            .subscribe(
                success=>{
                    this.authorList = success.success;
                    $("#authorsTable").find('tbody').empty();
                    var dataClaims = this.authorList;
                    for (let i = 0; i < dataClaims.length; i++) {
                        $('#authorsTable').dataTable().fnAddData([
                            (i + 1),
                            dataClaims[i].name,
                            dataClaims[i].registration_number,
                            dataClaims[i].registered_date,
                            dataClaims[i].email,
                            dataClaims[i].contact_number,
                            dataClaims[i].address,
                            '<label class="switch"><input type= "checkbox" value= "' + dataClaims[i].status + '" ><span class="slider round" > </span></label>',
                            '<a [routerLink]="[' + "'" + "../../institute/update-institute" + "'" + ']"' + ' class="fa fa-1x fa-pencil-square-o"></a>',
                            '<a data-toggle="modal" data-target="#deleteModal"><li class="fa  fa-1x fa-trash"></li></a>'
                        ]);
                    }
                }
            );
    }
    
}