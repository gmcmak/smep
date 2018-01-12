import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

const URL_REGEX = ('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}');

@Component({
    selector: 'cp-single-submission',
    templateUrl: 'single-submission.component.html',
    styleUrls: ['single-submission.component.css']
})

export class SingleSubmissionComponent implements OnInit{

    public singleSubmission = new SingleSubmission();

    public singleSubForm: FormGroup;

    constructor(private formBuilder:FormBuilder){}

    ngOnInit(): void {
        this.initializeSingleForm();
    }

    private initializeSingleForm(): void{
        this.singleSubForm = this.formBuilder.group({
            'sub_url': [null, [Validators.required, Validators.pattern(URL_REGEX)]],
            'sub_type': [null, [Validators.required]],
            'sub_title': [null, [Validators.required]], 
            'sub_video_url': [null, [Validators.pattern(URL_REGEX)]],
            'sub_keyword': [null, [Validators.required]],
            'sub_free': [null],
            'sub_category': [null, [Validators.required]],
            'sub_explore': [null, [Validators.required]],
            'sub_description': [null]
        });
    }

    public isFieldValid(field: string) {
        return !this.singleSubForm.get(field).valid && this.singleSubForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }

}

export class SingleSubmission{
    public sub_url: string;
    public sub_type: number;
    public sub_title: string;
    public sub_video_url: string;
    public sub_Keyword: number;
    public sub_free: string;
    public sub_category: number;
    public sub_explore: number;
    public sub_description: string;
}