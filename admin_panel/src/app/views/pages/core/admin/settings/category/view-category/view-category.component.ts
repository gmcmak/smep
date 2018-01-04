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
     * get category details for category table
     */
    getCategories(){
        this.CategoryService.getCategoriesList()
            .subscribe(
                success=>{
                    this.categoryList=success.success;
                    // $("#categoryTable").find('tbody').empty();
                    // var dataClaims = this.categoryList;
                    // for (let i = 0; i < dataClaims.length; i++) {
                    //     $('#categoryTable').dataTable().fnAddData([
                    //         (i + 1),
                    //         dataClaims[i].en_name,
                    //         dataClaims[i].si_name,
                    //         dataClaims[i].ta_name,
                    //         '<label class="switch"><input type= "checkbox" value= "' + dataClaims[i].status + '" ><span class="slider round" > </span></label>',
                    //         '<a [routerLink]="[' + "'" + "../../../settings/category/update-category" + "'" + ']"' + ' class="fa fa-1x fa-pencil-square-o"></a>',
                    //         '<a data-toggle="modal" data-target="#deleteModal"><li class="fa  fa-1x fa-trash"></li></a>'
                    //     ]);
                    // }
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
                this.getCategories();
                this.hideAlert();
            }
        );
    }
}