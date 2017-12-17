import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'update-author',
    templateUrl: 'update-author.component.html',
    styleUrls: ['update-author.component.css']
})

export class UpdateAuthorComponent{

    public author = new Author();

    public authorForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit(): void {
        this.initializeAuthorsForm();
    }

    private initializeAuthorsForm(): void {
        this.authorForm = this.formBuilder.group({
            'english_name': [null, [Validators.required]],
            'sinhala_name': [null, [Validators.required]],
            'tamil_name': [null, [Validators.required]],
        });
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
        return !this.authorForm.get(field).valid && this.authorForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }   
}

export class Author {
    public englishName: string;
    public sinhalaName: string;
    public tamilName: string;
}