import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleService } from "../../../../../../../services/businessservices/core/module/module.service";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'add-module',
    templateUrl: 'add-module.component.html',
    styleUrls: ['add-module.component.css']
})

export class AddModuleComponent implements OnInit{
    public module = new Module();
    public moduleForm: FormGroup;
    public moduleAddingStatus;
    public error = 0;

    constructor(
        private formBuilder: FormBuilder,
        private moduleService: ModuleService
    ) { }

    ngOnInit(): void {
        this.initializeModuleForm();
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
        return{
            'alert-success': this.error === 0,
            'alert-danger': this.error != 0
        }
    }

    private initializeModuleForm(): void {
        this.moduleForm = this.formBuilder.group({
            'module_name': [null, [Validators.required]]
        });
    }

    public isFieldValid(field: string) {
        return !this.moduleForm.get(field).valid && this.moduleForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }

    addModule(dataForm) {
        this.moduleService.addModule(
            dataForm.module_name
        ).subscribe(
            success => { 
                this.moduleAddingStatus = success.success;
                this.error = success.error;
                this.moduleForm.reset();
                this.hideAlert();
            }
        );
    }
}

export class Module {
    public moduleName: string;
}