import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InstituteService } from "../../../../../../services/businessservices/core/institute/institute.service";
import { UserService } from "../../../../../../services/businessservices/core/user/user.service";

declare var $: any;
declare var jQuery: any;

const NIC_REGEX = /^[0-9]{9}[VXvx]/;

@Component({
    selector: 'authorizers',
    templateUrl: 'authorizers.component.html',
    styleUrls: ['authorizers.component.css']
})

export class AuthorizersComponent implements OnInit{
    public authorizerNic: string;
    public showDiv: string = 'kamal';

    public user_id;
    public institute_id; //institute id
    public authorizersList;

    public authorizerStatus;
    public error=0;
    public userDataList;
    public instituteDataList;
    public table;

    public addAuthorizerForm: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private instituteService: InstituteService,
        private userService: UserService
    ) { }

    ngOnInit(): void {

        this.getLoggedUserData();
        this.validateAuthorizerId();
        //this.getAddedAuthorizers();  

        this.loadTable();
        // setTimeout(function(){
        //     $('#authorizerTable').DataTable({
        //         "language": {
        //             "search": "Search by: (ID/ Name/ Subject Areas)"
        //         }

        //     });
        // }, 5000);   
    }

    public loadTable(){
        setTimeout(function () {
            this.table = $('#authorizerTable').DataTable({
                "language": {
                    "search": "Search by: (ID/ Name/ Subject Areas)"
                }

            });
        }, 5000);
    }

    private validateAuthorizerId(): void {
        this.addAuthorizerForm = this.formBuilder.group({
            'authorizerNic': [null, [Validators.required, Validators.pattern(NIC_REGEX)]]
        });
    }

    public isFieldValid(field: string) {
        return !this.addAuthorizerForm.get(field).valid && this.addAuthorizerForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
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
    * change alert design
    */
    public changeAlertClass() {
        return {
            'alert-success': this.error === 0,
            'alert-danger': this.error != 0
        };
        
    }

    /**
    * get logged institute data
    */
    getLoggedUserData() {
        this.userService.getLoggedUser().subscribe(
            success => {
                this.userDataList = success.success;
                this.user_id = this.userDataList.id;
                this.getInstituteId(this.user_id);
            }
        );
    }

    /**
     * add authorizer
     */
    addAuthorizer(formData){
        this.instituteService.addAuthorizer(
            this.institute_id,
            formData.authorizerNic
        ).subscribe(
            success => {
                console.log('addAuthorizer ' + success);
                this.error = success.error;
                this.authorizerStatus = success.success;
                this.addAuthorizerForm.reset();
                this.hideAlert();
                this.getAddedAuthorizers(this.institute_id);
            }
        );
    }

    /**
    * get added authorizers details 
    */
    public getAddedAuthorizers(institute_id) {
        this.instituteService.getAddedAuthorizers(
            institute_id
        ).subscribe(
            success => {
                this.authorizersList = success.success;
                console.log(institute_id);
                this.loadTable();
            }
            );
    }

    /**
     * remove authorizer
     */
    public deleteAuthorizer(deleteId, name) {
        if (confirm("Are you sure to delete ' " + name + " ' ?")) {
            this.instituteService.removeAuthorizer(
                deleteId,
                this.institute_id
            ).subscribe(
                success => {
                    console.log('succes ' + success);
                    this.error = success.error;
                    this.authorizerStatus = success.success;
                    this.hideAlert();
                    
                    this.getAddedAuthorizers(this.institute_id);
                    //this.loadTable();
                }
                );
        }
    }

    public getInstituteId(user_id){
        this.userService.loadInstituteId(
            user_id
        ).subscribe(
            success => {
                this.instituteDataList = success.success;
                this.institute_id = this.instituteDataList[0].id;
                this.getAddedAuthorizers(this.institute_id);
                
            }
        );
    }

}