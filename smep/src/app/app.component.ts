import { Component, OnDestroy } from '@angular/core';
import { AuthService } from "angular2-social-login";
import { Location } from '@angular/common';

import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { StartupService } from './services/settings/application-startup.service';
import { CommonService } from './services/settings/common.service';
import { UserService } from "./services/businessservices/domain/social/user.service";
import { MenuService } from "./services/businessservices/domain/menu/menu.service";

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastCommunicationService } from './services/toast/toast-communication.service';

import { URLSearchParams, Http, Response, Headers } from "@angular/http";

import { LocalStorageStore } from './services/storage/local-storage.service';



@Component({
    selector: 'app',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
    currentDate: Date = new Date();

    private sub: any;
    // Position of Ng2ToastyComponent
    public toastyComponentPosition: string;
    public edited = false;
    private data;
    private context;
    private loggedIn: number;
    searchTextList: any[];
    private searchTextNumber;
    public user;
    private subscribe:any;
    loggedInUserList: any[];
    private exploreMenuItems;
    private shiftSearch = 0;
    private tabActive="all";

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
    // search values
    private as_q_1;
    private as_ty_1;
    private as_q_2;
    private as_ty_2;
    private as_op;    
    private contentTypes; 
    private searchOptions = ['author', 'title', 'keyword'];

    constructor(
                private router: Router, 
                private startup: StartupService, 
                private common:CommonService,
                private slimLoader: SlimLoadingBarService, 
                private toastCommunicationService: ToastCommunicationService,
                private http:Http,
                private activatedRoute: ActivatedRoute,
                private localStorageService: LocalStorageStore,
                private location: Location,
                public _auth: AuthService,
                private userService: UserService,
                private menuService:MenuService
            ) {
                //console.log(router);
                this.searchTextList = JSON.parse(this.localStorageService.get('searchTextList'));
                // We listen the position's changes
                this.toastCommunicationService.position$.subscribe(pos => this.toastyComponentPosition = pos);
                // Listen the navigation events to start or complete the slim bar loading
                this.sub = this.router.events.subscribe(event => {
                    if (event instanceof NavigationStart) {
                        this.slimLoader.start();
                    } else if ( event instanceof NavigationEnd ||
                                event instanceof NavigationCancel ||
                                event instanceof NavigationError) {
                        this.slimLoader.complete();
                    }
                }, (error: any) => {
                    this.slimLoader.complete();
                });
                this.loadExploreMenu();
    }

    ngOnInit() {
        // If there is no startup data received (maybe an error!)
        // navigate to error route
        if (!this.startup.startupData) {
            console.log('NO STARTUP DATA');
            // this.router.navigate(['error'], { replaceUrl: true });
        }
        
        this.activatedRoute
            .queryParams
            .subscribe(params => {


            // advanced search parameters
            this.shiftSearch = params['adv'];
            if(params['cd']){
                this.contentDates = params['cd'];
            }else{
                this.contentDates = '';
            }   
            //hide filterbar from search result
            if(params['fd']){
                this.fromDate = params['fd'];
            }else{
                this.fromDate = '';
            }   
            if(params['td']){
                this.toDate = params['td'];
            }else{
                this.toDate = '';
            }  
            
            if(params['as_q_1']){
                this.as_q_1 = params['as_q_1'];
            }else{
                this.as_q_1 = '';
            }  
            if(params['as_ty_1']){
                this.as_ty_1 = params['as_ty_1'];
            }else{
                this.as_ty_1 = '';
            }  
            if(params['as_q_2']){
                this.as_q_2 = params['as_q_2'];
            }else{
                this.as_q_2 = '';
            }  
            if(params['as_ty_2']){
                this.as_ty_2 = params['as_ty_2'];
            }else{
                this.as_ty_2 = '';
            }  
            if(params['as_op']){
                this.as_op = params['as_op'];
            }else{
                this.as_op = '';
            } 
            if(params['content_type']){
                this.contentTypes = params['content_type'];
            }else{
                this.contentTypes = '';
            }                 



                this.context = params['q'];
                if(params['adv'] != 'undefined'){
                    this.shiftSearch = params['adv'];
                }
                this.tabActive = params['t'];
                this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
                this.setUserData();                  
            });    
       
    }


    // searchShifting(shift){
    //     if(shift == 1){
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }

    /**
     * this is handle which page has the search bar
     * this.router.url.includes('/results') ||
     */
    pageSettings(){
        if(this.router.url == '/' || this.router.url == '/?ln=1' || this.router.url == '/?ln=0'){ 
            return true;
        } else { 
            return false;
        }
    }

    /**
     * this is use to display login icons, when click on the login button
     */
    loginSettings(){
        if(this.router.url == '/login'){ 
            return true;
        } else { 
            return false;
        }        
    }

    /**
     * advanced search settings
     */
    searchSettings(){
        if(this.router.url == '/advanced-search' || this.router.url == '/contact' || this.router.url == '/faq' || this.router.url == '/login' || this.shiftSearch == 1){ 
            return true;
        } else { 
            return false;
        }        
    }   
    
    /**
     * advanced search setup
     */
    setAdvancedSearch(){
        if(this.shiftSearch == 1){ 
            return true;
        } else { 
            return false;
        }        
    }     

    /**
     * check user data availability
     * for display name instead of the login button
     */
    setUserData(){
        if(this.loggedInUserList){
            return true;
        }else{
            return false;
        }
    }

    /**
     * logo show or hide based on following criteria
     */
    logoDisplaySettings(){
        if(this.router.url.includes('/results')){ 
            return true;
        } else { 
            return true;
        }
    }

    homeButtonClick() {
        //  console.log('homeButtonClick');
        this.router.navigate(['home'], { replaceUrl: true });
    }

    voidButtonClick() {
        return false;
    }

    languageMenu() {
      // alert(1);
    }  

    search(form) {
        if(form.keyword){
           if(this.loggedInUserList){
                // if user logged in pass user keywords to backend
                this.userService.socialUserKeywords(this.loggedInUserList.uid, form.keyword).subscribe(success => {});   
            }else{
                if(this.searchTextList){
                    var availabililtyCheck = this.searchTextList.indexOf(form.keyword);
                    if(availabililtyCheck<0){
                        this.searchTextNumber = this.searchTextList.length;
                        this.searchTextList[this.searchTextNumber] = form.keyword; 
                        this.localStorageService.put('searchTextList', JSON.stringify(this.searchTextList,form.keyword));
                    }
                }else{
                    this.searchTextList = [form.keyword];                     
                    this.localStorageService.put('searchTextList', JSON.stringify(this.searchTextList));
                }
            }
            this.router.navigate(['/filter-manager'], { queryParams: { q: form.keyword, t:'all'} });
        }
    }

    signIn(provider){
        this.subscribe = this._auth.login(provider).subscribe(
            (data) => {
                this.localStorageService.put('userData', JSON.stringify(data));
                this.user=data;
                if(this.user){
                     //userService
                     // user login data pass to backend
                    this.userService.socialUserRecords(this.user.uid, this.user.provider, this.user.email)
                        .subscribe(
                            success => {}
                        );                     
                     this.router.navigate(['/'], { queryParams: { ln: 1} });
                }
            }
        )
    }

    logout(){
        //this._auth.logout().subscribe(
        //    (data)=>{
                this.localStorageService.remove('userData');
                this.user=null;
                this.router.navigate(['/'], { queryParams: { ln: 0} });
        //    }
       // )
    }

    ngOnDestroy(){
        this.subscribe.unsubscribe();
    }

    loadExploreMenu(){
        this.menuService.exploreMenuItems()
            .subscribe(
                success => {
                    this.exploreMenuItems = success;
                }
            );          
    }

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
