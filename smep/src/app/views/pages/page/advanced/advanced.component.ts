import { Component, OnInit  } from '@angular/core';
import { Inject } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {URLSearchParams, Http, Response, Headers} from "@angular/http";

import {BrowserModule} from '@angular/platform-browser'
import {DomSanitizer} from "@angular/platform-browser";

import { LocalStorageStore } from '../../../../services/storage/local-storage.service';

import { FormsModule }   from '@angular/forms';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'advanced',
    styleUrls: ['./advanced.component.css'],
    templateUrl: './advanced.component.html',
})
export class AdvancedSearch implements OnInit {

    private context;
    keyword: string;
    private data;
    private sortOrderKey;
    private sortOrder;
    private sub;
    private tabActive;
    private ref;
    private WebURL;
    private fetchedHtml;
    // form data
    private searchFor1;
    private searchForType1;
    private searchForTypeCondition1;
    private searchFor2;
    private searchForType2;
    private toDate;
    private toDateQuery="";
    private fromDate;
    private fromDateQuery="";
    private contentDates;
    private contentDateQuery = "All";
    private contentType;
    private contentTypeQuery = "";
    private completeQuery;
    private advancedForm;


    constructor(
        private store: LocalStorageStore, 
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private http:Http,
        private domSanitizer : DomSanitizer,
        
    ) {
        this.datePickerSetup();
    }



    ngOnInit() {
        this.sub = this.activatedRoute.queryParams.subscribe(params => {
            // query string
            this.context = params['q'];
            if(params['so']){
                this.sortOrderKey = params['so'];
            }else{
                this.sortOrderKey = "";
            }
            this.tabActive = params['t'];
            this.ref = params['ref'];
            this.WebURL = this.domSanitizer.bypassSecurityTrustResourceUrl(this.ref);
        });

    }      

    /**
     * this is used to popup datepicker on advanced search view
     * @param fieldId 
     */
    datePickerSetup(){
        $( function() {
            $( "#fromDate" ).datepicker({ dateFormat: 'yy-mm-dd' });
            $( "#toDate" ).datepicker({ dateFormat: 'yy-mm-dd' });
        } );
    }


    durationController(){
        this.contentDates = $('input[name=contentDates]:checked').val();
        if(this.contentDates == '0'){

        }else{
            $('#toDate').val(''); 
            $('#fromDate').val('');
        }        
    }

    /**
     * advanced search form data
     * @param advancedForm 
     */
    advancedSearch(advancedForm){
        this.searchFor1 = advancedForm.searchFor1;
        this.searchFor2 = advancedForm.searchFor2;
        this.searchForType1 = $('#searchForType1').val();
        this.searchForType2 = advancedForm.searchForType2;
        this.searchForTypeCondition1 = advancedForm.searchForTypeCondition1;
        this.contentType = $('input[name=contentType]:checked').val();
        this.contentDates = $('input[name=contentDates]:checked').val();
        this.toDate = $('#toDate').val();
        this.fromDate = $('#fromDate').val();

        // "w1:this.searchFor1 t1:this.searchForType1" op:this.searchForTypeCondition1 "w2:this.searchFor1 t2:this.searchForType1" 
        // ct:this.contentType cd:this.contentDates fd:this.fromDate td:this.toDate
        
        if(this.searchFor1 && this.searchForType1){
            this.completeQuery = '"w1:'+this.searchFor1+' t1:'+this.searchForType1+'"';
        }
        if(this.searchForTypeCondition1){
            this.completeQuery = this.completeQuery+" "+'op:'+this.searchForTypeCondition1;
        }
        if(this.searchFor2 && this.searchForType1){
            this.completeQuery = this.completeQuery+" "+'"w2:'+this.searchFor2+' t2:'+this.searchForType2+'"';
        }     

        if(this.contentType){
            this.contentTypeQuery = this.contentType;
        }      

       // if(this.contentDates){
            this.contentDateQuery = this.contentDates;
       // }  

        if(this.fromDate){
            this.fromDateQuery = this.fromDate;
        }                  
        if(this.toDate){
            this.toDateQuery = this.toDate;
        }         
        
        //this.completeQuery ; 

            this.router.navigate(['../results'], { queryParams: { 
                adv: 1, 
                q: '', 
                t:'all', 
                content_type:this.contentTypeQuery, 
                cd:this.contentDateQuery,
                fd:this.fromDateQuery,
                td:this.toDateQuery,
                as_q_1:this.searchFor1,
                as_ty_1:this.searchForType1,
                as_q_2:this.searchFor2,
                as_ty_2:this.searchForType2,
                as_op:this.searchForTypeCondition1
            } 
        });
    }

    bindTopElements(){
        if (!$("input[name='searchForTypeCondition1']:checked").val()) {
           $('.searchForTypeCondition1').first().prop('checked',true);
        }
    }

}

