import { Injectable } from '@angular/core';

import { ToastyService, ToastyConfig, ToastOptions, ToastData } from 'ng2-toasty';

import { Subject, Observable, Subscription } from 'rxjs/Rx';

import { ToastCommunicationService } from './toast-communication.service';

import { CustomToastOptions, ToastThemeType, ToastType, ToastPositions } from './toast.model';


@Injectable()
export class ToastService {

    constructor(private toastyService: ToastyService, private toastCommunicationService: ToastCommunicationService) { }

    position: string = ToastPositions[ToastPositions['top-right']];

    newSimpleToast(title: string, message: string, type: ToastType) {

        let toastOptions: ToastOptions = {
            title: title,
            msg: message,
            showClose: true,
            timeout: 5000,
            theme: ToastThemeType[ToastThemeType.material],
            // position: this.options.position,
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };

        switch (ToastType[type]) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }


    newToast(customToastOptions: CustomToastOptions) {

        let toastOptions: ToastOptions = {
            title: customToastOptions.title,
            msg: customToastOptions.msg,
            showClose: customToastOptions.showClose,
            timeout: customToastOptions.timeout,
            theme: ToastThemeType[customToastOptions.theme],
            // position: this.options.position,
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
            },
            onRemove: function(toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
            }
        };

        switch (ToastType[customToastOptions.type]) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }

    newCountdownToast(customToastOptions: CustomToastOptions) {
        let interval = 1000;
        let seconds = customToastOptions.timeout / 1000;
        let subscription: Subscription;

        let toastOptions: ToastOptions = {
            title: customToastOptions.title + (seconds || 0),
            msg: customToastOptions.msg,
            showClose: customToastOptions.showClose,
            timeout: customToastOptions.timeout,
            theme: ToastThemeType[customToastOptions.theme],
            onAdd: (toast: ToastData) => {
                console.log('Toast ' + toast.id + ' has been added!');
                // Run the timer with 1 second iterval
                let observable = Observable.interval(interval).take(seconds);
                // Start listen seconds bit
                subscription = observable.subscribe((count: number) => {
                    // Update title
                    toast.title = customToastOptions.title + (seconds || 0);
                });

            },
            onRemove: function(toast: ToastData) {
                console.log('Toast ' + toast.id + ' has been removed!');
                // Stop listenning
                subscription.unsubscribe();
            }
        };

        switch (ToastType[customToastOptions.type]) {
            case 'default': this.toastyService.default(toastOptions); break;
            case 'info': this.toastyService.info(toastOptions); break;
            case 'success': this.toastyService.success(toastOptions); break;
            case 'wait': this.toastyService.wait(toastOptions); break;
            case 'error': this.toastyService.error(toastOptions); break;
            case 'warning': this.toastyService.warning(toastOptions); break;
        }
    }

    clearToasties() {
        this.toastyService.clearAll();
    }

    changePosition($event: any) {
        this.position = $event;
        // Update position of the Toasty Component
        this.toastCommunicationService.setPosition(this.position);
    }


}