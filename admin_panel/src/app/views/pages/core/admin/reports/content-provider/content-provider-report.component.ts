import { Component, OnInit } from "@angular/core";
import {FormControl,Validators,FormGroup, FormsModule, FormBuilder} from "@angular/forms";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'content-provider-report',
    templateUrl: 'content-provider-report.component.html',
    styleUrls: ['content-provider-report.component.css']
})

export class ContentProviderReportComponent implements OnInit{

    public providerInfo = new ProviderInfo();

    public searchProvider: FormGroup;

    constructor (private formBuilder: FormBuilder){

    }
    ngOnInit(): void {
        this.initializeProviderSearch();

        $("#cpFromDate").datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true
        }).on('change', e => this.providerInfo.cpFromDate = e.target.value);

        $("#cpToDate").datepicker({
            dateFormat: 'dd/mm/yy',
            changeMonth: true,
            changeYear: true
        }).on('change', e => this.providerInfo.cpToDate = e.target.value);

        this.dataTable();
    }

    //load authorizer history table
    dataTable(){
        $('#providerHistoryTable').DataTable({
            "searching": false
        });
    }
    
    private initializeProviderSearch(): void{
        this.searchProvider = this.formBuilder.group({
            'cpName': [null],
            'cpStatus': [null],
            'cpFromDate': [null],
            'cpToDate': [null]
        });
    }
}

export class ProviderInfo{
    public cpName: string;
    public cpStatus: string;
    public cpFromDate: string;
    public cpToDate: string;
}