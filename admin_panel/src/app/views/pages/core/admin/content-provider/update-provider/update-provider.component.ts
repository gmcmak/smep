import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormsModule, FormBuilder } from '@angular/forms';
import CustomValidators from '../../../../../../common/validation/CustomValidators';

declare var $: any;
declare var jQuery: any;
const NIC_REGEX = /^[0-9]{9}[VXvx]/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const MOBILE_REGEX = /^[0-9]*$/;

@Component({
    selector: 'update-provider',
    templateUrl: 'update-provider.component.html',
    styleUrls: ['update-provider.component.css']
})

export class UpdateProvidersComponent implements OnInit{

    public provider = new Provider();

    public individualForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {

    }
    ngOnInit(): void {

        this.initializeContentProviderForm();

        $("#cpDob").datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true
        }).on('change', e => this.provider.cpDob = e.target.value);
    }

    private initializeContentProviderForm(): void {
        this.individualForm = this.formBuilder.group({
            cpName: new FormControl('', Validators.required),
            cpFullName: new FormControl('', Validators.required),
            gender: new FormControl('', Validators.required),
            cpNic: new FormControl('', [Validators.required, Validators.pattern(NIC_REGEX)]),
            cpDesignation: new FormControl('', Validators.required),
            cpDob: new FormControl('', Validators.required),
            cpEmail: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
            cpMobile: new FormControl('', [Validators.required, Validators.pattern(MOBILE_REGEX), Validators.minLength(10)]),
            cpPassword1: new FormControl('', [Validators.required]),
            cpPassword2: new FormControl('', [Validators.required]),
            highestQulification: new FormGroup({
                highest_quali: new FormControl('', [Validators.required]),
                highest_uni: new FormControl('', [Validators.required]),
                highest_grade: new FormControl('', [Validators.required]),
                highest_Country: new FormControl('', [Validators.required]),
                highest_Year: new FormControl('', [Validators.required])
            }),
            professionalQualification: new FormGroup({
                pro_qualification_1: new FormControl(''),
                pro_institute_1: new FormControl(),
                pro_grade_1: new FormControl(),
                pro_year_1: new FormControl(),
                pro_country_1: new FormControl(),

                pro_qualification_2: new FormControl(),
                pro_institute_2: new FormControl(),
                pro_grade_2: new FormControl(),
                pro_year_2: new FormControl(),
                pro_country_2: new FormControl(),


                pro_qualification_3: new FormControl(),
                pro_institute_3: new FormControl(),
                pro_grade_3: new FormControl(),
                pro_year_3: new FormControl(),
                pro_country_3: new FormControl()
            }),
            otherInfo: new FormGroup({
                expert1: new FormControl(),
                expert2: new FormControl(),
                expert3: new FormControl(),
                radioValue: new FormControl(),
                courses: new FormControl(),
                cpId: new FormControl(),

            }),
            check1: new FormControl('', Validators.required)
        }, { validator: this.checkIfMatchingPasswords('cpPassword1', 'cpPassword2') })
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
        return !this.individualForm.get(field).valid && this.individualForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }

    onSubmit() {
        console.log(this.individualForm.value);
    }

    //show professional qualification row2
    show_row2() {
        $("#row_2").show();
        $("#add_btn_row1").hide();
        $("#add_btn_row2").show();
    }

    //show professional qualification row3
    show_row3() {
        $("#row_3").show();
        $("#add_btn_row2").hide();
    }

    //hide professional qualification row2
    hide_row2() {
        $("#row_2").hide();
        $("#add_btn_row1").show();
    }

    //hide professional qualification row3
    hide_row3() {
        $("#row_3").hide();
        $("#add_btn_row2").show();
    }

    //add expertise subject dropdown2
    add_subject2() {
        $("#add_subject_btn1").hide();
        $("#expert_subject2").show();
        $("#add_subject_btn2").show();
        $("#remove_subject_btn2").show();
    }

    //add expertise subject dropdown3
    add_subject3() {
        $("#add_subject_btn2").hide();
        $("#expert_subject3").show();
        $("#add_subject_btn3").hide();
        $("#remove_subject_btn3").show();
    }

    //remove expertise dropdown2
    remove_subject2() {
        $("#expert_subject2").hide();
        $("#remove_subject_btn2").hide();
        $("#add_subject_btn2").hide();
        $("#add_subject_btn1").show();
    }

    //remove expertise dropdown3
    remove_subject3() {
        $("#expert_subject3").hide();
        $("#remove_subject_btn3").hide();
        $("#add_subject_btn1").show();
    }

    //add expert subject dropdown2 (institute form)
    add_expert_sub2() {
        $("#add_sub_btn1").hide();
        $("#expert_sub2").show();
        $("#add_sub_btn2").show();
        $("#remove_sub_btn2").show();
    }

    //add expert subject dropdown3 (institute form)
    add_expert_sub3() {
        $("#add_sub_btn2").hide();
        $("#expert_sub3").show();
        $("#add_sub_btn3").hide();
        $("#remove_sub_btn3").show();
    }

    //remove expert subject dropdown2 (institute form)
    remove_expert_sub2() {
        $("#expert_sub2").val("");
        $("#expert_sub2").hide();
        $("#remove_sub_btn2").hide();
        $("#add_sub_btn2").hide();
        $("#add_sub_btn1").show();
    }

    //remove expert subject dropdown3 (institute form)
    remove_expert_sub3() {
        $("#expert_sub3").val("");
        $("#expert_sub3").hide();
        $("#remove_sub_btn3").hide();
        $("#add_sub_btn1").show();
    }

    showCalander1() {
        $("#cpDob").datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true
        });

        //this.cpDob = $("#cpDob").val(); 
    }
}

export class Provider {
    public cpName: string;
    public cpFullName: string;
    public gender: string;
    public cpNic: string;
    public cpDesignation: string;
    public cpDob: string;
    public cpEmail: string;
    public cpMobile: number;
    public cpPassword1: string;
    public cpPassword2: string;

    public highestQualification = new HighestQualification();
}

export class HighestQualification {
    public highest_quali: string;
    public highest_uni: string;
    public highest_grade: string;
    public highest_Country: number;
    public highest_Year: number;
}