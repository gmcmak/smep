import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormsModule} from '@angular/forms';
import { LocalStorageStore } from '../../../../../../services/storage/local-storage.service';
import { UserService } from "../../../../../../services/businessservices/core/user/user.service";
import { ActivatedRoute } from "@angular/router";

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])/;
const NIC_REGEX = /^[0-9]{9}[VXvx]/;
const MOBILE_REGEX = /^[0-9]{10}/;

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'update-users',
    templateUrl: 'update-users.component.html',
    styleUrls: ['update-users.component.css']
})

export class UpdateUsersComponent implements OnInit{
    
    public user = new User();
    private rolesList;
    private deleted;
    public userForm: FormGroup;
    public userUpdatingStatus;

    public sub: any;
    public id: number;
    public editId: number;
    public editUserList;
    public error = 0;

    constructor(
        private formBuilder: FormBuilder,
        private UserService: UserService,
        private route: ActivatedRoute
    ){
        this.getRoles();
    }

    ngOnInit(): void {
        this.initializeContentProviderForm();

        $("#user_dob").datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true
        }).on('change', e => this.user.dob = e.target.value);

        /**
         * get param id value from the router
         */
        this.sub = this.route.params.subscribe(params => {
            this.editId = +params['id'];
        });

        this.editUser();

    }

    private initializeContentProviderForm(): void{
        this.userForm = this.formBuilder.group({
            'role_id': [null, [Validators.required]],
            'user_fullName': [null, [Validators.required]],
            'user_nameWithInitials': [null, [Validators.required]],
            'user_email': [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
            'user_nic': [null, [Validators.required, Validators.pattern(NIC_REGEX)]],
            'user_gender': [null, [Validators.required]],
            'user_dob': [null, [Validators.required]],
            'user_mobile': [null, [Validators.required, Validators.pattern(MOBILE_REGEX)]],
            'user_designation': [null, [Validators.required]],
            'user_status': [null, [Validators.required]],
            //'user_password1': [null, [Validators.required]],
            //'user_password2': [null, [Validators.required]]
        });
    }

    // { validator: this.checkIfMatchingPasswords('user_password1', 'user_password2') }
    // checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    //     return (group: FormGroup) => {
    //         let passwordInput = group.controls[passwordKey],
    //             passwordConfirmationInput = group.controls[passwordConfirmationKey];
    //         if (passwordInput.value !== passwordConfirmationInput.value) {
    //             return passwordConfirmationInput.setErrors({ notEquivalent: true })
    //         }
    //         else {
    //             if (passwordConfirmationInput.touched) {
    //                 return passwordConfirmationInput.setErrors(null);
    //             }
    //         }
    //     }
    // }

    public isFieldValid(field: string) {
        return !this.userForm.get(field).valid && this.userForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
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

    /**
     * get role list
     * @param  
     */
    getRoles() {
        this.UserService.getRolesList()
            .subscribe(
            success => {
                this.rolesList = success.success;
            }
            );
    }
    
    /**
     * get user details for edit
     */
    editUser(){
        this.UserService.editUsersList(
            this.editId
        ).subscribe(
            success => {
                
                this.editUserList = success.success;
                this.user.admin_level = this.editUserList[0].role_id;
                this.user.dob = this.editUserList[0].birthday;
                this.user.designation = this.editUserList[0].designation;
                this.user.email = this.editUserList[0].email;
                this.user.fullName = this.editUserList[0].name;
                this.user.gender = this.editUserList[0].gender;
                this.user.mobile = this.editUserList[0].mobile;
                this.user.nameWithInitials = this.editUserList[0].name_with_initials;
                this.user.nic = this.editUserList[0].nic;
                this.user.status = this.editUserList[0].status;
                // this.user.password1 = this.editUserList[0].password;
                // this.user.password2 = this.editU,
            }
        );
    }
    /**
     * update user's details
     */
    updateUser(formData){
        this.UserService.updateUserList(
            this.editId,
            formData.role_id,
            formData.user_fullName,
            formData.user_nameWithInitials,
            formData.user_email,
            formData.user_nic,
            formData.user_mobile,
            formData.user_designation,
            formData.user_gender,
            formData.user_dob,
            formData.user_status,
            this.deleted=0
        ).subscribe(
            success => {
                this.userUpdatingStatus = success.success;
                this.error = success.error;
                this.userForm.reset();
                this.hideAlert();
            }
        );
    }

}

export class User {
    public admin_level: number;
    public fullName: string;
    public nameWithInitials: string;
    public email: string;
    public nic: string;
    public gender: string;
    public mobile: number;
    public dob: string; //have to correct the date data type
    public designation: string;
    public status: boolean;
    // public password1: string;
    // public password2: string;
}