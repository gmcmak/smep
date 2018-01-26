import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from "@angular/router";
import { TypeService } from "../../../../../../../services/businessservices/core/type/type.service";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'update-type',
    templateUrl: 'update-type.component.html',
    styleUrls: ['update-type.component.css']
})

export class UpdateTypeComponent implements OnInit{
    public type = new Type();
    public typeForm: FormGroup;
    public typeList;
    public error = 0;

    public id: number;
    public sub: any;
    public typeUpdatingStatus;

    constructor(
        private formBuilder: FormBuilder,
        private typeService: TypeService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        /**
        * get param id value from the router
        */
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });

        this.editType();
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

    /**
     * get role details for update
     */
    public editType() {
        this.typeService.editTypeData(
            this.id
        ).subscribe(
            success => {
                this.typeList = success.success;
                this.type.typeName = this.typeList[0].name;
                this.type.typeDescription = this.typeList[0].description;
            }
            );
    }

    /**
     * update role details
     */
    public updateType(formData) {
        this.typeService.updateTypeData(
            this.id,
            formData.type_name,
            formData.type_description
        ).subscribe(
            success => {
                this.typeUpdatingStatus = success.success;
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