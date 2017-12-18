import {Component,OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { equalSegments } from "@angular/router/src/url_tree";
import { InstituteService } from '../../../../../../services/businessservices/core/institute/institute.service';


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])/;
const NIC_REGEX = /^[0-9]{9}[VX]/;
const MOBILE_REGEX = /^[0-9]{10}/;

declare var $:any;
declare var jQuery:any;

@Component({
    selector: 'add-institute',
    templateUrl: 'add-institute.component.html',
    styleUrls: ['add-institute.component.css']
})

export class AddInstituteComponent implements OnInit{

    public institute = new Institute();

    public check2: boolean;

    public instituteForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private instituteService: InstituteService
    ) {
        
    }

    ngOnInit(): void {
        this.initializeInstituteForm();

        $("#dateOfReg").datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true
        }).on('change', e => this.institute.dateOfReg = e.target.value);

        $("#user_dob").datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true
        }).on('change', e => this.institute.instUser.dob = e.target.value);

    }

    private initializeInstituteForm(): void{
        this.instituteForm = this.formBuilder.group({
            instName: new FormControl(null, [Validators.required]),
            regNo: new FormControl(null, [Validators.required]),
            dateOfReg: new FormControl(null, [Validators.required]),
            adrz: new FormControl(null, [Validators.required]),
            mobileNum: new FormControl(null, [Validators.required, Validators.pattern(MOBILE_REGEX)]),
            instEmail: new FormControl(null, [Validators.required, Validators.pattern(EMAIL_REGEX)]),
            instStatus: new FormControl(null, [Validators.required]),
            instId: new FormControl('',[]),
            check2: new FormControl('', [Validators.required]),
            userInfo: new FormGroup({
                user_fullName: new FormControl('', [Validators.required]),
                user_nameWithInitials: new FormControl('', [Validators.required]),
                user_email: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
                user_nic: new FormControl('', [Validators.required, Validators.pattern(NIC_REGEX)]),
                user_mobile: new FormControl('', [Validators.required, Validators.pattern(MOBILE_REGEX)]),
                user_designation: new FormControl('', [Validators.required]),
                user_gender: new FormControl('', [Validators.required]),
                user_dob: new FormControl('', [Validators.required]),
                user_status: new FormControl('', [Validators.required])                
            }),
            user_password1: new FormControl('', [Validators.required]),
            user_password2: new FormControl('', [Validators.required])    
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

    /**
     * insert institute data
     */
    // addInstitute(formData){
    //     this.instituteService.addInstitute(
    //         formData.instName,
    //         formData.regNo,
    //         formData.dateOfReg,
    //         formData.adrz,
    //         formData.mobileNum,
    //         formData.instEmail,
    //         formData.

    //     ).subcribe(
    //         success => {}
    //     );
    // }
    
}

export class Institute{

    public instName: string;
    public regNo: string;
    public dateOfReg: string;
    public adrz: string;
    public mobileNum: string;
    public instEmail: string;
    public instStatus: boolean;
    public instId: string;
    
    public instUser = new InstUser();
}

export class InstUser{
    public fullName: string;
    public nameWithInitials: string;
    public email: string;
    public nic: string;
    public mobile: string;
    public designation: string;
    public gender: string;
    public dob: string;
    public status: boolean;
    public password1: string;
    public password2: string;
}