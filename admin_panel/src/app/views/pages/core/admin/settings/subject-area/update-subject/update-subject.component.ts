import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from "../../../../../../../services/businessservices/core/subject-area/subject.service";

@Component({
    selector: 'update-subject',
    templateUrl: 'update-subject.component.html',
    styleUrls: ['update-subject.component.css']
})

export class UpdateSubjectComponent implements OnInit{
    public subject = new Subject();
    public subjectForm: FormGroup;
    public subjectUpdatingStatus;
    public subjectList;

    public id=2; //update id

    constructor(
        private formBuilder: FormBuilder,
        private subjectService: SubjectService
    ) { }

    ngOnInit(): void {
        this.initializeSubjectForm();
        this.getSubject();
    }

    private initializeSubjectForm(): void {
        this.subjectForm = this.formBuilder.group({
            'subject_area': [null, [Validators.required]],
            'descriptions': [null, [Validators.required]]
        });
    }

    public isFieldValid(field: string) {
        return !this.subjectForm.get(field).valid && this.subjectForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }

    /**
     * get subject details for update
     */
    getSubject(){
        this.subjectService.getSubjectList(
            this.id
        ).subscribe(
            success => {
                this.subjectList = success.success;
                this.subject.subject_area = this.subjectList[0].name;
                this.subject.description = this.subjectList[0].description;
            }
        );
    }

    updateSubject(dataForm) {
        this.subjectService.updateSubject(
            this.id,
            dataForm.subject_area,
            dataForm.descriptions
        ).subscribe(
            success => { this.subjectUpdatingStatus = success.success }
            );
    }

}

export class Subject {
    public subject_area: string;
    public description: string;
}