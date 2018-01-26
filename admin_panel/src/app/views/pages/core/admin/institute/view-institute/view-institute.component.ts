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
    public error = 0;
    public statusId = 0;

    public instituteDeletingStatus;

    ngOnInit(): void {
        this.getInstitutes();
        this.loadTable();
    }

    /**
     * load table
     */
    public loadTable(){
        setTimeout(function () {
            $('#instituteTable').DataTable({
                "language": {
                    "search": "Search by: (Institute's name/ Registered date/ Address)"
                }
            });
        }, 2000);
    }

    /**
     * delete table and reload table
     */
    public deleteTable(){
        var x = 0;
        var table = $('#instituteTable').DataTable();
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
        return {
            'alert-success': this.error === 0,
            'alert-danger': this.error != 0
        }
    }

    constructor(
        private InstituteService: InstituteService,
        private router: Router,
        private localStorageService: LocalStorageStore,
    ) { }

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

    /**
     * change status
     */
    public changeStatus(id, status) {
        if (status == false) {
            this.statusId = 0;
        }
        else {
            this.statusId = 1;
        }
        this.InstituteService.updateInstituteStatus(
            id,
            this.statusId
        ).subscribe(
            success => {
                this.instituteDeletingStatus = success.success;
                this.error = success.error;
                this.hideAlert();
            }
            );
    }
    
    /**
     * delete institute data
     */
    deleteInstitute(deleteId,name) {
        if (confirm("Are you sure to delete ' " + name + " ' ?")) {
            this.InstituteService.deleteInstitute(
                deleteId
            ).subscribe(
                success => {
                    this.instituteDeletingStatus = success.success;
                    this.error = success.error;
                    this.getInstitutes();
                    this.hideAlert();
                    this.deleteTable();
                }
                );
        }
    }

}