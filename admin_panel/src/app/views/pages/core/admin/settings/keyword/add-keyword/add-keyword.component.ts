import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeywordService } from '../../../../../../../services/businessservices/core/settings/keyword.service';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'add-keyword',
    templateUrl: 'add-keyword.component.html',
    styleUrls: ['add-keyword.component.css']
})

export class AddKeywordComponent implements OnInit{
    
    public keyword = new Keyword();
    public keywordForm: FormGroup;
    public keywordAddingStatus;
    public error = 0;

    constructor(
        private formBuilder: FormBuilder,
        private keywordService: KeywordService
    ) {}

    ngOnInit(): void {
        this.initializeKeywordForm();
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
            'alert-danger': this.error !=0
        }
    }

    private initializeKeywordForm(): void {
        this.keywordForm = this.formBuilder.group({
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
        return !this.keywordForm.get(field).valid && this.keywordForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }

    addKeyword(formData){
        this.keywordService.addKeywordList(
            formData.english_name,
            formData.sinhala_name,
            formData.tamil_name
        ).subscribe(
            success => {
                this.keywordAddingStatus = success.success;
                this.error = success.error;
                this.keywordForm.reset();
                this.hideAlert();
            }
        );
    }
}

export class Keyword{
    public englishName: string;
    public sinhalaName: string;
    public tamilName: string;
}