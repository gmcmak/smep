import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

declare var $: any;
declare var jQuery: any;

const NIC_REGEX = /^[0-9]{9}[VX]/;

@Component({
    selector: 'authorizers',
    templateUrl: 'authorizers.component.html',
    styleUrls: ['authorizers.component.css']
})

export class AuthorizersComponent implements OnInit{
    public authorizerId: string;
    public showDiv: string = 'kamal';

    public addAuthorizerForm: FormGroup;
    constructor(private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.validateAuthorizerId();
        this.dataTable();
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
}