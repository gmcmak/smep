import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'add-category',
    templateUrl: 'add-category.component.html',
    styleUrls: ['add-category.component.css']
})

export class AddCategoryComponent implements OnInit{

    public englishName: string;
    public sinhalaName: string;
    public tamilName: string;
    public categoryStatus: boolean;

    ngOnInit(): void {
        this.initializeCategoryForm();
    }

    public categoryForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {

    }

    private initializeCategoryForm(): void {
        this.categoryForm = this.formBuilder.group({
            'english_name': [null, [Validators.required]],
            'sinhala_name': [null, [Validators.required]],
            'tamil_name': [null, [Validators.required]],
            'category_status': [null, [Validators.required]],
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
        return !this.categoryForm.get(field).valid && this.categoryForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }
    
}