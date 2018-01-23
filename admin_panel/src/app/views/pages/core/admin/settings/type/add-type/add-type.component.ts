import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeService } from "../../../../../../../services/businessservices/core/type/type.service";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'add-type',
    templateUrl: 'add-type.component.html',
    styleUrls: ['add-type.component.css']
})

export class AddTypeComponent implements OnInit{
    public type = new Type();
    public typeForm: FormGroup;
    public typeAddingStatus;
    public error = 0;

    constructor(
        private formBuilder: FormBuilder,
        private typeService: TypeService
    ) { }

    ngOnInit(): void {
        this.initializeTypeForm();
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
    public changeAlertClass() {
        return {
            'alert-success': this.error === 0,
            'alert-danger': this.error != 0
        }
    }

    private initializeTypeForm(): void {
        this.typeForm = this.formBuilder.group({
            'type_name': [null, [Validators.required]],
            'type_description': [null, [Validators.required]]
        });
    }

    public isFieldValid(field: string) {
        return !this.typeForm.get(field).valid && this.typeForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }

    addType(dataForm) {
        this.typeService.insertTypeData(
            dataForm.type_name,
            dataForm.type_description
        ).subscribe(
            success => {
                this.typeAddingStatus = success.success;
                this.error = success.error;
                this.typeForm.reset();
                this.hideAlert();
            }
            );
    }
}

export class Type {
    public typeName: string;
    public typeDescription: string;
}