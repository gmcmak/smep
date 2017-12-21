import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';
import { ModuleService } from "../../../../../../../services/businessservices/core/module/module.service";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-module',
    templateUrl: 'view-module.component.html',
    styleUrls: ['view-module.component.css']
})

export class ViewModuleComponent implements OnInit{
    public moduleList;
    private loggedInUserList;

    public moduleDeletingStatus;
    public deleteId = 6;

    constructor(
        private moduleService: ModuleService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {
        this.getModules();
        this.dataTable();
        this.deleteModule();

    }


    dataTable() {
        $('#moduleTable').DataTable({

        });

    }

    /**
     * get modules' details
     */
    getModules() {
        this.moduleService.getModulesList()
            .subscribe(
            success => {
                this.moduleList = success.success;
                $("#moduleTable").find('tbody').empty();
                var dataClaims = this.moduleList;
                for (let i = 0; i < dataClaims.length; i++) {
                    $('#moduleTable').dataTable().fnAddData([
                        (i + 1),
                        dataClaims[i].module_name,
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
    deleteModule() {
        this.moduleService.deleteModule(
            this.deleteId
        ).subscribe(
            success => {
                this.moduleDeletingStatus = success.success
            }
        );
    }
}