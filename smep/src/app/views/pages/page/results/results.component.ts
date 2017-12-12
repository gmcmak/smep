import { Component, OnInit, ChangeDetectorRef  } from '@angular/core';

import { Inject } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {URLSearchParams, Http, Response, Headers} from "@angular/http";
import {MdDialog, MdDialogRef, MD_DIALOG_DATA, MdDatepickerModule, PageEvent} from '@angular/material';

import { LocalStorageStore } from '../../../../services/storage/local-storage.service';
import { SearchService } from "../../../../services/businessservices/domain/search/search.service";
import { UserService } from "../../../../services/businessservices/domain/social/user.service";

import {BrowserModule} from '@angular/platform-browser'
import {DomSanitizer} from "@angular/platform-browser";

import { Page } from '../page.component';
declare var $: any;
declare var jQuery: any;


@Component({
    selector: 'results',
    styleUrls: ['./results.component.css'],
    templateUrl: './results.component.html',
})


export class ResultsPage extends Page implements OnInit {

    private context;
    keyword: string;
    private data;
    private dataNumberOfRecords=0;
    private dataLoadTime;
    private imageData;
    private imageNumberOfRecords;
    private imageLoadTime;    
    private videoData;
    private videoNumberOfRecords;
    private videoLoadTime;      
    selectedOption:string;
    public searchResult: string;
    sub;
    private listHistory: any[]; // history array
    private searchTextNumber;
    private maxHistoryShow: number = 10; // history limit
    private historyStartingValue: number;
    private historyListToShow: any[]; // history limited array
    private tabActive;
    private settings =  {
        'r':'RELEVANCE',
        'n':'NEWEST_FIRST',
        'o':'OLDEST_FIRST'
    };
    settingKeys: Array<string> = ['r','n','o'];
    private tab;
    private sortOrder;
    private sortOrderKey;

    // MdPaginator Inputs
    length = 100;
    pageSize = 10;
    pageSizeOptions = [5, 10, 25, 100];
    // MdPaginator Output
    pageEvent: PageEvent;    
    private rating;
    private social;
    private visibilityTakeRates;
    private visibilityRatedBox;
    private relatedData: any[];
    private rowCounter = 0;
    // pagination
    private totalPages;
    private itemPerPage = 10;
    private paginationStartingValue = 0;
    private pageStartingValue: number;
    // content types
    private contentTypes;
    private selectedContentTypes: any[];
    // user login data
    loggedInUserList: any[];
    // social share keywords
    private WebURL;
    private facebookURL;
    private linkedinURL;
    private twitterURL;
    // advanced search fields
    private toDate;
    private fromDate;
    private contentDates;  
    private as_q_1;
    private as_ty_1;
    private as_q_2;
    private as_ty_2;
    private as_op; 
    private checkbox;
    // list user rated
    private userRatedList: any[];
    private shiftSearch = 0;

    constructor(
        private localStorageService: LocalStorageStore, 
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private http:Http,
        public dialog: MdDialog,
        private searchService: SearchService,
        private _cdRef: ChangeDetectorRef,
        private userService: UserService,
        private domSanitizer : DomSanitizer
    ) {
        super();
        this.userRatedList = JSON.parse(this.localStorageService.get('userRatedList'));
        this.rating = "value-0";
        this.social = false;
        this.visibilityRatedBox = true;
        this.visibilityTakeRates = false;
    }

