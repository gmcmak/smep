import { Component, OnInit } from "@angular/core";
import {FormControl,Validators,FormGroup, FormsModule, FormBuilder} from "@angular/forms";
import { Http, Response } from "@angular/http";
import * as _ from 'underscore';
import { PagerService } from "../../../../../../_services/index";
import { ContentService } from "../../../../../../services/businessservices/core/content/content.service";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'content-provider-report',
    templateUrl: 'content-provider-report.component.html',
    styleUrls: ['content-provider-report.component.css']
})

export class ContentProviderReportComponent implements OnInit{

    public providerInfo = new ProviderInfo();
    public dataArray = new Array();
    public showPublishDate = 0; //variable value for show hide publish date

    public searchProvider: FormGroup;

    constructor (
        private formBuilder: FormBuilder,
        private http: Http,
        private pagerService: PagerService,
        private contentService: ContentService
    ){}

    // array of all items to be paged
    private allItems: any[];

    // pager object
    pager: any = {};

    // paged items
    pagedItems: any[];

    ngOnInit(): void {
        this.initializeProviderSearch();
        this.providerInfo.cpStatus = 0;
        this.searchContents(0, null, null); 

        $("#cpFromDate").datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true
        }).on('change', e => this.providerInfo.cpFromDate = e.target.value);

        $("#cpToDate").datepicker({
            dateFormat: 'yy-mm-dd',
            changeMonth: true,
            changeYear: true
        }).on('change', e => this.providerInfo.cpToDate = e.target.value);     
            
    }

    //load authorizer history table
    dataTable(){
        $('#providerHistoryTable').DataTable({
            "searching": false
        });
    }
    
    private initializeProviderSearch(): void{
        this.searchProvider = this.formBuilder.group({
            'cpStatus': [null],
            'cpFromDate': [null],
            'cpToDate': [null]
        });
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);

        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    public searchContents(cpStatus, cpFromDate, cpToDate){
        if (cpStatus == 1) {
            this.showPublishDate = 1;
        }
        else{
            this.showPublishDate = 0;
        }
        this.allItems = [];
        this.pager = {};
        this.pagedItems =[];
        this.contentService.providerContentsHistory(
            cpStatus,
            cpFromDate,
            cpToDate
        ).subscribe(
            success => {
                this.dataArray = success.success;
                this.allItems = this.dataArray;
                this.setPage(1);
            }
        );
    }
}

export class ProviderInfo{
    public cpStatus: number;
    public cpFromDate: string;
    public cpToDate: string;
}