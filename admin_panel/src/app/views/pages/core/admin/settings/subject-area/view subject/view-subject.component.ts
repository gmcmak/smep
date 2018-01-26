import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';
import { SubjectService } from "../../../../../../../services/businessservices/core/subject-area/subject.service";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-subject',
    templateUrl: 'view-subject.component.html',
    styleUrls: ['view-subject.component.css']
})

export class ViewSubjectComponent implements OnInit{
    public subjectList;
    private loggedInUserList;
    public error = 0;

    public subjectDeletingStatus;

    constructor(
        private subjectService: SubjectService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {

        this.getSubjects();
        this.loadTable();
    }

    /**
     * load table
     */
    public loadTable(){
        setTimeout(() => {
            $('#subjectTable').DataTable({
            });
        }, 2000);
    }

    /**
     * delete table and reload table
     */
    public deleteTable(){
        var x = 0;
        var table = $('#subjectTable').DataTable();
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
            'alert-danger': this.error !=0
        }
    }

    /**
     * get subjects' details
     */
    getSubjects() {
        this.subjectService.getSubjectsList()
            .subscribe(
            success => {
                this.subjectList = success.success;
            }
            );
    }

    /**
     * delete subject
     */
    deleteSubject(deleteId, name) {
        if (confirm("Are you sure to delete ' " + name + " ' ?")) {
            this.subjectService.deleteSubject(
                deleteId
            ).subscribe(
                success => {
                    this.subjectDeletingStatus = success.success;
                    this.error = success.error;
                    this.getSubjects();
                    this.hideAlert();
                    this.deleteTable();
                }
                );
        }
    }
}