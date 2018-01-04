import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../../../../../../../services/businessservices/core/settings/role.service';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'add-role',
    templateUrl: 'add-role.component.html',
    styleUrls: ['add-role.component.css']
})

export class AddRoleComponent implements OnInit{
    
    public role = new Role();
    public roleForm: FormGroup;
    public roleAddingStatus;

    constructor(
        private formBuilder: FormBuilder,
        private roleService: RoleService
    ) {}

    ngOnInit(): void {
        this.initializeRoleForm();
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

    private initializeRoleForm(): void {
        this.roleForm = this.formBuilder.group({
            'role_name': [null, [Validators.required]],
            'role_status': [null, [Validators.required]]
        });
    }

    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ notEquivalent: true })
            }
            else {
                if (passwordConfirmationInput.touched) {
                    return passwordConfirmationInput.setErrors(null);
                }
            }
        }
    }

    public isFieldValid(field: string) {
        return !this.roleForm.get(field).valid && this.roleForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }

    addRole(dataForm){
        this.roleService.addRoleList(
            dataForm.role_name,
            dataForm.role_status
        ).subscribe(
            success => {
                this.roleAddingStatus = success.success;
                this.roleForm.reset();
                this.hideAlert();
            }
        );
    }
}

export class Role{
    public roleName: string;
    public roleStatus: string;
}