import {Component, OnInit} from '@angular/core';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-explore',
    templateUrl: 'view-explore.component.html',
    styleUrls: ['view-explore.component.css']
})

export class ViewExploreComponent implements OnInit{
    ngOnInit(): void {
        this.dataTable();
    }


    dataTable() {
        $('#exploreTable').DataTable({
            "language": {
                "search": "Search by: (English/ Sinhala/ Tamil)"
            }

        });
    }
}