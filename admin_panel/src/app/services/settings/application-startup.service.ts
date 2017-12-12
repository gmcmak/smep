import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

import { GlobalVariable } from '../../common/constants/global';

@Injectable()
export class StartupService {

    private _startupData: any;

    private baseApiUrl = GlobalVariable.BASE_REST_API_URL;

    constructor(private http: Http) { }

    // This is the method you want to call at bootstrap
    // Important: It should return a Promise
    load(): Promise<any> {

        this._startupData = null;

        return this.http
            .get(this.baseApiUrl + "configlist")
            .map((res: Response) => res.json())
            .toPromise()
            .then((data: any) => this._startupData = data)
            .catch((err: any) => Promise.resolve());
    }

    get startupData(): any {
        return this._startupData;
    }

}