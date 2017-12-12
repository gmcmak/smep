import { Component, EventEmitter } from '@angular/core';

import { ToastService } from '../../../../services/toast/toast.service';
import { CustomToastOptions } from '../../../../services/toast/toast.model';

import { LocalStorageStore } from '../../../../services/storage/local-storage.service';

import { DataTableRow, DataTableRequest, DataTableConfiguration, DataTableResponse } from '../../../../views/widgets/widget/data-table/data-table.component';

import { UploadOutput, UploadInput, UploadFile, humanizeBytes } from 'ngx-uploader';

@Component({

    selector: 'about',
    styleUrls: ['./about.component.css'],
    templateUrl: './about.component.html',

})
export class AboutComponent {
    private customToastOptions: CustomToastOptions = new CustomToastOptions("", "");

    private dataTableRow: DataTableRow = null;
    private dataTableRequest: DataTableRequest = null;

    public data: DataTableResponse = null;
    public config: DataTableConfiguration = null;

    public files: UploadFile[];
    public uploadInput: EventEmitter<UploadInput>;
    public humanizeBytes: Function;
    public dragOver: boolean;

    constructor(private toastService: ToastService, private localStorageStore: LocalStorageStore) {
        this.files = []; // local uploading files array
        this.uploadInput = new EventEmitter<UploadInput>(); // input events, we use this to emit data to ngx-uploader
        this.humanizeBytes = humanizeBytes;
    }

    public sampleToast() {
        this.customToastOptions.msg = "Testing Toast";
        this.customToastOptions.title = "Testing Toast Title";
        this.toastService.newToast(this.customToastOptions);
    }

    public clearToast() {
        this.toastService.clearToasties();
    }

    ngOnInit() {
        this.config = new DataTableConfiguration();
        this.data = new DataTableResponse();
    }


    public onContextMenuRequired(dataTableRow: DataTableRow) {
        console.log('contextMenuRequired');
        this.dataTableRow = dataTableRow;
    }

    public onRowRendered(dataTableRow: DataTableRow) {
        console.log('rowRendered');
        this.dataTableRow = dataTableRow;
    }

    public onDataRequired(dataTableRequest: DataTableRequest) {
        console.log('onDataRequired ');
        this.dataTableRequest = dataTableRequest;
    }

    ngOnDestroy() {

    }


    public onUploadOutput(output: UploadOutput): void {
        console.log(output); // lets output to see what's going on in the console

        if (output.type === 'allAddedToQueue') { // when all files added in queue
            // uncomment this if you want to auto upload files when added
            // const event: UploadInput = {
            //   type: 'uploadAll',
            //   url: '/upload',
            //   method: 'POST',
            //   data: { foo: 'bar' },
            //   concurrency: 0
            // };
            // this.uploadInput.emit(event);
        } else if (output.type === 'addedToQueue') {
            this.files.push(output.file); // add file to array when added
        } else if (output.type === 'uploading') {
            // update current data in files array for uploading file
            const index = this.files.findIndex(file => file.id === output.file.id);
            this.files[index] = output.file;
        } else if (output.type === 'removed') {
            // remove file from array when removed
            this.files = this.files.filter((file: UploadFile) => file !== output.file);
        } else if (output.type === 'dragOver') { // drag over event
            this.dragOver = true;
        } else if (output.type === 'dragOut') { // drag out event
            this.dragOver = false;
        } else if (output.type === 'drop') { // on drop event
            this.dragOver = false;
        }
    }

    public startUpload(): void {  // manually start uploading
        const event: UploadInput = {
            type: 'uploadAll',
            url: '/upload',
            method: 'POST',
            data: { foo: 'bar' },
            concurrency: 1 // set sequential uploading of files with concurrency 1
        }

        this.uploadInput.emit(event);
    }

    public cancelUpload(id: string): void {
        this.uploadInput.emit({ type: 'cancel', id: id });
    }


}
