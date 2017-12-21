import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModuleService } from "../../../../../../../services/businessservices/core/module/module.service";


@Component({
    selector: 'update-module',
    templateUrl: 'update-module.component.html',
    styleUrls: ['update-module.component.css']
})

export class UpdateModuleComponent implements OnInit{
    public module = new Module();
    public moduleForm: FormGroup;
    public moduleList;
    public id;
    public moduleupdatingStatus;

    constructor(
        private formBuilder: FormBuilder,
        private moduleService: ModuleService
    ) { }

    ngOnInit(): void {
        this.initializeModuleForm();
        this.editModule();
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

    /**
     * get role details for update
     */
    editModule() {
        this.moduleService.editModulesList(
            this.id = 7
        ).subscribe(
            success => {
                this.moduleList = success.success;
                this.module.moduleName = this.moduleList[0].module_name;
            }
            );
    }

    /**
     * update role details
     */
    updateModule(formData) {
        this.moduleService.updateModule(
            this.id = 7,
            formData.module_name
        ).subscribe(
            success => {
                this.moduleupdatingStatus = success.success
            }
            );
    }
}

export class Module {
    public moduleName: string;
}