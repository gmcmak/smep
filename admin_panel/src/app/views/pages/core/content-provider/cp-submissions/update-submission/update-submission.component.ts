import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { SubmissionService } from "../../../../../../services/businessservices/core/submission/submission.service";

declare var $:any;
declare var jQuery:any;

@Component({
    selector: 'update-submission',
    templateUrl: 'update-submission.component.html',
    styleUrls: ['update-submission.component.css']
})

export class UpdateSubmissionComponent implements OnInit{

    public submissionForm = new SubmissionForm();
    public subForm: FormGroup;

    public sub: any;
    public id: number;
    public user_id;

    public error = 0;
    public submissionUpdatingStatus;
    public submissionData;

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private submissionService: SubmissionService
    ){}

    ngOnInit(): void {
        /**
         * get param id value from the router
         */
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.user_id = +params['user_id'];
        });

        this.initializeSubmissionForm();
        this.loadSubmissionData();

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
    public changeAlertClass() {
        return {
            'alert-success': this.error === 0,
            'alert-danger': this.error != 0
        }
    }

    private initializeSubmissionForm(): void {
        this.subForm = this.formBuilder.group({
            'subName': [null, [Validators.required]],
            'subUrl': [null]
        });
    }

    public isFieldValid(field: string) {
        return !this.subForm.get(field).valid && this.subForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }

    /**
     * load submission data
     */
    public loadSubmissionData(){
        this.submissionService.editSubmissionData(
            this.id,
            this.user_id
        ).subscribe(
            success => {
                this.submissionData = success.success;
                this.submissionForm.subName = this.submissionData[0].name;
                this.submissionForm.subUrl = this.submissionData[0].url;
            }
        );
    }

    /**
     * update submission
     */
    public updateSubmission(formData){
        this.submissionService.updateSubmission(
            this.id,
            this.user_id,
            formData.subName
        ).subscribe(
            success => {
                this.submissionUpdatingStatus = success.success;
                this.error = success.error;
                this.hideAlert();
                this.subForm.reset();   
            }
        );
    }
}

export class SubmissionForm{
    public subName: string;
    public subUrl: string;
}