import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { InstituteService } from "../../../../../../services/businessservices/core/institute/institute.service";
import { ActivatedRoute } from "@angular/router";


const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])/;
const NIC_REGEX = /^[0-9]{9}[VXvx]/;
const MOBILE_REGEX = /^[0-9]{10}/;

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'update-institute',
    templateUrl: 'update-institute.component.html',
    styleUrls: ['update-institute.component.css']
})

export class UpdateInstituteComponent implements OnInit{
    public institute = new Institute();
    public check2: boolean;
    public instituteForm: FormGroup;
    public instituteUpdatingStatus;
    private deleted;

    public sub: any;
    public id: number;
    public editId;
    public instituteList;
    //public id=19;

    constructor(
        private formBuilder: FormBuilder,
        private instituteService: InstituteService,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit(): void {
        this.initializeInstituteForm();

        $("#dateOfReg").datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true
        }).on('change', e => this.institute.dateOfReg = e.target.value);

        $("#user_dob").datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true
        }).on('change', e => this.institute.instUser.dob = e.target.value);

        /**
         * get param id value from the router
         */
        this.sub = this.route.params.subscribe(params => {
            this.editId = +params['id'];
        });

        this.editInstitute();

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

    private initializeInstituteForm(): void {
        this.instituteForm = this.formBuilder.group({
            instName: new FormControl(null, [Validators.required]),
            regNo: new FormControl(null, [Validators.required]),
            dateOfReg: new FormControl(null, [Validators.required]),
            adrz: new FormControl(null, [Validators.required]),
            mobileNum: new FormControl(null, [Validators.required, Validators.pattern(MOBILE_REGEX)]),
            instEmail: new FormControl(null, [Validators.required, Validators.pattern(EMAIL_REGEX)]),
            instStatus: new FormControl(null, [Validators.required]),
            //instId: new FormControl('', []),
            //check2: new FormControl('', [Validators.required]),
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
            //user_password1: new FormControl('', [Validators.required]),
            //user_password2: new FormControl('', [Validators.required])
        });
    }

    //, { validator: this.checkIfMatchingPasswords('user_password1', 'user_password2') }
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
        return !this.instituteForm.get(field).valid && this.instituteForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }

    /**
     * get institute details for update
     */
    editInstitute(){
        this.instituteService.editInstitute(
            this.editId
        ).subscribe(
            success => {
                this.instituteList = success.success;
                this.institute.instName = this.instituteList[0].name;
                this.institute.adrz = this.instituteList[0].address;
                this.institute.dateOfReg = this.instituteList[0].registered_date;
                this.institute.instEmail = this.instituteList[0].email;
                this.institute.instStatus = this.instituteList[0].status;
                this.institute.mobileNum = this.instituteList[0].contact_number;
                this.institute.regNo = this.instituteList[0].registration_number;
                this.institute.instUser.fullName = this.instituteList[0].institute_users[0].name;
                this.institute.instUser.designation = this.instituteList[0].institute_users[0].designation;
                this.institute.instUser.dob = this.instituteList[0].institute_users[0].birthday;
                this.institute.instUser.email = this.instituteList[0].institute_users[0].email;
                this.institute.instUser.gender = this.instituteList[0].institute_users[0].gender;
                this.institute.instUser.mobile = this.instituteList[0].institute_users[0].mobile;
                this.institute.instUser.nameWithInitials = this.instituteList[0].institute_users[0].name_with_initials;
                this.institute.instUser.nic = this.instituteList[0].institute_users[0].nic;
                this.institute.instUser.status = this.instituteList[0].institute_users[0].status;
            }
        );
    }

    /**
     * update institute data
     */
    updateInstitute(formData) {
        this.instituteService.updateInstitute(
            this.editId,
            formData.instName,
            formData.regNo,
            formData.dateOfReg,
            formData.adrz,
            formData.mobileNum,
            formData.instEmail,
            formData.instStatus,
            this.deleted = 0,
            formData.userInfo.user_fullName,
            formData.userInfo.user_nameWithInitials,
            formData.userInfo.user_email,
            formData.userInfo.user_nic,
            formData.userInfo.user_mobile,
            formData.userInfo.user_designation,
            formData.userInfo.user_gender,
            formData.userInfo.user_dob,
            formData.userInfo.user_status
        ).subscribe(
            success => {
                this.instituteUpdatingStatus = success.success;
                this.instituteForm.reset();
                this.hideAlert();
            }
            );
    }

    
}

export class Institute {

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

export class InstUser {
    public fullName: string;
    public nameWithInitials: string;
    public email: string;
    public nic: string;
    public mobile: string;
    public designation: string;
    public gender: string;
    public dob: string;
    public status: boolean;
    // public password1: string;
    // public password2: string;
}