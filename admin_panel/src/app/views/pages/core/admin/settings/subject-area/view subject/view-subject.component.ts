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

    public subjectDeletingStatus;
    //public deleteId = 6;

    constructor(
        private subjectService: SubjectService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.getSubjects();
        this.dataTable();
        //this.deleteModule();

    }


    dataTable() {
        $('#subjectTable').DataTable({

        });

    }

    /**
     * get subjects' details
     */
    getSubjects() {
        this.subjectService.getSubjectsList()
            .subscribe(
            success => {
                this.subjectList = success.success;
                $("#subjectTable").find('tbody').empty();
                var dataClaims = this.subjectList;
                for (let i = 0; i < dataClaims.length; i++) {
                    $('#subjectTable').dataTable().fnAddData([
                        (i + 1),
                        dataClaims[i].name,
                        dataClaims[i].description,
                        '<a [routerLink]="[' + "'" + "../../../settings/module/update-module" + "'" + ']"' + ' class="fa fa-1x fa-pencil-square-o"></a>',
                        '<a data-toggle="modal" data-target="#deleteModal"><li class="fa  fa-1x fa-trash"></li></a>'
                    ]);
                }
            }
            );
    }

    /**
     * delete role
     */
    // deleteModule() {
    //     this.moduleService.deleteModule(
    //         this.deleteId
    //     ).subscribe(
    //         success => {
    //             this.moduleDeletingStatus = success.success
    //         }
    //         );
    // }
}