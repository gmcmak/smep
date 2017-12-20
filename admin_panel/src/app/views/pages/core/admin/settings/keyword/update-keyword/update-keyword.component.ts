import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { KeywordService } from "../../../../../../../services/businessservices/core/settings/keyword.service";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'update-keyword',
    templateUrl: 'update-keyword.component.html',
    styleUrls: ['update-keyword.component.css']
})

export class UpdateKeywordComponent implements OnInit{

    public keyword = new Keyword();
    public keywordForm: FormGroup;
    public editKeywordList;
    public id;
    public updateKeywordList;
    public keywordupdatingStatus;

    constructor(
        private formBuilder: FormBuilder,
        private keywordService: KeywordService
    ) {}

    ngOnInit(): void {
        this.initializeKeywordForm();
        this.editKeyword();
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

    /**
     * get keyword's details for update
     */
    editKeyword(){
        this.keywordService.editKeywordList(
            this.id=1
        ).subscribe(
            success => {
                this.editKeywordList = success.success;
                this.keyword.englishName = this.editKeywordList[0].en_name;
                this.keyword.sinhalaName = this.editKeywordList[0].si_name;
                this.keyword.tamilName = this.editKeywordList[0].ta_name;
            }
        );
    }

    /**
     * update keyword details
     */
    updateKeyword(formData){
        this.keywordService.updateKeywordList(
            this.id=1,
            formData.english_name,
            formData.sinhala_name,
            formData.tamil_name
        ).subscribe(
            success => {
                this.keywordupdatingStatus = success.success
            }
        );
    }
}

export class Keyword {
    public englishName: string;
    public sinhalaName: string;
    public tamilName: string;
}