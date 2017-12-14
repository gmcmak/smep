import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import CustomValidators from '../../../../../../common/validation/CustomValidators';

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

    ngOnInit(): void {
        //throw new Error("Method not implemented.");
        this.intializeAuthorizerForm();
        
        $("#caDob").datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true
        }).on('change', e => this.authorizer.caDob = e.target.value);

    }


    public authorizerForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {

    }

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
        }
    
        //hide professional qualification row3
        hide_row3(){
            $("#row_3").hide();
            $("#add_btn_row2").show();
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
        }
    
        //remove expertise dropdown3
        remove_subject3(){
            $("#expert_subject3").hide();
            $("#remove_subject_btn3").hide();
            $("#add_subject_btn1").show();
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
}

export class AuthorizerHighestQualification {
    public highest_quali: string;
    public highest_uni: string;
    public highest_grade: string;
    public highest_Country: number;
    public highest_Year: number;
}