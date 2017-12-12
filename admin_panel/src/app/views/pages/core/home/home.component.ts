import { Component } from '@angular/core';
import { Inject } from '@angular/core';

import { LocalStorageStore } from '../../../../services/storage/local-storage.service';

@Component({
    selector: 'home',
    styleUrls: ['./home.component.css'],
    templateUrl: './home.component.html',
})
export class HomeComponent {


    public single: any[] = [
        {
            "name": "Germany",
            "value": 8940000
        },
        {
            "name": "USA",
            "value": 5000000
        },
        {
            "name": "France",
            "value": 7200000
        }
    ];;
    public multi: any[];
    public view: any[] = [700, 400];

    // options
    public showXAxis = true;
    public showYAxis = true;
    public gradient = false;
    public showLegend = true;
    public showXAxisLabel = true;
    public xAxisLabel = 'Country';
    public showYAxisLabel = true;
    public yAxisLabel = 'Population';

    public colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    public param = { value: 'world' };
    public storedValue: any;

    public testStore(storedVal: string) {
        this.store.put("my_first_val", storedVal)
    }

    public testRetrieve(storedKey: string) {
        this.storedValue = this.store.get(storedKey)
    }

    /* FOR CHARTS*/
    constructor(private store: LocalStorageStore) {
    }



    public onSelect(event: any) {
        console.log(event);
    }


}

