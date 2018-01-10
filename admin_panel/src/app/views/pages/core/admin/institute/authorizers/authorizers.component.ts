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

    public institute_id = 19; //institute id
    public authorizersList;

    public authorizerStatus;
    public error=0;
    public instituteDataList;

    public addAuthorizerForm: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private instituteService: InstituteService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.validateAuthorizerId();

        setTimeout(function(){
            $('#authorizerTable').DataTable({
                "language": {
                    "search": "Search by: (ID/ Name/ Subject Areas)"
                }

            });
        }, 2000);

        this.getAddedAuthorizers();
        this.getLoggedUserData();
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
                this.instituteDataList = success.success;
                console.log(this.instituteDataList.id); //logged user id
            }
        );
    }

    /**
     * add authorizer
     */
    addAuthorizer(formData){
        this.instituteService.addAuthorizer(
            this.institute_id = 19,
            formData.authorizerNic
        ).subscribe(
            success => {
                console.log('addAuthorizer ' + success);
                this.error = success.error;
                this.authorizerStatus = success.success;
                this.addAuthorizerForm.reset();
                this.hideAlert();
                this.getAddedAuthorizers();
            }
        );
    }

    /**
    * get added authorizers details 
    */
    public getAddedAuthorizers() {
        this.instituteService.getAddedAuthorizers(
            this.institute_id
        ).subscribe(
            success => {
                this.authorizersList = success.success;
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

                    this.getAddedAuthorizers();
                }
                );
        }
    }

}