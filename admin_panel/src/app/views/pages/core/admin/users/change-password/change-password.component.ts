import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder} from '@angular/forms';
import CustomValidators from '../../../../../../common/validation/CustomValidators';

@Component({
    selector : 'change-password',
    templateUrl : 'change-password.component.html',
    styleUrls : ['change-password.component.css']
})

export class ChangePasswordComponent implements OnInit{

    public passwords = new Passwords();

    public changePassForm: FormGroup;

    constructor(private formBuilder: FormBuilder){}

    ngOnInit(): void {
        this.validatePassword();
    }

    private validatePassword(): void{
        this.changePassForm = this.formBuilder.group({
            'currentPass': [null, [Validators.required]],
            'newPassword': [null, [Validators.required]],
            'confirmPassword': [null, [Validators.required]]
        }, { validator: this.checkIfMatchingPasswords('newPassword', 'confirmPassword') });
        
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
        return !this.changePassForm.get(field).valid && this.changePassForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }

    /**
     * clear form
     */
    public clearForm(){
        this.changePassForm.reset();
    }
}

export class Passwords{
    public currentPass: string;
    public newPassword: string;
    public confirmPassword: string;
}