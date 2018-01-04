import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthorService } from "../../../../../../../services/businessservices/core/settings/author.service";
import { Router } from "@angular/router";
import { LocalStorageService } from "angular-2-local-storage/dist/local-storage.service";
import { ActivatedRoute } from "@angular/router";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'update-author',
    templateUrl: 'update-author.component.html',
    styleUrls: ['update-author.component.css']
})

export class UpdateAuthorComponent{

    public author = new Author();
    public authorForm: FormGroup;
    public authorUpdatingStatus;
    public editAuthorList;
    public updateAuthorList;

    public sub: any;
    public id: number;
    public editId: number;

    constructor(
        private formBuilder: FormBuilder,
        private authorService: AuthorService,
        private router: Router,
        private localStorageService: LocalStorageService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.initializeAuthorsForm();

        /**
         * get param id value from the router
         */
        this.sub = this.route.params.subscribe(params => {
            this.editId = +params['id'];
        });

        this.editAuthor();
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

    private initializeAuthorsForm(): void {
        this.authorForm = this.formBuilder.group({
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
        return !this.authorForm.get(field).valid && this.authorForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }
    
    /**
     * get athour details for update
     */
    public editAuthor(){
        this.authorService.editAuthors(
            this.editId
        ).subscribe(
            success => { 
                this.editAuthorList = success.success;
                //alert(success.success[0].en_name);
                this.author.englishName = this.editAuthorList[0].en_name;
                this.author.sinhalaName = this.editAuthorList[0].si_name;
                this.author.tamilName = this.editAuthorList[0].ta_name; 
            }
        );

    }

    /**
     * update author's details
     */
    updateAuthor(formData){
        this.authorService.updateAuthor(
            this.editId,
            formData.english_name,
            formData.sinhala_name,
            formData.tamil_name
        ).subscribe(
            success => {
                this.authorUpdatingStatus = success.success;
                this.authorForm.reset();
                this.hideAlert();
            }
        );
    }

    formReset(){
        this.authorForm.reset();
    }
}

export class Author {
    public englishName: string;
    public sinhalaName: string;
    public tamilName: string;
}