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

    public authorDeletingStatus;
    public deleteId=4; //delete author id

    constructor(
        private AuthorService:AuthorService,
        private router: Router, 
        private localStorageService: LocalStorageStore,
    ){}

    ngOnInit(): void {
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));

        setTimeout(function(){
            $('#authorsTable').DataTable({
            });
        }, 2000);

        this.getAuthors();
        //this.deleteAuthor();
    }

    private getAuthors(){
        this.AuthorService.getAuthorsList()
            .subscribe(
                success=>{
                    this.authorList = success.success;
                    // $("#authorsTable").find('tbody').empty();
                    // var dataClaims = this.authorList;
                    // for (let i = 0; i < dataClaims.length; i++) {
                    //     $('#authorsTable').dataTable().fnAddData([
                    //         (i + 1),
                    //         dataClaims[i].en_name,
                    //         dataClaims[i].si_name,
                    //         dataClaims[i].ta_name,
                    //         '<a [routerLink]="[' + "'" + "../../../settings/author/update-author" + "'" + ']"' + ' class="fa fa-1x fa-pencil-square-o"></a>',
                    //         '<a data-toggle="modal" data-target="#deleteModal"><li class="fa  fa-1x fa-trash"></li></a>'
                    //     ]);
                    // }
                }
            );
    }

    deleteAuthor(){
        this.AuthorService.deleteAuthor(
            this.deleteId
        ).subscribe(
            success => {
                this.authorDeletingStatus = success.success
            }
        );
    }
    
}