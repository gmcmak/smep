import { Component, OnInit  } from '@angular/core';
import { FormGroup, Validators, FormControl} from '@angular/forms';

//import { ContentProviderIndividual } from '../../../../../model/content-provider.model';
import CustomValidators from '../../../../../common/validation/CustomValidators';

declare var $: any;
declare var jQuery: any;
const NIC_REGEX = /^[0-9]{9}[VX]/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)/;
const MOBILE_REGEX = /^[0-9]{10}/;

@Component({
    selector: 'content-provider',
    templateUrl: './content-provider.component.html',
    styleUrls: ['./content-provider.component.css']

})
export class ContentProviderComponent {

    //get individual form input data
    individualForm = new FormGroup({
        cpName:  new FormControl('', Validators.required),
        cpFullName: new FormControl('', Validators.required),
        gender: new FormControl('', Validators.required),
        cpNic: new FormControl('', [Validators.required,Validators.pattern(NIC_REGEX)]),
        cpDesignation: new FormControl('', Validators.required),
        cpDob: new FormControl('', Validators.required),
        cpEmail: new FormControl('', [Validators.required,Validators.pattern(EMAIL_REGEX)]),
        cpMobile: new FormControl('', [Validators.required,Validators.pattern(MOBILE_REGEX),Validators.minLength(10)]),
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

    //get institute form input data
    instituteForm = new FormGroup({
            instName: new FormControl('', Validators.required),
            regNo: new FormControl('', Validators.required),
            dateOfReg: new FormControl('', Validators.required),
            adrz: new FormControl('', Validators.required ),
            mobileNum: new FormControl('',[Validators.required,Validators.pattern(MOBILE_REGEX),Validators.minLength(10)]),
            person_no: new FormControl('',[Validators.required,Validators.pattern(MOBILE_REGEX),Validators.minLength(10)]),
            foreignUni: new FormControl('', Validators.required),
            instId: new FormControl(),
            expert_sub1: new FormControl('', Validators.required),
            expert_sub2: new FormControl('', Validators.required),
            expert_sub3: new FormControl('', Validators.required),
            check2: new FormControl('',Validators.required)
        
    });

    onSubmit(){
        console.log(this.individualForm.value);
    }

    //content provider individual form

    // public cpName: string;
    // public cpFullName: string;
    // public gender: string;
    // public cpNic: string;
    // public cpDesignation: string;
    // public cpDob: Date;
    // public cpEmail: string;
    // public cpMobile: number;

    // public highest_quali:string;
    // public highest_uni:string;
    // public highest_grade:string;
    // public highest_Country:string;
    // public highest_Year:string;

    //content provider - institute

    // public instName: string;
    // public regNo: string;
    // public dateOfReg: string;
    // public adrz: string;
    // public mobileNum: number;
    // public person_no: number;
    // public foreignUni: string;

    //content provider - individual form validation

    //cpNameControl = new FormControl('deshan', [Validators.required]);
    // cpFullNameControl = new FormControl('', [Validators.required]);
    // genderControl = new FormControl('', [Validators.required]);
    // cpNicControl = new FormControl('', [Validators.required,Validators.pattern(NIC_REGEX)]);
    // cpDesignationControl = new FormControl('', [Validators.required]);
    // cpDobControl = new FormControl('', [Validators.required]);
    // cpEmailControl = new FormControl('', [Validators.required,Validators.pattern(EMAIL_REGEX)]);
    // cpMobileControl = new FormControl('', [Validators.required,Validators.pattern(MOBILE_REGEX)]);
    // highest_qualiControl = new FormControl('',[Validators.required]);
    // highest_uniControl = new FormControl('',[Validators.required]);
    // highest_gradeControl = new FormControl('',[Validators.required]);
    // highest_CountryControl = new FormControl('',[Validators.required]);
    // highest_YearControl = new FormControl('',[Validators.required]);

    //content provider - institute form validation

    // instNameControl = new FormControl('',[Validators.required]);
    // regNoControl = new FormControl('',[Validators.required]);
    // dateOfRegControl = new FormControl('',[Validators.required]);
    // adrzControl = new FormControl('',[Validators.required]);
    // mobileNumControl = new FormControl('',[Validators.required,Validators.pattern(MOBILE_REGEX)]);
    // person_noControl = new FormControl('',[Validators.required,Validators.pattern(MOBILE_REGEX)]);
    // foreignUniControl = new FormControl('',[Validators.required]);

    //check the check box 1 tic
    //checkBoxControl = new FormControl('',[Validators.required]);
    

    //genderList = [{value: 'Male', viewValue: 'Male'},{value: 'Female', viewValue: 'Female'}];

    //to show educational institution registration form
    tabChangeToCompany(){
        
        $("#professional-category").slideDown(1000);
        $("#individual-category").slideUp(1000);
        $("#radioB1").css("background-color","white");
        $("#radioB2").css("background-color","#D0F5A9");
        
    }

    //to show individual registration form
    tabChangeToIndividual(){
        $("#professional-category").slideUp(1000);
        $("#individual-category").slideDown(1000);
        $("#radioB1").css("background-color","#F2F5A9");
        $("#radioB2").css("background-color","white");        
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
    
    //add expert subject dropdown2 (institute form)
    add_expert_sub2(){
        $("#add_sub_btn1").hide();
        $("#expert_sub2").show();
        $("#add_sub_btn2").show();
        $("#remove_sub_btn2").show();
    }

    //add expert subject dropdown3 (institute form)
    add_expert_sub3(){
        $("#add_sub_btn2").hide();
        $("#expert_sub3").show();
        $("#add_sub_btn3").hide();
        $("#remove_sub_btn3").show();
    }

    //remove expert subject dropdown2 (institute form)
    remove_expert_sub2(){
        $("#expert_sub2").val("");
        $("#expert_sub2").hide();
        $("#remove_sub_btn2").hide();
        $("#add_sub_btn2").hide();
        $("#add_sub_btn1").show();
    }

    //remove expert subject dropdown3 (institute form)
    remove_expert_sub3(){
        $("#expert_sub3").val("");
        $("#expert_sub3").hide();
        $("#remove_sub_btn3").hide();
        $("#add_sub_btn1").show();
    }

    showCalander1(){
        $("#cpDob").datepicker( {
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true});

        //this.cpDob = $("#cpDob").val(); 
    }

    showCalander2(){
        $("#dateOfReg").datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true});
            
        //this.dateOfReg = $('#dateOfReg').val();
    }  
}
    


