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

    public instituteDeletingStatus;

    ngOnInit(): void {
        this.getInstitutes();

        setTimeout(function(){
            $('#instituteTable').DataTable({
                "language": {
                    "search": "Search by: (Institute's name/ Registered date/ Address)"
                }
            });
        }, 2000);
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
     * delete institute data
     */
    deleteInstitute(deleteId){
        this.InstituteService.deleteInstitute(
            deleteId
        ).subscribe(
            success => {
                this.instituteDeletingStatus = success.success;
                this.error = success.error;
                this.getInstitutes();
                this.hideAlert();
            }
        );
    }

}