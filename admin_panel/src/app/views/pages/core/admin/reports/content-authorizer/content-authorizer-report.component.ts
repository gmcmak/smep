import { Component, OnInit } from "@angular/core";
import {FormGroup, Validators, FormsModule, FormBuilder} from "@angular/forms";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'content-authorizer-report',
    templateUrl: 'content-authorizer-report.component.html',
    styleUrls: ['content-authorizer-report.component.css']
})

export class ContentAuthorizerReportComponent implements OnInit{

    public authorizerInfo = new AuthorizerInfo();

    public searchAuthorizer: FormGroup;

    constructor(private formBuilder: FormBuilder){

    }

    ngOnInit(): void {
        
        this.authorizerSearch();

        $("#caFromDate").datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true
        }).on('change', e => this.authorizerInfo.caFromDate = e.target.value);

        $("#caToDate").datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true
        }).on('change', e => this.authorizerInfo.caToDate = e.target.value);

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

    private authorizerSearch(): void{
        this.searchAuthorizer = this.formBuilder.group({
            'caName': [null],
            'caStatus': [null],
            'caFromDate': [null],
            'caToDate': [null]
        });
    }
}

export class AuthorizerInfo{
    public caName: string;
    public caStatus: string;
    public caFromDate: string;
    public caToDate: string;
}