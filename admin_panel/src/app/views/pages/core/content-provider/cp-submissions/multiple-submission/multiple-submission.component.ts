import { Component, OnInit} from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

const URL_REGEX = ('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}');

@Component({
    selector: 'cp-multiple-submission',
    templateUrl: 'multiple-submission.component.html',
    styleUrls: ['multiple-submission.component.css']
})

export class MultipleSubmissionComponent implements OnInit{
    
    public url: string;
    public search1: FormGroup;
    constructor(private formBuilder:FormBuilder){}

    ngOnInit(): void {
        this.initializeSearch();
    }

    private initializeSearch(): void{
        this.search1 = this.formBuilder.group({
            'url': [null, [Validators.required, Validators.pattern(URL_REGEX)]]
        });
    }

    public isFieldValid(field: string) {
        return !this.search1.get(field).valid && this.search1.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }

}
