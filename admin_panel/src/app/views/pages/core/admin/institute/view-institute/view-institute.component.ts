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
                $("#instituteTable").find('tbody').empty();
                var dataClaims = this.instituteList;
                for (let i = 0; i < dataClaims.length; i++) {
                    $('#instituteTable').dataTable().fnAddData([
                        (i + 1),
                        dataClaims[i].name,
                        dataClaims[i].registration_number,
                        dataClaims[i].registered_date,
                        dataClaims[i].email,
                        dataClaims[i].contact_number,
                        dataClaims[i].address,
                        '<label class="switch"><input type= "checkbox" value= "'+dataClaims[i].status+'" ><span class="slider round" > </span></label>',
                        '<a id="'+dataClaims[i].id+'" class="updateContent fa fa-1x fa-pencil-square-o"></a>',
                        '<a data-toggle="modal" data-target="#deleteModal"><li class="fa fa-1x fa-trash"></li></a>'
                    ]);
                }
            }
            );
    } 


    updateRedirect(id){
        this.router.navigate(['../../institute/update-institute']);
    }


    /**
    * user data list
    * @param  
    */
    // getUsers() {
    //     this.UserService.getUsersList()
    //         .subscribe(
    //         success => {
    //             this.usersList = success.success;
    //             $("#dataTableUsers").find('tbody').empty();
    //             var dataClaims = this.usersList;
    //             for (let i = 0; i < dataClaims.length; i++) {
    //                 $('#dataTableUsers').dataTable().fnAddData([
    //                     (i + 1),
    //                     dataClaims[i].name,
    //                     dataClaims[i].email,
    //                     dataClaims[i].role.name,
    //                     '<a [routerLink]="[' + "../../users/update-users" + ']"' + ' class="fa fa-1x fa-pencil-square-o"></a>',
    //                     '<a data-toggle="modal" data-target="#deleteModal"><li class="fa  fa-1x fa-trash"></li></a>'
    //                 ]);
    //             }
    //         }
    //         );
    // }        

}