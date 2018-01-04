import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from "../../../../../../../services/businessservices/core/settings/role.service";
import { ActivatedRoute } from "@angular/router";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'update-role.component.ts',
    templateUrl: 'update-role.component.html',
    styleUrls: ['update-role.component.css']
})

export class UpdateRoleComponent implements OnInit{

    public role = new Role();
    public roleForm: FormGroup;
    public roleList;

    public sub: any;
    public id: number;
    public editId: number;
    public roleupdatingStatus;

    constructor(
        private formBuilder: FormBuilder,
        private roleService: RoleService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.initializeRoleForm();

        /**
         * get param id value from the router
         */
        this.sub = this.route.params.subscribe(params => {
            this.editId = +params['id'];
        });

        this.editRole();
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

    /**
     * get role details for update
     */
    editRole(){
        this.roleService.editRolesList(
            this.editId
        ).subscribe(
            success => {
                this.roleList = success.success;
                this.role.roleName = this.roleList[0].name;
                this.role.roleStatus = this.roleList[0].status;
            }
        );
    }

    /**
     * update role details
     */
    updateRole(formData){
        this.roleService.updateRoleList(
            this.editId,
            formData.role_name,
            formData.role_status
        ).subscribe(
            success => {
                this.roleupdatingStatus = success.success;
                this.roleForm.reset();
                this.hideAlert();
            }
        );
    }
}

export class Role {
    public roleName: string;
    public roleStatus: string;
}