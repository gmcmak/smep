import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl} from '@angular/forms';
import CustomValidators from '../../../../../../common/validation/CustomValidators';

@Component({
    selector : 'change-password',
    templateUrl : 'change-password.component.html',
    styleUrls : ['change-password.component.css']
})

export class ChangePasswordComponent{
    
    changePassForm = new FormGroup({
        currentPass: new FormControl(null,[Validators.required]),
        newPassword: new FormControl(null, [Validators.required]),
        confirmPassword: new FormControl(null, [Validators.required])
    });
}