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
    public error = 0;

    public authorDeletingStatus;

    constructor(
        private AuthorService:AuthorService,
        private router: Router, 
        private localStorageService: LocalStorageStore,
    ){
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
    }

    ngOnInit(): void {
        this.getAuthors();
        this.loadTable(); 
    }

    /**
     * load table
     */
    public loadTable(){
        setTimeout(function () {
            $('#authorsTable').DataTable({
            });
        }, 2000);
    }

    /**
     * delete table and reload table
     */
    public deleteTable(){
        var x=0;
        var table = $('#authorsTable').DataTable();
        if(table.destroy()){
            var x = 1;
        }
        if(x==1){
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
     * get authors' details
     */
    private getAuthors(){
        this.AuthorService.getAuthorsList()
            .subscribe(
                success=>{
                    this.authorList = success.success;
                }
            );
    }

    /**
     * delete author
     * @param deleteId 
     * @param name 
     */
    deleteAuthor(deleteId, name) {
        if (confirm("Are you sure to delete ' " + name + " ' ?")) {
            this.AuthorService.deleteAuthor(
                deleteId
            ).subscribe(
                success => {
                    this.authorDeletingStatus = success.success;
                    this.error = success.error;
                    this.getAuthors();
                    this.hideAlert();
                    this.deleteTable();
                }
                );
        }
    }
    
}