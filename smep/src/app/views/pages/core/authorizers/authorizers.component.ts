import { Component, OnInit  } from '@angular/core';
import { Inject } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {URLSearchParams, Http, Response, Headers} from "@angular/http";

import {BrowserModule} from '@angular/platform-browser'
import {DomSanitizer} from "@angular/platform-browser";

import { LocalStorageStore } from '../../../../services/storage/local-storage.service';

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'authorizers',
    styleUrls: ['./authorizers.component.css'],
    templateUrl: './authorizers.component.html',
})
export class  AuthorizersComponent implements OnInit {


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

