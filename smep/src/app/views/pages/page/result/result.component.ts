import { Component, OnInit  } from '@angular/core';
import { Inject } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {URLSearchParams, Http, Response, Headers} from "@angular/http";

import {BrowserModule} from '@angular/platform-browser'
import {DomSanitizer} from "@angular/platform-browser";

import { LocalStorageStore } from '../../../../services/storage/local-storage.service';

@Component({
    selector: 'result',
    styleUrls: ['./result.component.css'],
    templateUrl: './result.component.html',
})
export class ResultComponent implements OnInit {

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

    constructor(
        private store: LocalStorageStore, 
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private http:Http,
        private domSanitizer : DomSanitizer,
        
    ) {}



    ngOnInit() {


    }      
}

