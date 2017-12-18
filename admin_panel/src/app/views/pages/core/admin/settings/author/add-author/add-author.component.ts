import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from "../../../../../../../services/businessservices/core/settings/author.service";

@Component({
    selector: 'add-author',
    templateUrl: 'add-author.component.html',
    styleUrls: ['add-author.component.css']
})

export class AddAuthorComponent implements OnInit{

    public author = new Author();
    public authorAddingStatus;
    public authorForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private authorService: AuthorService
    ){}

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
    
    addAuthors(formData){
        this.authorService.addAuthor(
            formData.english_name,
            formData.sinhala_name,
            formData.tamil_name
        ).subscribe(
            success => { this.authorAddingStatus = success.success}
        );
    }
}

export class Author{
    public englishName: string;
    public sinhalaName: string;
    public tamilName: string;
}