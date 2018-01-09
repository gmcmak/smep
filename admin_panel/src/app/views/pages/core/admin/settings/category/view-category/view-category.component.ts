import {Component, OnInit} from "@angular/core";
import { LocalStorageStore } from "../../../../../../../services/storage/local-storage.service";
import { Router } from "@angular/router";
import { CategoryService } from "../../../../../../../services/businessservices/core/settings/category.service";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-category',
    templateUrl: 'view-category.component.html',
    styleUrls: ['view-category.component.css']
})

export class ViewCategoryComponent implements OnInit{

    public categoryList;
    private loggedInUserList;

    public categoryDeletingStatus;
    public error = 0;

    constructor(
        private CategoryService: CategoryService,
        private router: Router,
        private localStorageService: LocalStorageStore,
    ) { }

    ngOnInit(): void {

        setTimeout(function(){
            $('#categoryTable').DataTable({
            });  
        }, 2000);

        this.getCategories();

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
    public changeAlertClass(){
        return{
            'alert-success': this.error === 0,
            'alert-danger': this.error != 0
        }
    }

    /**
     * get category details for category table
     */
    getCategories(){
        this.CategoryService.getCategoriesList()
            .subscribe(
                success=>{
                    this.categoryList=success.success;
                }
            );
    }

    /**
     * delete category
     */
    deleteCategory(deleteId){
        this.CategoryService.deleteCategory(
            deleteId
        ).subscribe(
            success => {
                this.categoryDeletingStatus = success.success;
                this.error = success.error;
                this.getCategories();
                this.hideAlert();
            }
        );
    }
}