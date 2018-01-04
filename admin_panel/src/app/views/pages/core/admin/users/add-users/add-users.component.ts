import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, NgForm} from '@angular/forms';
import { equalSegments } from "@angular/router/src/url_tree";
import { LocalStorageStore } from '../../../../../../services/storage/local-storage.service';
import { UserService } from "../../../../../../services/businessservices/core/user/user.service";


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])/;
const NIC_REGEX = /^[0-9]{9}[VXvx]/;
const MOBILE_REGEX = /^[0-9]{10}/;

declare var $: any;
declare var jQuery: any;


@Component({
    selector: 'add-users',
    templateUrl: 'add-users.component.html',
    styleUrls: ['add-users.component.css']
})

export class AddUsersComponent implements OnInit {

    public user = new User();
    private rolesList;
    private deleted;
    public userForm: FormGroup;
    private userRegisterStatus;
    constructor(
        private formBuilder: FormBuilder,
        private UserService:UserService
    ) {
        this.getRoles();
    }

    ngOnInit(): void {
        this.initializeUserForm();

        $("#user_dob").datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true
        }).on('change', e => this.user.dob = e.target.value);
    }

    private initializeUserForm(): void {
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
            'user_password1': [null, [Validators.required]],
            'user_password2': [null, [Validators.required]]
        }, { validator: this.checkIfMatchingPasswords('user_password1','user_password2') });
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
     * add user
     * @param 
     */
    addUser(formData){
        this.UserService.addUser(
            formData.user_fullName,
            formData.user_nameWithInitials,
            formData.user_email,
            formData.user_nic,
            formData.user_gender,
            formData.user_dob,
            formData.user_mobile,
            formData.user_designation,
            formData.user_status,
            formData.user_password1,
            formData.user_password2,
            formData.role_id,
            this.deleted=0
        ).subscribe( 
            success => {
                this.userRegisterStatus = success.success.message;
                this.userForm.reset();
                this.hideAlert();
            }
        ); 
        
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
        return !this.userForm.get(field).valid && this.userForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }

    /**
     * get role list
     * @param  
     */
    getRoles() {
        this.UserService.getRolesList()
            .subscribe( 
                success => {
                    this.rolesList = success.success
                }
            );      
    } 
        
   
}

export class User{
    public admin_level: string;
    public fullName: string;
    public nameWithInitials: string;
    public email: string;
    public nic: string;
    public gender: string;
    public mobile: number;
    public dob: string; //have to correct the date data type
    public designation: string;
    public status: string;
    public password1: string;
    public password2: string;
}

