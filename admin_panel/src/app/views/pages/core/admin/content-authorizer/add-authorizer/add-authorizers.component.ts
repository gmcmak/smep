import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import CustomValidators from '../../../../../../common/validation/CustomValidators';
import { CountryService } from "../../../../../../services/businessservices/core/country/country.service";
import { SubjectService } from "../../../../../../services/businessservices/core/subject-area/subject.service";
import { AuthorizerService } from "../../../../../../services/businessservices/core/content-authorizer/authorizer.service";

declare var $: any;
declare var jQuery: any;
const NIC_REGEX = /^[0-9]{9}[VXvx]/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])/;
const MOBILE_REGEX = /^[0-9]{10}/;

@Component({
    selector: 'add-authorizers',
    templateUrl: 'add-authorizers.component.html',
    styleUrls: ['add-authorizers.component.css']
})

export class AddAuthorizersComponent implements OnInit{

    public authorizer = new Authorizer();
    public year;
    public yearList = Array();

    public countryList;
    public subjectList;

    public authorizerRegisterStatus;

    private status;
    private deleted;

    ngOnInit(): void {
        //throw new Error("Method not implemented.");
        this.intializeAuthorizerForm();
        
        $("#caDob").datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true
        }).on('change', e => this.authorizer.caDob = e.target.value);

        this.getCountry();
        this.showYear();
        this.getSubjectAreas();

    }

    /**
     * show year dropdown
     */
    showYear(){
       this.year = (new Date()).getFullYear();
       for(let i=0; i<=20; i++){
           this.yearList[i] = this.year - i;
       }  
    }

    public authorizerForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private countryService: CountryService,
        private subjectService: SubjectService,
        private authorizerService: AuthorizerService
    ) {}

    private intializeAuthorizerForm():void{
        //get individual form input data
        this.authorizerForm = this.formBuilder.group({
            caName: new FormControl('', Validators.required),
            caFullName: new FormControl('', Validators.required),
            caGender: new FormControl('', Validators.required),
            caNic: new FormControl('', [Validators.required, Validators.pattern(NIC_REGEX)]),
            caDesignation: new FormControl('', Validators.required),
            caDob: new FormControl('', Validators.required),
            caEmail: new FormControl('', [Validators.required, Validators.pattern(EMAIL_REGEX)]),
            caMobile: new FormControl('', [Validators.required, Validators.pattern(MOBILE_REGEX)]),
            caPassword1: new FormControl('', Validators.required),
            caPassword2: new FormControl('', Validators.required),
            highestQulification: new FormGroup({
                highest_quali: new FormControl('', [Validators.required]),
                highest_uni: new FormControl('', [Validators.required]),
                highest_grade: new FormControl('', [Validators.required]),
                highest_Country: new FormControl('', [Validators.required]),
                highest_Year: new FormControl('', [Validators.required])
            }),
            professionalQualification: new FormGroup({

                pro_qualification_1: new FormControl(),
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
        }, { validator: this.checkIfMatchingPasswords('caPassword1', 'caPassword2') });
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
        return !this.authorizerForm.get(field).valid && this.authorizerForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }
    
        onSubmit(){
            console.log(this.authorizerForm.value);
        }

        /**
         * get country
         */
        getCountry(){
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
            this.authorizer.ProfessionalQualifications.pro_country_2 = null;
            this.authorizer.ProfessionalQualifications.pro_grade_2 = null;
            this.authorizer.ProfessionalQualifications.pro_institute_2 = null;
            this.authorizer.ProfessionalQualifications.pro_qualification_2 = null;
            this.authorizer.ProfessionalQualifications.pro_year_2 = null;
        }
    
        //hide professional qualification row3
        hide_row3(){
            $("#row_3").hide();
            $("#add_btn_row2").show();
            this.authorizer.ProfessionalQualifications.pro_country_3 = null;
            this.authorizer.ProfessionalQualifications.pro_grade_3 = null;
            this.authorizer.ProfessionalQualifications.pro_institute_3 = null;
            this.authorizer.ProfessionalQualifications.pro_qualification_3 = null;
            this.authorizer.ProfessionalQualifications.pro_year_3 = null;
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
            this.authorizer.SubjectAreas.expert2 = null;
        }
    
        //remove expertise dropdown3
        remove_subject3(){
            $("#expert_subject3").hide();
            $("#remove_subject_btn3").hide();
            $("#add_subject_btn1").show();
            this.authorizer.SubjectAreas.expert3 = null;
        }

        /**
         * add authorizer
         */
        addAuthorizer(formData){
            //professional quali row 1
            // if (formData.professionalQualification.pro_qualification_1){
            //     var pro_qualification_1 = formData.professionalQualification.pro_qualification_1;
            // }else{
            //     pro_qualification_1 = "";
            // }

            // if (formData.professionalQualification.pro_institute_1) {
            //     var pro_institute_1 = formData.professionalQualification.pro_institute_1;
            // } else {
            //     pro_institute_1 = "";
            // }

            // if (formData.professionalQualification.pro_grade_1) {
            //     var pro_grade_1 = formData.professionalQualification.pro_grade_1;
            // } else {
            //     pro_grade_1 = "";
            // }

            // if (formData.professionalQualification.pro_grade_1) {
            //     var pro_grade_1 = formData.professionalQualification.pro_grade_1;
            // } else {
            //     pro_grade_1 = "";
            // }

            // if (formData.professionalQualification.pro_year_1) {
            //     var pro_year_1 = formData.professionalQualification.pro_year_1;
            // } else {
            //     pro_year_1 = "";
            // }

            // if (formData.professionalQualification.pro_country_1) {
            //     var pro_country_1 = formData.professionalQualification.pro_country_1;
            // } else {
            //     pro_country_1 = "";
            // }

            // //professional quali row 2
            // if (formData.professionalQualification.pro_qualification_2) {
            //     var pro_qualification_2 = formData.professionalQualification.pro_qualification_2;
            // } else {
            //     pro_qualification_2 = "";
            // }

            // if (formData.professionalQualification.pro_institute_2) {
            //     var pro_institute_2 = formData.professionalQualification.pro_institute_2;
            // } else {
            //     pro_institute_2 = "";
            // }

            // if (formData.professionalQualification.pro_grade_2) {
            //     var pro_grade_2 = formData.professionalQualification.pro_grade_2;
            // } else {
            //     pro_grade_2 = "";
            // }

            // if (formData.professionalQualification.pro_grade_2) {
            //     var pro_grade_2 = formData.professionalQualification.pro_grade_2;
            // } else {
            //     pro_grade_2 = "";
            // }

            // if (formData.professionalQualification.pro_year_2) {
            //     var pro_year_2 = formData.professionalQualification.pro_year_2;
            // } else {
            //     pro_year_2 = "";
            // }

            // if (formData.professionalQualification.pro_country_2) {
            //     var pro_country_2 = formData.professionalQualification.pro_country_2;
            // } else {
            //     pro_country_2 = "";
            // }

            // //professional quali row 3
            // if (formData.professionalQualification.pro_qualification_3) {
            //     var pro_qualification_3 = formData.professionalQualification.pro_qualification_3;
            // } else {
            //     pro_qualification_3 = "";
            // }

            // if (formData.professionalQualification.pro_institute_3) {
            //     var pro_institute_3 = formData.professionalQualification.pro_institute_3;
            // } else {
            //     pro_institute_3 = "";
            // }

            // if (formData.professionalQualification.pro_grade_3) {
            //     var pro_grade_3 = formData.professionalQualification.pro_grade_3;
            // } else {
            //     pro_grade_3 = "";
            // }

            // if (formData.professionalQualification.pro_grade_3) {
            //     var pro_grade_3 = formData.professionalQualification.pro_grade_3;
            // } else {
            //     pro_grade_3 = "";
            // }

            // if (formData.professionalQualification.pro_year_3) {
            //     var pro_year_3 = formData.professionalQualification.pro_year_3;
            // } else {
            //     pro_year_3 = "";
            // }

            // if (formData.professionalQualification.pro_country_3) {
            //     var pro_country_3 = formData.professionalQualification.pro_country_3;
            // } else {
            //     pro_country_3 = "";
            // }

            // //expert1
            // if (formData.otherInfo.expert1) {
            //     var expert1 = formData.otherInfo.expert1;
            // } else {
            //     expert1 = "";
            // }

            // //expert2
            // if (formData.otherInfo.expert2) {
            //     var expert2 = formData.otherInfo.expert2;
            // } else {
            //     expert2 = "";
            // }

            // //expert3
            // if (formData.otherInfo.expert3) {
            //     var expert3 = formData.otherInfo.expert3;
            // } else {
            //     expert3 = "";
            // }

            this.authorizerService.addAuthorizers(
                formData.caName,
                formData.caFullName,
                formData.caGender,
                formData.caNic,
                formData.caDesignation,
                formData.caDob,
                formData.caEmail,
                formData.caMobile,
                formData.caPassword1,
                formData.caPassword2,

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

                // pro_qualification_1,
                // pro_institute_1,
                // pro_grade_1,
                // pro_year_1,
                // pro_country_1,

                // pro_qualification_2,
                // pro_institute_2,
                // pro_grade_2,
                // pro_year_2,
                // pro_country_2,

                // pro_qualification_3,
                // pro_institute_3,
                // pro_grade_3,
                // pro_year_3,
                // pro_country_3,

                // expert1,
                // expert2,
                // expert3,
                this.status = 0,
                this.deleted = 0
            ).subscribe(
                success => {
                    this.authorizerRegisterStatus = success.success;
                }
            );
        }
}

export class Authorizer{
    
    public caName: string;
    public caFullName: string;
    public caGender: string;
    public caNic: string;
    public caDesignation: string;
    public caDob: string;
    public caEmail: string;
    public caMobile: string;
    public caPassword1: string;
    public caPassword2: string;

    HighestQualifications = new AuthorizerHighestQualification();
    ProfessionalQualifications = new AuthorizerProfessionalQualification();
    SubjectAreas = new SubjectAreas();
}

export class AuthorizerHighestQualification {
    public highest_quali: string;
    public highest_uni: string;
    public highest_grade: string;
    public highest_Country: number;
    public highest_Year: number;
}

export class AuthorizerProfessionalQualification{
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

export class SubjectAreas{
    public expert1: number;
    public expert2: number;
    public expert3: number;
}