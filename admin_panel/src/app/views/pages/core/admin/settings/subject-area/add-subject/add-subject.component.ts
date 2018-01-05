import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from "../../../../../../../services/businessservices/core/subject-area/subject.service";

@Component({
    selector: 'add-subject',
    templateUrl: 'add-subject.component.html',
    styleUrls: ['add-subject.component.css']
})

export class AddSubjectComponent implements OnInit{
    public subject = new Subject();
    public subjectForm: FormGroup;
    public subjectAddingStatus;

    constructor(
        private formBuilder: FormBuilder,
        private subjectService: SubjectService
    ) { }

    ngOnInit(): void {
        this.initializeSubjectForm();
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

    addSubject(dataForm) {
        this.subjectService.addSubject(
            dataForm.subject_area,
            dataForm.descriptions
        ).subscribe(
            success => { 
                this.subjectAddingStatus = success.success;
                this.subjectForm.reset();
            }
            );
    }
}

export class Subject {
    public subject_area: string;
    public description: string;
}