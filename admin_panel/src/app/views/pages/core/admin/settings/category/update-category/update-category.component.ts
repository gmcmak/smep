import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from "../../../../../../../services/businessservices/core/settings/category.service";
import { ActivatedRoute } from "@angular/router";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'update-category',
    templateUrl: 'update-category.component.html',
    styleUrls: ['update-category.component.css']
})

export class UpdateCategoryComponent implements OnInit{
    public category = new Category();
    public categoryForm: FormGroup;
    public editCategoryList;

    public sub: any;
    public id: number;
    public editId;

    public updateCategoryList;
    public categoryUpdatingStatus;
    
    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.initializeCategoryForm();

        /**
         * get param id value from the router
         */
        this.sub = this.route.params.subscribe(params => {
            this.editId = +params['id'];
        });

        this.editCategory();
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

    private initializeCategoryForm(): void {
        this.categoryForm = this.formBuilder.group({
            'english_name': [null, [Validators.required]],
            'sinhala_name': [null, [Validators.required]],
            'tamil_name': [null, [Validators.required]],
            'category_status': [null, [Validators.required]],
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
        return !this.categoryForm.get(field).valid && this.categoryForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }
    
    /**
     * get data for edit
     */
    editCategory(){
        this.categoryService.editCategoriesList(
            this.editId
        )
            .subscribe(
                success => {
                    this.editCategoryList = success.success;
                    this.category.englishName = this.editCategoryList[0].en_name;
                    this.category.sinhalaName = this.editCategoryList[0].si_name;
                    this.category.tamilName = this.editCategoryList[0].ta_name;
                    this.category.categoryStatus = this.editCategoryList[0].status;
                }
            );
    }

    /**
     * update category data
     */
    updateCategory(formData){
        this.categoryService.updateCategory(
            this.editId,
            formData.english_name,
            formData.sinhala_name,
            formData.tamil_name,
            formData.category_status
        ).subscribe(
            success => {
                this.categoryUpdatingStatus = success.success;
                this.categoryForm.reset();
                this.hideAlert();
            }
        );
    }
}

export class Category {
    public englishName: string;
    public sinhalaName: string;
    public tamilName: string;
    public categoryStatus: boolean;
}