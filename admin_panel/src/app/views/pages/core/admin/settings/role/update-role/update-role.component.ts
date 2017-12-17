import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'update-role.component.ts',
    templateUrl: 'update-role.component.html',
    styleUrls: ['update-role.component.css']
})

export class UpdateRoleComponent implements OnInit{

    public role = new Role();

    public roleForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit(): void {
        this.initializeRoleForm();
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
}

export class Role {
    public roleName: string;
    public roleStatus: string;
}