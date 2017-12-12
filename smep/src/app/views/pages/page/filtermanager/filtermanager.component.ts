import { Component, OnInit  } from '@angular/core';
import { Inject } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {URLSearchParams, Http, Response, Headers} from "@angular/http";

import {BrowserModule} from '@angular/platform-browser'
import {DomSanitizer} from "@angular/platform-browser";

import { LocalStorageStore } from '../../../../services/storage/local-storage.service';

@Component({
    selector: 'filtermanager',
    styleUrls: ['./filtermanager.component.css'],
    templateUrl: './filtermanager.component.html',
})
export class FiltermanagerComponent implements OnInit {

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
    private settings =  {
        'r':'RELEVANCE',
        'n':'NEWEST_FIRST',
        'o':'OLDEST_FIRST'
    };
    settingKeys: Array<string> = ['r','n','o'];
    private contentTypes;     
    private tab;   

    constructor(
        private store: LocalStorageStore, 
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private http:Http,
        private domSanitizer : DomSanitizer,
        
    ) {}



    ngOnInit() {
        this.sub = this.activatedRoute.queryParams.subscribe(params => {
            this.context = params['q'];
            this.tab = params['t'];
            if(params['so']){
                this.sortOrderKey = params['so'];
                this.sortOrder = this.settings[params['so']];
            }else{
                this.sortOrder = this.settings['r'];
                this.sortOrderKey = "r";
            }
            if(params['content_type']){
                this.contentTypes = params['content_type'];
            }else{
                this.contentTypes = null;
                this.router.navigate(['../results'], { queryParams: { q: this.context, t:this.tab} });
            }  
            
            this.router.navigate(['../results'], { queryParams: { q: this.context, t:this.tab, so:this.sortOrderKey, content_type:this.contentTypes} }); 
        });
    }      
}

