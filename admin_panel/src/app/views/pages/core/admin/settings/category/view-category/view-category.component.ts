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
    public statusId = 0;

    constructor(
        private CategoryService: CategoryService,
        private router: Router,
        private localStorageService: LocalStorageStore,
    ) { }

    ngOnInit(): void {
        this.getCategories();
        this.loadTable();
    }

    /**
     * load table
     */
    public loadTable(){
        setTimeout(function () {
            $('#categoryTable').DataTable({
            });
        }, 2000);
    }

    /**
     * delete table and reload table
     */
    public deleteTable(){
        var x = 0;
        var table = $('#categoryTable').DataTable();
        if(table.destroy()){
            var x = 1;
        }
        if(x == 1){
            this.loadTable();
        }
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
     * change status
     */
    public changeStatus(id, status) {
        if (status == false) {
            this.statusId = 0;
        }
        else {
            this.statusId = 1;
        }
        this.CategoryService.updateCategoryStatus(
            id,
            this.statusId
        ).subscribe(
            success => {
                this.categoryDeletingStatus = success.success;
                this.error = success.error;
                this.hideAlert();
            }
            );
    }

    /**
     * delete category
     */
    deleteCategory(deleteId, name) {
        if (confirm("Are you sure to delete ' " + name + " ' ?")) {
            this.CategoryService.deleteCategory(
                deleteId
            ).subscribe(
                success => {
                    this.categoryDeletingStatus = success.success;
                    this.error = success.error;
                    this.getCategories();
                    this.hideAlert();
                    this.deleteTable();
                }
                );
        }
    }
}