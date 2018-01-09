import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormsModule, FormBuilder} from '@angular/forms';
import CustomValidators from '../../../../../../common/validation/CustomValidators';
import { CountryService } from "../../../../../../services/businessservices/core/country/country.service";
import { SubjectService } from "../../../../../../services/businessservices/core/subject-area/subject.service";
import { ProviderService } from "../../../../../../services/businessservices/core/content-provider/provider.service";

declare var $: any;
declare var jQuery: any;
const NIC_REGEX = /^[0-9]{9}[VXvx]/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const MOBILE_REGEX = /^[0-9]*$/;

@Component({
    selector: 'add-providers',
    templateUrl: 'add-providers.component.html',
    styleUrls: ['add-providers.component.css']
})

export class AddProvidersComponent implements OnInit{

    public provider = new Provider();
    public year;
    public yearList = Array();

    public countryList;
    public subjectList;
    public providerRegisterStatus;
    private deleted;
    private status;

    public error = 0;
   
    public individualForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private countryService: CountryService,
        private subjectService: SubjectService,
        private providerService: ProviderService
    ) {}
    ngOnInit(): void {

        this.initializeContentProviderForm();

        $("#cpDob").datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true
        }).on('change', e => this.provider.cpDob = e.target.value);

        this.getCountry();
        this.showYear();
        this.getSubjectAreas();
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
         * get country
         */
    getCountry() {
        this.countryService.getCountryList().subscribe(
            success => {
                this.countryList = success.success
            }
        );
    }

    /**
     * get subject areas
     */
    getSubjectAreas() {
        this.subjectService.getSubjectsList().subscribe(
            success => {
                this.subjectList = success.success
            }
        );
    }

    /**
     * show year dropdown
     */
    showYear() {
        this.year = (new Date()).getFullYear();
        for (let i = 0; i <= 20; i++) {
            this.yearList[i] = this.year - i;
        }
    }

    private initializeContentProviderForm(): void{
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
                    expert3: new FormControl()

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

    //show professional qualification row2
    show_row2(){
        $("#row_2").show();
        $("#add_btn_row1").hide();
        $("#add_btn_row2").show();
    }

    //show professional qualification row3
    show_row3(){
        $("#row_3").show();
        $("#add_btn_row2").hide();
    }

    //hide professional qualification row2
    hide_row2(){
        $("#row_2").hide();
        $("#add_btn_row1").show();
        this.provider.professionalQualification.pro_country_2 = null;
        this.provider.professionalQualification.pro_grade_2 = null;
        this.provider.professionalQualification.pro_institute_2 = null;
        this.provider.professionalQualification.pro_qualification_2 = null;
        this.provider.professionalQualification.pro_year_2 = null;
    }

    //hide professional qualification row3
    hide_row3(){
        $("#row_3").hide();
        $("#add_btn_row2").show();
        this.provider.professionalQualification.pro_country_3 = null;
        this.provider.professionalQualification.pro_grade_3 = null;
        this.provider.professionalQualification.pro_institute_3 = null;
        this.provider.professionalQualification.pro_qualification_3 = null;
        this.provider.professionalQualification.pro_year_3 = null;
    }

    //add expertise subject dropdown2
    add_subject2(){
        $("#add_subject_btn1").hide();
        $("#expert_subject2").show();
        $("#add_subject_btn2").show();
        $("#remove_subject_btn2").show();
    }

    //add expertise subject dropdown3
    add_subject3(){
        $("#add_subject_btn2").hide();
        $("#expert_subject3").show();
        $("#add_subject_btn3").hide();
        $("#remove_subject_btn3").show();
    }

    //remove expertise dropdown2
    remove_subject2(){
        $("#expert_subject2").hide();
        $("#remove_subject_btn2").hide();
        $("#add_subject_btn2").hide();
        $("#add_subject_btn1").show();
        this.provider.subjectAreas.expert2 = null;
    }

    //remove expertise dropdown3
    remove_subject3(){
        $("#expert_subject3").hide();
        $("#remove_subject_btn3").hide();
        $("#add_subject_btn1").show();
        this.provider.subjectAreas.expert3 = null;
    }

    /**
     * insert provider's details
     */
    addProvider(formData){
        this.providerService.insertProvider(
            formData.cpName,
            formData.cpFullName,
            formData.gender,
            formData.cpNic,
            formData.cpDesignation,
            formData.cpDob,
            formData.cpEmail,
            formData.cpMobile,
            formData.cpPassword1,
            formData.cpPassword2,

            formData.highestQulification.highest_quali,
            formData.highestQulification.highest_uni,
            formData.highestQulification.highest_grade,
            formData.highestQulification.highest_Country,
            formData.highestQulification.highest_Year,

            formData.professionalQualification.pro_qualification_1,
            formData.professionalQualification.pro_institute_1,
            formData.professionalQualification.pro_grade_1,
            formData.professionalQualification.pro_year_1,
            formData.professionalQualification.pro_country_1,

            formData.professionalQualification.pro_qualification_2,
            formData.professionalQualification.pro_institute_2,
            formData.professionalQualification.pro_grade_2,
            formData.professionalQualification.pro_year_2,
            formData.professionalQualification.pro_country_2,
            
            formData.professionalQualification.pro_qualification_3,
            formData.professionalQualification.pro_institute_3,
            formData.professionalQualification.pro_grade_3,
            formData.professionalQualification.pro_year_3,
            formData.professionalQualification.pro_country_3,

            formData.otherInfo.expert1,
            formData.otherInfo.expert2,
            formData.otherInfo.expert3,

            this.deleted=0,
            this.status=1,
        ).subscribe(
            success => {
                this.providerRegisterStatus = success.success;
                this.error = success.error;
                this.individualForm.reset();
                this.hideAlert();
            }
        );
    }
}

export class Provider{
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
    public professionalQualification = new ProfessionalQualification();
    public subjectAreas = new SubjectAreas();
}

export class HighestQualification{
    public highest_quali: string;
    public highest_uni: string;
    public highest_grade: string;
    public highest_Country:number;
    public highest_Year: number;
}

export class ProfessionalQualification {
    public pro_qualification_1: string;
    public pro_institute_1: string;
    public pro_grade_1: string;
    public pro_year_1: number;
    public pro_country_1: number;

    public pro_qualification_2: string;
    public pro_institute_2: string;
    public pro_grade_2: string;
    public pro_year_2: number;
    public pro_country_2: number;

    public pro_qualification_3: string;
    public pro_institute_3: string;
    public pro_grade_3: string;
    public pro_year_3: number;
    public pro_country_3: number;
}

export class SubjectAreas {
    public expert1: number;
    public expert2: number;
    public expert3: number;
}