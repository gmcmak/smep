
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl,Validators } from '@angular/forms';
import CustomValidators from '../../../../common/validation/CustomValidators';

import { DialogsService } from '../../../../services/dialog/dialogs.service';
import { ToastService } from '../../../../services/toast/toast.service';
import { ToastType } from '../../../../services/toast/toast.model';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact-component.css']
})
export class ContactComponent  {
  public result: any; 

  public selectedGender:string;

  public selectedProgram:string;

  clickedStatus:string;

  fullName:string;

  contactForm: FormGroup;

  
  genderList = [
    {value: 'Mr.', viewValue: 'Mr.'},
    {value: 'Mrs.', viewValue: 'Mrs.'}
  ];

   emailFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);

    fullnameControl = new FormControl('', [
    Validators.required]);

   programs = [
    'Certificate course',
    'Diploma program',
    'Degree program',
  ];

   Status: boolean = false; 
   displayValue() { 
     console.log('-------------');
      this.Status = true; 

      if(this.Status==true){
        this.clickedStatus="button clicked";
      }

      
   }

  checked = false;
  indeterminate = false;
  align = 'start';
  disabled = false;

}
