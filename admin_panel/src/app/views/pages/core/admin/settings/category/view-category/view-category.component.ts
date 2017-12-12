import {Component, OnInit} from "@angular/core";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-category',
    templateUrl: 'view-category.component.html',
    styleUrls: ['view-category.component.css']
})

export class ViewCategoryComponent implements OnInit{
    ngOnInit(): void {
        this.dataTable();
    }


    dataTable() {
        $('#categoryTable').DataTable({
            "language": {
                "search": "Search by: (English/ Sinhala/ Tamil)"
            }

        });
    }
}