import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubjectService } from "../../../../../../../services/businessservices/core/subject-area/subject.service";
import { ActivatedRoute } from "@angular/router";

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

    public id: number;
    public sub: any;
    public editId: number;

    constructor(
        private formBuilder: FormBuilder,
        private subjectService: SubjectService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.initializeSubjectForm();

        /**
        * get param id value from the router
        */
        this.sub = this.route.params.subscribe(params => {
            this.editId = +params['id'];
        });

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
            this.editId
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
            this.editId,
            dataForm.subject_area,
            dataForm.descriptions
        ).subscribe(
            success => { 
                this.subjectUpdatingStatus = success.success;
                this.subjectForm.reset();
            });
    }

}

export class Subject {
    public subject_area: string;
    public description: string;
}