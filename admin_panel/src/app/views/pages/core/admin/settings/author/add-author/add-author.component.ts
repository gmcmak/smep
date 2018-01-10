import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from "../../../../../../../services/businessservices/core/settings/author.service";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'add-author',
    templateUrl: 'add-author.component.html',
    styleUrls: ['add-author.component.css']
})

export class AddAuthorComponent implements OnInit{

    public author = new Author();
    public authorAddingStatus;
    public authorForm: FormGroup;
    public error = 0;

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
    public changeAlertClass(){
        return{
            'alert-success': this.error === 0,
            'alert-danger': this.error != 0
        }
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
            success => {
                this.authorAddingStatus = success.success;
                this.error = success.error;
                this.authorForm.reset();
                this.hideAlert();
            }
        );
    }
}

export class Author{
    public englishName: string;
    public sinhalaName: string;
    public tamilName: string;
}