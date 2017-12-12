import { Component, OnInit } from "@angular/core";
import {FormGroup, FormControl, Validators, FormsModule} from "@angular/forms";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'content-authorizer-report',
    templateUrl: 'content-authorizer-report.component.html',
    styleUrls: ['content-authorizer-report.component.css']
})

export class ContentAuthorizerReportComponent implements OnInit{
    ngOnInit(): void {
        //throw new Error("Method not implemented.");
        $("#caFromDate").datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true
        });

        $("#caToDate").datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true
        });

        this.dataTable();
    
    }
    //load authorizer history table
    dataTable(){
        $('#AuthorizerHistoryTable').DataTable({
            // "paging":   false,
            // "ordering": false,
            // "info":     false,
            "searching": false
        });
    }

    searchAuthorizer = new FormGroup({
        caName: new FormControl(''),
        caStatus: new FormControl(''),
        caFromDate: new FormControl(''),
        caToDate: new FormControl('')
    });
}