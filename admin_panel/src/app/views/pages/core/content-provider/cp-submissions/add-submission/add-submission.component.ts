import { Component, OnInit, NgModule } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubmissionService } from "../../../../../../services/businessservices/core/submission/submission.service";

declare var $:any;
declare var jQuery:any;

const URL_REGEX = ('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}');

@Component({
    selector: 'add-submission',
    templateUrl: 'add-submission.component.html',
    styleUrls: ['add-submission.component.css']
})

export class AddSubmissionComponent implements OnInit{

    public error = 0;
    public submissionForm: FormGroup;

    public submission = new Submission();

    public submissionAddingStatus;
    public user_id = 61; //user id should take from logged user
    public status = 0;

    ngOnInit(): void {
        this.initializeSubmissionForm();
    }

    constructor(
        private formBuilder: FormBuilder,
        private submissionService: SubmissionService
    ){}

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
    public changeAlertClass() {
        return {
            'alert-success': this.error === 0,
            'alert-danger': this.error != 0
        }
    }

    private initializeSubmissionForm(): void {
        this.submissionForm = this.formBuilder.group({
            'name': [null, [Validators.required]],
            'url': [null, [Validators.required, Validators.pattern(URL_REGEX)]],
            'level': [null, [Validators.required]]
        });
    }

    public isFieldValid(field: string) {
        return !this.submissionForm.get(field).valid && this.submissionForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }

    /**
     * add submission
     */
    public addSubmission(formData){
        if (confirm("Confirm the accuracy of entered data.")) {
            this.submissionService.addSubmission(
                this.user_id,
                formData.name,
                formData.url,
                formData.level,
                this.status
            ).subscribe(
                success => {
                    this.submissionAddingStatus = success.success;
                    this.error = success.error;
                    this.hideAlert();
                    this.submissionForm.reset();
                }
                );
        }  
    }
}

export class Submission{
    public f_name: string;
    public f_url: string;
    public f_level: number;
}