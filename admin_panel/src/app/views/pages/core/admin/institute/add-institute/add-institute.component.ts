import {Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])/;
const NIC_REGEX = /^[0-9]{9}[VX]/;
const MOBILE_REGEX = /^[0-9]{10}/;

@Component({
    selector: 'add-institute',
    templateUrl: 'add-institute.component.html',
    styleUrls: ['add-institute.component.css']
})

export class AddInstituteComponent implements OnInit{
    public instName: string;
    public regNo: string;
    public dateOfReg: string;
    public adrz: string;
    public mobileNum: string;
    public instEmail:string;
    public foreignUni:string;
    public instId:string;
    public check2:boolean;

    public fullName:string;
    public nameWithInitials:string;
    public email:string;
    public nic:string;
    public mobile:string;
    public designation:string;
    public gender:string;
    public dob:string;
    public status:boolean;
    public password1:string;
    public password2:string;

    public instituteForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit(): void {
       this.initializeInstituteForm();

    }

    private initializeInstituteForm(): void{
        this.instituteForm = this.formBuilder.group({
            'instName': [null, Validators.required],
            'regNo': [null,Validators.required],
            'dateOfReg': [null,Validators.required],
            'adrz': [null, Validators.required],
            'mobileNum': [null, [Validators.required, Validators.pattern(MOBILE_REGEX)]],
            'instEmail': [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
            'foreignUni': [null, Validators.required],
            'instId': [null],
            'check2':[null],
            'user_fullName': [null, Validators.required],
            'user_nameWithInitials': [null, Validators.required],
            'user_email': [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
            'user_nic': [null, [Validators.required, Validators.pattern(NIC_REGEX)]],
            'user_mobile': [null, [Validators.required, Validators.pattern(MOBILE_REGEX)]],
            'user_designation': [null, Validators.required],
            'user_gender': [null, Validators.required],
            'user_dob': [null, Validators.required],
            'user_status': [null, Validators.required],
            'user_password1': [null, Validators.required],
            'user_password2': [null,Validators.required]   
        }, { validator: this.checkIfMatchingPasswords('user_password1', 'user_password2') });
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
        return !this.instituteForm.get(field).valid && this.instituteForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }
    
}