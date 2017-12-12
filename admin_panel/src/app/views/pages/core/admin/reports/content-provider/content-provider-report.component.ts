import { Component, OnInit } from "@angular/core";
import {FormControl,Validators,FormGroup, FormsModule} from "@angular/forms";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'content-provider-report',
    templateUrl: 'content-provider-report.component.html',
    styleUrls: ['content-provider-report.component.css']
})

export class ContentProviderReportComponent implements OnInit{
    ngOnInit(): void {
        //throw new Error("Method not implemented.");

        $("#cpFromDate").datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true
        });

        $("#cpToDate").datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true
        });

        this.dataTable();
    }

    //load authorizer history table
    dataTable(){
        $('#providerHistoryTable').DataTable({
            "searching": false
        });
    }
    public cpName: string;
    
    searchProvider = new FormGroup({
        cpName: new FormControl(''),
        cpStatus: new FormControl(''),
        cpFromDate: new FormControl(''),
        cpToDate: new FormControl('')
    });

}