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

    constructor(
        private moduleService: ModuleService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit(): void {

        setTimeout(function(){
            $('#moduleTable').DataTable({
            });
 
        }, 2000);

        this.getModules();
    }

    /**
     * get modules' details
     */
    getModules() {
        this.moduleService.getModulesList()
            .subscribe(
            success => {
                this.moduleList = success.success;
            }
            );
    }
}