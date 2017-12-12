import { Component, Output } from '@angular/core';
import { Inject } from '@angular/core';
import {Router} from "@angular/router";


import { CommonService } from '../../../../services/settings/common.service';
import { LocalStorageStore } from '../../../../services/storage/local-storage.service';

@Component({
    selector: 'home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html',
})
export class HomeComponent {
    keyword: string;
    constructor(
            private store: LocalStorageStore, 
            private router: Router, 
            private common: CommonService,
        ) {}

}



