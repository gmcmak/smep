import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage/dist/local-storage.service';
import { TypeService } from "../../../../../../../services/businessservices/core/type/type.service";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-type',
    templateUrl: 'view-type.component.html',
    styleUrls: ['view-type.component.css']
})

export class ViewTypeComponent implements OnInit{

    public typeList = new Array();

    constructor(
        private router: Router,
        private localStorageService: LocalStorageService,
        private typeService: TypeService
    ) { }
    
    ngOnInit(): void {
        setTimeout(function () {
            $('#typeTable').DataTable({
            });

        }, 2000);

        this.getTypes();
    }

    /**
     * get types' details
     */
    getTypes() {
        this.typeService.getTypeData()
            .subscribe(
            success => {
                this.typeList = success.success;
            }
            );
    }

}