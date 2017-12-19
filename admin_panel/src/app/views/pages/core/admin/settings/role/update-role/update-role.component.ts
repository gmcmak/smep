import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from "../../../../../../../services/businessservices/core/settings/role.service";

@Component({
    selector: 'update-role.component.ts',
    templateUrl: 'update-role.component.html',
    styleUrls: ['update-role.component.css']
})

export class UpdateRoleComponent implements OnInit{

    public role = new Role();
    public roleForm: FormGroup;
    public roleList;
    public id;

    constructor(
        private formBuilder: FormBuilder,
        private roleService: RoleService
    ) {}

    ngOnInit(): void {
        this.initializeRoleForm();
        this.editRole();
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

    /**
     * get role details for update
     */
    editRole(){
        this.roleService.editRolesList(
            this.id=1
        ).subscribe(
            success => {
                this.roleList = success.success;
                this.role.roleName = this.roleList[0].name;
                this.role.roleStatus = this.roleList[0].status;
            }
        );
    }
}

export class Role {
    public roleName: string;
    public roleStatus: string;
}