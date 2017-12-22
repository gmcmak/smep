import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InstituteService } from "../../../../../../services/businessservices/core/institute/institute.service";

declare var $: any;
declare var jQuery: any;

const NIC_REGEX = /^[0-9]{9}[VXvx]/;

@Component({
    selector: 'authorizers',
    templateUrl: 'authorizers.component.html',
    styleUrls: ['authorizers.component.css']
})

export class AuthorizersComponent implements OnInit{
    public authorizerId: string;
    public showDiv: string = 'kamal';

    public id = 14; //institute id
    public authorizersList;

    public addAuthorizerForm: FormGroup;
    constructor(
        private formBuilder: FormBuilder,
        private instituteService: InstituteService
    ) { }

    ngOnInit(): void {
        this.validateAuthorizerId();
        this.dataTable();
        this.getAddedAuthorizers();
    }

    dataTable() {
        $('#authorizerTable').DataTable({
            "language": {
                "search": "Search by: (ID/ Name/ Subject Areas)"
            }

        });
    }

    private validateAuthorizerId(): void {
        this.addAuthorizerForm = this.formBuilder.group({
            'authorizerId': [null, [Validators.required, Validators.pattern(NIC_REGEX)]]
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

    public onSubmit(): void {
        this.showDiv = this.authorizerId;
    }

    /**
    * get added authorizers details 
    */
    public getAddedAuthorizers() {
        this.instituteService.getAddedAuthorizers(
            this.id
        ).subscribe(
            success => {
                this.authorizersList = success.success;
                $("#authorizerTable").find('tbody').empty();
                var dataClaims = this.authorizersList;
                for (let i = 0; i < dataClaims.length; i++) {
                    for(let j=0; j<dataClaims[i].institute_users.length; j++){
                        $('#authorizerTable').dataTable().fnAddData([
                            (i + 1),
                            dataClaims[i].institute_users[j].id,
                            dataClaims[i].institute_users[j].name,
                            '<a>Mathsssss</a>',
                            '<a data-toggle="modal" data-target="#deleteModal"><li class="fa fa-1x fa-trash"></li></a>'
                        ]);
                    }    
                }
            }
            );
    }

}