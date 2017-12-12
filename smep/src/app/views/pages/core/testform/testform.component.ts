import { Component } from '@angular/core';

import { ToastService } from '../../../../services/toast/toast.service';
import { CustomToastOptions } from '../../../../services/toast/toast.model';


// import fade in animation

@Component({

    selector: 'testform',
    styleUrls: ['./testform.component.css'],
    templateUrl: './testform.component.html',
})
export class TestFormComponent {
    private customToastOptions: CustomToastOptions = new CustomToastOptions("", "");

    constructor(private toastService: ToastService) {
    }

}

