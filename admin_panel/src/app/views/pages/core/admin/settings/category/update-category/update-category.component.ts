import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from "../../../../../../../services/businessservices/core/settings/category.service";

@Component({
    selector: 'update-category',
    templateUrl: 'update-category.component.html',
    styleUrls: ['update-category.component.css']
})

export class UpdateCategoryComponent implements OnInit{
    public category = new Category();
    public categoryForm: FormGroup;
    public id;
    public editCategoryList;
    public updateCategoryList;
    public categoryUpdatingStatus;
    public 

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService
    ) {}

    ngOnInit(): void {
        this.initializeCategoryForm();
        this.editCategory();
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
            this.id=4
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
            this.id=4,
            formData.english_name,
            formData.sinhala_name,
            formData.tamil_name,
            formData.category_status
        ).subscribe(
            success => {
                this.categoryUpdatingStatus = success.success;
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