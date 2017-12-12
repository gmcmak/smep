import {Component,OnInit} from '@angular/core';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-institute',
    templateUrl: 'view-institute.component.html',
    styleUrls: ['view-institute.component.css']
})

export class ViewInstituteComponent implements OnInit{
    ngOnInit(): void {
        this.dataTable();
    }

    dataTable() {
        $('#instituteTable').DataTable({
            "language": {
                "search": "Search by: (Institute's name/ Registered date/ Address)"
            }
        });
    }

}