    ngOnInit() {
        this.sub = this.activatedRoute.queryParams.subscribe(params => {
            // user login data
            this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));            
            // query string
            this.context = params['q'];
            if(params['so']){
                this.sortOrderKey = params['so'];
                this.sortOrder = this.settings[params['so']];
            }else{
                this.sortOrder = this.settings['r'];
                this.sortOrderKey = "r";
            }
            
      
            // advanced search parameters
            this.shiftSearch = params['adv'];
            if(params['cd']){
                this.contentDates = params['cd'];
            }else{
                this.contentDates = null;
            }   
            //hide filterbar from search result
            this.hideDisplay();
            if(params['fd']){
                this.fromDate = params['fd'];
            }else{
                this.fromDate = null;
            }   
            if(params['td']){
                this.toDate = params['td'];
            }else{
                this.toDate = null;
            }  
            
            if(params['as_q_1']){
                this.as_q_1 = params['as_q_1'];
            }else{
                this.as_q_1 = null;
            }  
            if(params['as_ty_1']){
                this.as_ty_1 = params['as_ty_1'];
            }else{
                this.as_ty_1 = null;
            }  
            if(params['as_q_2']){
                this.as_q_2 = params['as_q_2'];
            }else{
                this.as_q_2 = null;
            }  
            if(params['as_ty_2']){
                this.as_ty_2 = params['as_ty_2'];
            }else{
                this.as_ty_2 = null;
            }  
            if(params['as_op']){
                this.as_op = params['as_op'];
            }else{
                this.as_op = null;
            } 
            if(params['content_type']){
                this.contentTypes = params['content_type'];
                this.checkedContentType(this.contentTypes);
            }else{
                this.contentTypes = null;
            }                                                                          
            
            // list of history data  
            this.listHistory = JSON.parse(this.localStorageService.get('searchTextList'));      
            this.createHistoryLatestList(this.listHistory);
            // get image data
            this.tabActive = params['t'];
            this.getRelatedSearchTerms(this.context);
            if(this.tabActive == 'images'){
                // image data
                this.getImageData(
                    this.context, 
                    this.sortOrderKey, 
                    this.paginationStartingValue, 
                    this.contentTypes, 
                    this.contentDates, 
                    this.fromDate, 
                    this.toDate,
                    this.as_q_1,
                    this.as_q_2,
                    this.as_ty_1,
                    this.as_ty_2,
                    this.as_op
                );
                this.clearImageDivContent();
            } else if(this.tabActive == 'videos'){
                // video data
                this.getVideoData(
                    this.context, 
                    this.sortOrderKey, 
                    this.paginationStartingValue, 
                    this.contentTypes, 
                    this.contentDates, 
                    this.fromDate, 
                    this.toDate,
                    this.as_q_1,
                    this.as_q_2,
                    this.as_ty_1,
                    this.as_ty_2,
                    this.as_op
                );
            } else {
                // get all data
                this.getData(
                    this.context, 
                    this.sortOrderKey, 
                    this.paginationStartingValue, 
                    this.contentTypes, 
                    this.contentDates, 
                    this.fromDate, 
                    this.toDate,
                    this.as_q_1,
                    this.as_q_2,
                    this.as_ty_1,
                    this.as_ty_2,
                    this.as_op
                );
            }


        });
        this._cdRef.detectChanges();
    }   

    ngAfterViewInit(): void {
         this.checkedContentType(this.contentTypes);
    }

    /**
     * set pagination
     * @param setPageSizeOptionsInput 
     */
    setPageSizeOptions(setPageSizeOptionsInput: string) {
        this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }    

    /**
     * get all history data and limit that list to latest 10 record
     * @param historyList 
     */
    createHistoryLatestList(historyList){
        if(this.loggedInUserList){
                    this.userService.getSocialUserKeywordsList(this.loggedInUserList.uid)
                        .subscribe(
                            success => {
                                this.historyListToShow = success;
                            }
                        );    
        }else{
            if(historyList.length > this.maxHistoryShow){
                this.searchTextNumber = historyList.length;
                this.historyStartingValue = this.searchTextNumber - this.maxHistoryShow;
                var j=0;
                var dataSet = [];
                for(var i = this.historyStartingValue; i < this.searchTextNumber; i++){
                    dataSet.push(historyList[i]);
                }    
                this.historyListToShow = dataSet;
            }else{
                this.historyListToShow = historyList;
            }
        }
    }

    /**
     * Get ALL result from search service
     * @param searchText the keyword
     * return data array
     *                     this.as_q_1,
                    this.as_q_2,
                    this.as_ty_1,
                    this.as_ty_2,
                    this.as_op
     */
    getData(searchText, sortOrder, paginationStartingValue, contentTypes=null, contentDate=null, fromDate=null, toDate=null, as_q_1=null, as_q_2=null, as_ty_1=null, as_ty_2=null, as_op=null){
        this.searchService.getSearchResult(searchText, sortOrder, this.itemPerPage, paginationStartingValue, contentTypes, contentDate, fromDate, toDate, as_q_1, as_q_2, as_ty_1, as_ty_2, as_op)
            .subscribe(
                success => {
                    this.dataNumberOfRecords = success.hits.total;
                    this.dataLoadTime = success.took/1000;
                    this.data = success.hits.hits;
                    this.setPagination(this.dataNumberOfRecords);
                }
            );
    }

    /**
     * Get Images result from search service
     * @param searchText the keyword
     * return data array
     */
    getImageData(searchText, sortOrder, paginationStartingValue, contentTypes=null, contentDate=null, fromDate=null, toDate=null, as_q_1=null, as_q_2=null, as_ty_1=null, as_ty_2=null, as_op=null){
        this.searchService.getSearchImageResult(searchText, sortOrder, this.itemPerPage, paginationStartingValue, contentTypes, contentDate, fromDate, toDate, as_q_1, as_q_2, as_ty_1, as_ty_2, as_op)
            .subscribe(
                success => {
                    this.imageNumberOfRecords = success.hits.total;
                    this.imageLoadTime = success.took/1000;
                    this.imageData = success.hits.hits;
                    this.setPagination(this.imageNumberOfRecords);
                }
            );
    }

    /**
     * Get Images result from search service
     * @param searchText the keyword
     * return data array
     */
    getVideoData(searchText, sortOrder, paginationStartingValue, contentTypes=null, contentDate=null, fromDate=null, toDate=null, as_q_1=null, as_q_2=null, as_ty_1=null, as_ty_2=null, as_op=null){
        this.searchService.getSearchVideoResult(searchText, sortOrder, this.itemPerPage, paginationStartingValue, contentTypes, contentDate, fromDate, toDate, as_q_1, as_q_2, as_ty_1, as_ty_2, as_op)
            .subscribe(
                success => {
                    this.videoLoadTime = success.took/1000;
                    this.videoNumberOfRecords = success.hits.total;
                    this.videoData = success.hits.hits;
                    this.setPagination(this.videoNumberOfRecords);
                }
            );
    }

    /**
     * Get related search terms from backend
     * @param searchText 
     */
    getRelatedSearchTerms(searchText){
        this.searchService.relatedSearch(searchText)
            .subscribe(
                success => {
                    this.relatedData = success;
                }
            );
    }
    
    /**
     * open result in new page
     * @param url 
     */
    openNewPage(url){
        window.open(url);
    }

    /**
     * search settings
     * @param so // pass value from dropdown 
     */
    filter(so){
        this.activatedRoute.queryParams.subscribe(params => {
            // query string
            this.context = params['q'];
            this.tab = params['t'];
        });        
        this.router.navigate(['../filter-manager'], { queryParams: { q: this.context, t:this.tab, so:so} });
    }

    /**
     * this is used to catch ratings from the front end
     * @param value 
     */
    handleRatings(value, dataId, tabName){
        $('#'+tabName+dataId).removeClass(function (index, className) {
           return (className.match (/(^|\s)value-\S+/g) || []).join('');
        });
        var newValue = "value-"+value;
        $('#'+tabName+dataId).addClass(newValue);

        var recordId = tabName+"_"+dataId;
        if(this.loggedInUserList){
            if(this.userRatedList){
                var availabililtyCheck = this.userRatedList.indexOf(recordId);
                if(availabililtyCheck<0){
                    var rateNextNumber = this.userRatedList.length;
                    this.userRatedList[rateNextNumber] = recordId; 
                    this.localStorageService.put('userRatedList', JSON.stringify(this.userRatedList,recordId));
                    $.notify("Successfully voted...!", "info", {autoHideDelay: 1000});
                    this.userService.updateUserRate(value, dataId, tabName).subscribe();                
                }else{
                    $.notify("Already voted...!", "warn", {autoHideDelay: 1000});
                }
            }else{
                this.userRatedList = [recordId];                     
                this.localStorageService.put('userRatedList', JSON.stringify(this.userRatedList));
                $.notify("Successfully voted...!", "info", {autoHideDelay: 1000});
            } 
        }else{
            $.notify("Please login to submit your votes...!", "warn", {autoHideDelay: 1000});
        }
    }

    /**
     * this is used as jquery function l
     * this is used to show/hide social icons from the search results
     */
    showHideSocial(dataId, tabName){
       $("#social"+tabName+dataId).toggle();
    }

    /**
     * this is use as jquery function
     * after mouseout from the rating bar (after take rates)
     * this will be worked
     * @param dataId 
     */
    hideTakeRates(dataId, tabName){
        $('#'+tabName+dataId).hide();  
        $('#rated'+tabName+dataId).show();
    }
    
    /**
     * this is use as a jquery function
     * when mouseover to give rates
     * average rate bar will be hide, take rate will be displayed
     * @param dataId 
     */
    hideDisplayRates(dataId, tabName){
        $('#rated'+tabName+dataId).hide();
        $('#'+tabName+dataId).show();
    }

    /**
     * under all data user can select content types.
     * this is used to track checked content types from the query string
     * @param str 
     */
    checkedContentType(str){
        //this.checkbox.attr("checked","checked");        
        for (var i=0; i!=str.length;i++) {
            var checkbox = $("input[name='contentType[]'][value='"+str[i]+"']");
            checkbox.attr("checked","checked");
        }        
        if( typeof str === 'string' ) {
            var checkbox = $("input[name='contentType[]'][value='"+str+"']");
            checkbox.attr("checked","checked");           
        }        
    }

    /**
     * this is used to set pagination
     * @param numberOfRecords 
     */
    setPagination(numberOfRecords){
        var self = this;
        var totalPages = Math.ceil(numberOfRecords/this.itemPerPage);
        if(this.tabActive == 'images'){
            var obj = $('#pagination2').twbsPagination({
                totalPages: totalPages,
                visiblePages: 10,
                onPageClick: function (event, page) {
                    if(page == 1){
                        this.pageStartingValue = 0;
                    }else{
                        this.pageStartingValue = parseInt(page)-1;
                        this.pageStartingValue = this.pageStartingValue * self.itemPerPage;
                    }
                    self.getImageData(self.context, self.sortOrderKey, this.pageStartingValue);
                }
            });
        } else if(this.tabActive == 'videos'){
            var obj = $('#pagination3').twbsPagination({
                totalPages: totalPages,
                visiblePages: 10,
                onPageClick: function (event, page) {
                    if(page == 1){
                        this.pageStartingValue = 0;
                    }else{
                        this.pageStartingValue = parseInt(page)-1;
                        this.pageStartingValue = this.pageStartingValue * self.itemPerPage;
                    }
                    self.getVideoData(self.context, self.sortOrderKey, this.pageStartingValue);
                }
            });
        } else {
            var obj = $('#pagination').twbsPagination({
                totalPages: totalPages,
                visiblePages: 10,
                onPageClick: function (event, page) {
                    if(page == 1){
                        this.pageStartingValue = 0;
                    }else{
                        this.pageStartingValue = parseInt(page)-1;
                        this.pageStartingValue = this.pageStartingValue * self.itemPerPage;
                    }
                    self.getData(
                        self.context, 
                        self.sortOrderKey, 
                        this.pageStartingValue, 
                        self.contentTypes,
                        self.contentDates, 
                        self.fromDate, 
                        self.toDate,
                        self.as_q_1,
                        self.as_q_2,
                        self.as_ty_1,
                        self.as_ty_2,
                        self.as_op                        
                    );
                }
            });
            
    
        }
    }

    /**
     * based on number of records 
     * this method generate pagintion
     * @param numberOfRecords
     */
    getAllPagination(numberOfRecords){
        var self = this;
        var totalPages = Math.ceil(numberOfRecords/this.itemPerPage);        
        var obj = $('#pagination').twbsPagination({
            totalPages: totalPages,
            visiblePages: 10,
            onPageClick: function (event, page) {
                if(page == 1){
                    this.pageStartingValue = 0;
                }else{
                    this.pageStartingValue = parseInt(page)-1;
                    this.pageStartingValue = this.pageStartingValue * self.itemPerPage;
                }
                self.getData(self.context, self.sortOrderKey, this.pageStartingValue, self.contentTypes,
                        self.contentDates, 
                        self.fromDate, 
                        self.toDate,
                        self.as_q_1,
                        self.as_q_2,
                        self.as_ty_1,
                        self.as_ty_2,
                        self.as_op                 
                );
            }
        });        
    }

    /**
     * when user select content types this method used to build the query string
     * and redirected to relevent result
     */
    getContentType(){
        var self = this;
        self.pageStartingValue = 0;
        var contentTypes = new Array();
        $.each($("input[name='contentType[]']:checked"), function() {
            contentTypes.push($(this).val());
        });
        self.activatedRoute.queryParams.subscribe(params => {
            // query string
            self.context = params['q'];
            self.tab = params['t'];
            if(params['so']){
                self.sortOrderKey = params['so'];
                self.sortOrder = self.settings[params['so']];
            }else{
                self.sortOrder = self.settings['r'];
                self.sortOrderKey = "r";
            }            
        });   
        self.router.navigate(['../filter-manager'], { queryParams: { q: self.context, t:self.tab, so:self.sortOrderKey, content_type:contentTypes} }); 
    }



    /**
     * this is used to share result on social media
     * @param link shared type
     */
    socialTab(link, source){
      if(link == 'fb'){
        // set url for social share buttons
        this.facebookURL = "https://www.facebook.com/sharer/sharer.php?u="+source;          
        window.open(
            this.facebookURL,
            '_blank' 
        );  
      }
      if(link == 'ln'){
        // set url for social share buttons
        this.linkedinURL = "https://www.linkedin.com/shareArticle?url="+source;          
        window.open(
            this.linkedinURL,
            '_blank' 
        );  
      }  
      if(link == 'tw'){
        // set url for social share buttons
        this.twitterURL = "https://twitter.com/intent/tweet?text="+source;          
        window.open(
            this.twitterURL,
            '_blank' 
        );  
      }  
  }

  /**
   * this is used to propely align image divs inside image data
   */
  clearImageDivContent(){
    $('div#imagestb > div.itemset:nth-child(3n)').after('<div class="clear">&nbsp;</div>');      
  }

  /**
   * this is used to hide filter section when advanced search results
   * on screen
   */
  hideDisplay(){
      if(this.contentDates == null){
        return true;
      }else{
        return false;
      }
  }


  


}



