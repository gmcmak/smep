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

    constructor(
        private CategoryService: CategoryService,
        private router: Router,
        private localStorageService: LocalStorageStore,
    ) { }

    ngOnInit(): void {
        this.dataTable();
        this.getCategories();
    }


    dataTable() {
        $('#categoryTable').DataTable({
            "language": {
                "search": "Search by: (English/ Sinhala/ Tamil)"
            }

        });
    }

    getCategories(){
        this.CategoryService.getCategoriesList()
            .subscribe(success=>{this.categoryList=success.success});
    }
}