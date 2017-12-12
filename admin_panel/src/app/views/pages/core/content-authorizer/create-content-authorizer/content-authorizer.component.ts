import { Component, OnInit  } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';

//import { ContentProviderIndividual } from '../../../../../model/content-provider.model';
import CustomValidators from '../../../../../common/validation/CustomValidators';

declare var $: any;
declare var jQuery: any;
const NIC_REGEX = /^[0-9]{9}[VX]/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])/;
const MOBILE_REGEX = /^[0-9]{10}/;

@Component({
    selector: 'content-authorizer',
    templateUrl: './content-authorizer.component.html',
    styleUrls: ['./content-authorizer.component.css']

})
export class ContentAuthorizerComponent {

    //get individual form input data
    authorizerForm = new FormGroup({
        caName:  new FormControl('', Validators.required),
        caFullName: new FormControl('', Validators.required),
        caGender: new FormControl('', Validators.required),
        caNic: new FormControl('', [Validators.required,Validators.pattern(NIC_REGEX)]),
        caDesignation: new FormControl('', Validators.required),
        caDob: new FormControl('', Validators.required),
        caEmail: new FormControl('', [Validators.required,Validators.pattern(EMAIL_REGEX)]),
        caMobile: new FormControl('', [Validators.required,Validators.pattern(MOBILE_REGEX)]),
            highestQulification: new FormGroup({
                highest_quali: new FormControl('',[Validators.required]),
                highest_uni: new FormControl('',[Validators.required]),
                highest_grade: new FormControl('',[Validators.required]),
                highest_Country: new FormControl('',[Validators.required]),
                highest_Year: new FormControl('',[Validators.required])
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
    });

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

    //show course list(representing institute)
    show_course(){
        $("#courses").show();
    }

    //hide course list(representing institute)
    hide_course(){
        $("#courses").hide(); //have to empty selection list
        $("#other-field").hide();
        $("#other-field1").hide();
    }
   
    //get other representing institute
    show_other_institute(){
        if ($("#courses").val() == "Other") {
            $("#other-field").show();
            $("#other-field1").show();
        } else {
            $("#other-field").hide();
            $("#other-field1").hide();
        }
    }

    showCalander1(){
        $("#cpDob").datepicker( {
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true});

        //this.cpDob = $("#cpDob").val(); 
    }
}
    


