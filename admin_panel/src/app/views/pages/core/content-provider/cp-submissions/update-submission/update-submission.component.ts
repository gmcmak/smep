import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

declare var $:any;
declare var jQuery:any;

@Component({
    selector: 'update-submission',
    templateUrl: 'update-submission.component.html',
    styleUrls: ['update-submission.component.css']
})

export class UpdateSubmissionComponent implements OnInit{

    public sub: any;
    public id: number;
    public user_id;

    itemList = [];
    selectedItems = [];
    settings = {};

    constructor(
        private route: ActivatedRoute
    ){}

    ngOnInit(): void {
        /**
         * get param id value from the router
         */
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.user_id = +params['user_id'];
        });

        console.log(this.user_id);

        this.itemList = [
            { "id": 1, "itemName": "India" },
            { "id": 2, "itemName": "Singapore" },
            { "id": 3, "itemName": "Australia" },
            { "id": 4, "itemName": "Canada" },
            { "id": 5, "itemName": "South Korea" },
            { "id": 6, "itemName": "Brazil" },
            { "id": 7, "itemName": "India" },
            { "id": 8, "itemName": "Singapore" },
            { "id": 9, "itemName": "Australia" },
            { "id": 10, "itemName": "Canada" },
            { "id": 11, "itemName": "South Korea" },
            { "id": 12, "itemName": "Brazil" }
        ];

        // this.selectedItems = [
        //     { "id": 1, "itemName": "India" },
        //     { "id": 2, "itemName": "Singapore" },
        //     { "id": 3, "itemName": "Australia" },
        //     { "id": 4, "itemName": "Canada" }];
        this.settings = {
            text: "Select Countries",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            classes: "myclass custom-class"
        };
    }

    onItemSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }
    OnItemDeSelect(item: any) {
        console.log(item);
        console.log(this.selectedItems);
    }
    onSelectAll(items: any) {
        console.log(items);
    }
    onDeSelectAll(items: any) {
        console.log(items);
    }


}