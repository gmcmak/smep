import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    selector: 'edit-profile',
    templateUrl: 'edit-profile.component.html',
    styleUrls: ['edit-profile.component.css']
})

export class EditProfileComponent implements OnInit{

    public authorizer = new Authorizer();
    public year;
    public yearList = Array();

    public countryList;
    public subjectList;

    public authorizerUpdatingStatus;
    public editAuthorizerList;

    public sub: any;
    public id: number;
    public editId; //get authorizer's details using id

    private status = 0;
    private deleted = 0;

    public error = 0;

    ngOnInit(): void {

        this.intializeAuthorizerForm();

        $("#caDob").datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true
        }).on('change', e => this.authorizer.caDob = e.target.value);

        this.getCountry();
        this.showYear();
        this.getSubjectAreas();

        /**
         * get param id value from the router
         */
        this.sub = this.route.params.subscribe(params => {
            this.editId = +params['id'];
        });

        this.editAuthorizer();

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
    public changeAlertClass() {
        return {
            'alert-success': this.error === 0,
            'alert-danger': this.error != 0
        }
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

    public authorizerForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private countryService: CountryService,
        private subjectService: SubjectService,
        private authorizerService: AuthorizerService,
        private route: ActivatedRoute
    ) { }

    private intializeAuthorizerForm(): void {
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

            })
        });
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

    onSubmit() {
        console.log(this.authorizerForm.value);
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
        this.authorizer.ProfessionalQualifications.pro_country_2 = null;
        this.authorizer.ProfessionalQualifications.pro_grade_2 = null;
        this.authorizer.ProfessionalQualifications.pro_institute_2 = null;
        this.authorizer.ProfessionalQualifications.pro_qualification_2 = null;
        this.authorizer.ProfessionalQualifications.pro_year_2 = null;
    }

    //hide professional qualification row3
    hide_row3() {
        $("#row_3").hide();
        $("#add_btn_row2").show();
        this.authorizer.ProfessionalQualifications.pro_country_3 = null;
        this.authorizer.ProfessionalQualifications.pro_grade_3 = null;
        this.authorizer.ProfessionalQualifications.pro_institute_3 = null;
        this.authorizer.ProfessionalQualifications.pro_qualification_3 = null;
        this.authorizer.ProfessionalQualifications.pro_year_3 = null;
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
        this.authorizer.SubjectAreas.expert2 = null;
    }

    //remove expertise dropdown3
    remove_subject3() {
        $("#expert_subject3").hide();
        $("#remove_subject_btn3").hide();
        $("#add_subject_btn1").show();
        this.authorizer.SubjectAreas.expert3 = null;
    }

    /**
     * get authorizer's details for update
     */
    editAuthorizer() {
        this.authorizerService.editAuthorizer(
            this.editId
        ).subscribe(
            success => {
                this.editAuthorizerList = success.success;
                this.authorizer.caDesignation = this.editAuthorizerList[0].designation;
                this.authorizer.caDob = this.editAuthorizerList[0].birthday;
                this.authorizer.caEmail = this.editAuthorizerList[0].email;
                this.authorizer.caFullName = this.editAuthorizerList[0].name_with_initials;
                this.authorizer.caGender = this.editAuthorizerList[0].gender;
                this.authorizer.caMobile = this.editAuthorizerList[0].mobile;
                this.authorizer.caName = this.editAuthorizerList[0].name;
                this.authorizer.caNic = this.editAuthorizerList[0].nic;

                this.authorizer.HighestQualifications.highest_quali = this.editAuthorizerList[0].highest_education.qualification;
                this.authorizer.HighestQualifications.highest_Country = this.editAuthorizerList[0].highest_education.country_id;
                this.authorizer.HighestQualifications.highest_grade = this.editAuthorizerList[0].highest_education.grade;
                this.authorizer.HighestQualifications.highest_uni = this.editAuthorizerList[0].highest_education.university;
                this.authorizer.HighestQualifications.highest_Year = this.editAuthorizerList[0].highest_education.year;

                if (this.editAuthorizerList[0].professional_educations[0]) {
                    if (this.editAuthorizerList[0].professional_educations[0].country_id != null || this.editAuthorizerList[0].professional_educations[0].grade != null || this.editAuthorizerList[0].professional_educations[0].university != null || this.editAuthorizerList[0].professional_educations[0].qualification != null || this.editAuthorizerList[0].professional_educations[0].year != null) {
                        this.authorizer.ProfessionalQualifications.pro_country_1 = this.editAuthorizerList[0].professional_educations[0].country_id;
                        this.authorizer.ProfessionalQualifications.pro_grade_1 = this.editAuthorizerList[0].professional_educations[0].grade;
                        this.authorizer.ProfessionalQualifications.pro_institute_1 = this.editAuthorizerList[0].professional_educations[0].university;
                        this.authorizer.ProfessionalQualifications.pro_qualification_1 = this.editAuthorizerList[0].professional_educations[0].qualification;
                        this.authorizer.ProfessionalQualifications.pro_year_1 = this.editAuthorizerList[0].professional_educations[0].year;
                    }
                }

                if (this.editAuthorizerList[0].professional_educations[1]) {
                    if (this.editAuthorizerList[0].professional_educations[1].country_id != null || this.editAuthorizerList[0].professional_educations[1].grade != null || this.editAuthorizerList[0].professional_educations[1].university != null || this.editAuthorizerList[0].professional_educations[1].qualification != null || this.editAuthorizerList[0].professional_educations[1].year != null) {
                        $('#row_2').show();
                        this.authorizer.ProfessionalQualifications.pro_country_2 = this.editAuthorizerList[0].professional_educations[1].country_id;
                        this.authorizer.ProfessionalQualifications.pro_grade_2 = this.editAuthorizerList[0].professional_educations[1].grade;
                        this.authorizer.ProfessionalQualifications.pro_institute_2 = this.editAuthorizerList[0].professional_educations[1].university;
                        this.authorizer.ProfessionalQualifications.pro_qualification_2 = this.editAuthorizerList[0].professional_educations[1].qualification;
                        this.authorizer.ProfessionalQualifications.pro_year_2 = this.editAuthorizerList[0].professional_educations[1].year;
                    }
                }

                if (this.editAuthorizerList[0].professional_educations[2]) {
                    if (this.editAuthorizerList[0].professional_educations[2].country_id != null || this.editAuthorizerList[0].professional_educations[2].grade != null || this.editAuthorizerList[0].professional_educations[2].university != null || this.editAuthorizerList[0].professional_educations[2].qualification != null || this.editAuthorizerList[0].professional_educations[2].year != null) {
                        $('#row_3').show();
                        $('#add_btn_row2').hide();
                        this.authorizer.ProfessionalQualifications.pro_country_3 = this.editAuthorizerList[0].professional_educations[2].country_id;
                        this.authorizer.ProfessionalQualifications.pro_grade_3 = this.editAuthorizerList[0].professional_educations[2].grade;
                        this.authorizer.ProfessionalQualifications.pro_institute_3 = this.editAuthorizerList[0].professional_educations[2].university;
                        this.authorizer.ProfessionalQualifications.pro_qualification_3 = this.editAuthorizerList[0].professional_educations[2].qualification;
                        this.authorizer.ProfessionalQualifications.pro_year_3 = this.editAuthorizerList[0].professional_educations[2].year;
                    }
                }

                if (this.editAuthorizerList[0].subject_areas[0]) {
                    if (this.editAuthorizerList[0].subject_areas[0].id != null) {
                        this.authorizer.SubjectAreas.expert1 = this.editAuthorizerList[0].subject_areas[0].id;
                    }
                }

                if (this.editAuthorizerList[0].subject_areas[1]) {
                    if (this.editAuthorizerList[0].subject_areas[1].id != null) {
                        $('#expert_subject2').show();
                        $('#remove_subject_btn2').show();
                        $('#add_subject_btn2').show();
                        this.authorizer.SubjectAreas.expert2 = this.editAuthorizerList[0].subject_areas[1].id;
                    }
                }

                if (this.editAuthorizerList[0].subject_areas[2]) {
                    if (this.editAuthorizerList[0].subject_areas[2].id != null) {
                        $('#expert_subject3').show();
                        $('#remove_subject_btn3').show();
                        $('#add_subject_btn2').hide();
                        this.authorizer.SubjectAreas.expert3 = this.editAuthorizerList[0].subject_areas[2].id;
                    }
                }
            }
            );
    }

    /**
     * update authorizer
     */
    updateAuthorizer(formData) {
        this.authorizerService.updateAuthorizer(
            this.editId,
            formData.caName,
            formData.caFullName,
            formData.caGender,
            formData.caNic,
            formData.caDesignation,
            formData.caDob,
            formData.caEmail,
            formData.caMobile,

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

            this.status = 0,
            this.deleted = 0
        ).subscribe(
            success => {
                this.authorizerUpdatingStatus = success.success;
                this.error = success.error;
                this.authorizerForm.reset();
                this.hideAlert();
            }
            );
    }
}

export class Authorizer {

    public caName: string;
    public caFullName: string;
    public caGender: string;
    public caNic: string;
    public caDesignation: string;
    public caDob: string;
    public caEmail: string;
    public caMobile: string;

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

export class AuthorizerProfessionalQualification {
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