import {Component,OnInit} from '@angular/core';
import { InstituteService } from '../../../../../../services/businessservices/core/institute/institute.service';
import { Router } from '@angular/router';
import { LocalStorageStore } from '../../../../../../services/storage/local-storage.service';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-institute',
    templateUrl: 'view-institute.component.html',
    styleUrls: ['view-institute.component.css']
})

export class ViewInstituteComponent implements OnInit{

    public instituteList;
    private loggedInUserList;

    ngOnInit(): void {
        this.dataTable();
        this.getInstitutes();
    }

    constructor(
        private InstituteService: InstituteService,
        private router: Router,
        private localStorageService: LocalStorageStore,
    ) { }

    dataTable() {
        $('#instituteTable').DataTable({
            "language": {
                "search": "Search by: (Institute's name/ Registered date/ Address)"
            }
        });
    }

    /**
   * institute data list
   * @param  
   */
    getInstitutes() {
        this.InstituteService.getInstitutesList()
            .subscribe(
            success => {
                this.instituteList = success.success;
            }
            );
    } 

}