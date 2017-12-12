import { Injectable, Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';

import { LocalStorageStore } from '../../../../services/storage/local-storage.service';


/**
 * Source framework -  https://github.com/swimlane/ngx-datatable * 
 * @export
 * @class DataTableComponent
 */
@Injectable()

@Component({
    selector: 'data-table',
    templateUrl: './data-table.component.html',
    styleUrls: ['./data-table.component.css']
})
export class DataTableComponent {

    @ViewChild('tableComponent') table: any;

    @Input() public state: DataTableState = null;
    @Input() public data?: DataTableResponse = null;
    @Input() public config: DataTableConfiguration = null;
    @Input() public childTest: string = " DataTable Component ";

    @Output() dataRequired: EventEmitter<DataTableRequest> = new EventEmitter<DataTableRequest>();
    @Output() rowRendered: EventEmitter<DataTableRow> = new EventEmitter<DataTableRow>();
    @Output() contextMenuRequired: EventEmitter<DataTableRow> = new EventEmitter<DataTableRow>();

    constructor(private store: LocalStorageStore) {

    }


    ngOnInit() {
        console.log('ngOnInit ');
        this.attemptLoadState();
        if (this.state == null) {
            this.state = new DataTableState();
            this.setConfiguration(this.config);
            this.setData(this.data);
            this.attemptSaveState();
        } else {
            this.pushConfigToChild(this.config);
            this.pushDataToChild(this.data);
        }
        console.log('this.state '  +this.state);
        if (this.state != null) {
            this.raiseDataRequired();
        }
    }

    private attemptSaveState() {
        if ((this.state != null) && (this.state.config != null) && (this.state.config.mustManageState)) {
            try {
                this.saveState();
            } catch (error) {
                //sink exception
            }
        }
    }

    private attemptLoadState() {
        if ((this.state != null) && (this.state.config != null) && (this.state.config.mustManageState)) {
            try {
                this.loadState();
            } catch (error) {
                //sink exception
            }
        }
    }

    private attemptClearState() {
        if ((this.state != null) && (this.state.config != null) && (this.state.config.mustManageState)) {
            try {
                this.clearState();
            } catch (error) {
                //sink exception
            }
        }
    }

    private saveState(): void {
        //save to local storage
        let stateKey: string = this.getStateKey();
        this.store.put(stateKey, this.state);
    }

    private loadState(): void {
        //load from local storage
        let stateKey: string = this.getStateKey();
        this.state = this.store.get<DataTableState>(stateKey);
    }

    public clearState(): void {
        //clear state from local storage
        let stateKey: string = this.getStateKey();
        this.store.remove(stateKey);
    }

    private setConfiguration(config: DataTableConfiguration): void {
        if (config != null) {
            this.state.config = config;
            this.pushConfigToChild(config);
        }
    }

    public onSearch(): void {
        this.raiseDataRequired();
    }

    public onPage(data: any): void {
        this.raiseDataRequired();
    }

    public onSort(data: any): void {
        this.raiseDataRequired();
    }

    protected raiseDataRequired(): void {
        this.state.echo++;
        console.log('raiseDataRequired ');
        console.log('this.state.echo' + this.state.echo);
        let request: DataTableRequest = new DataTableRequest(this.state.echo);
        this.dataRequired.emit(request);
    }

    protected raiseRowRendered(): void {
        let row: DataTableRow = null;
        this.rowRendered.emit(row);
    }

    protected raiseContextMenuRequired(): void {
        if (this.state.config.mustShowContextMenu) {
            let row: DataTableRow = null;
            this.contextMenuRequired.emit(row);
        }
    }

    public setData(data: DataTableResponse): void {
        if (data != null) {
            if (data.echo == this.state.echo) {
                this.state.dataContainer = data;
                try {
                    this.pushDataToChild(data);
                } finally {
                    this.attemptSaveState();
                }
            }
        }
    }

    private pushConfigToChild(config: DataTableConfiguration): void {
        //set config to ngx datatable
    }

    private pushDataToChild(data: DataTableResponse): void {
        //set dataContainer.rows to ngx datatable
    }

    private refreshChild(): void {
        //invoke redraw on ngx datatable if required
    }

    public show(): void {
        this.state.isVisible = true;
        this.attemptSaveState();
    }

    public hide(): void {
        this.state.isVisible = false;
        this.attemptSaveState();
    }

    private getStateKey(): string {
        let stateKey: string = document.URL;

        if ((this.state.config.stateKeyClassifier != null) &&
            (this.state.config.stateKeyClassifier.length > 0)) {
            stateKey += this.state.config.stateKeyClassifier;
        }

        return encodeURI(stateKey);
    }

}

export class DataTableRequest {

    constructor(private echo: number) {

    }

}

export class DataTableResponse {
    public echo: number = 1;
    public page: Page = new Page();
    public rows: Array<any> = null;

}

export class DataTableConfiguration {
    public columns: any[] = [];
    public mustManageState: boolean = false;
    public mustShowContextMenu: boolean = false;
    public stateKeyClassifier: string = "";
    public columnMode: ColumnMode = ColumnMode.flex;
    public headerHeight: number = 30;
    public footerHeight: number = 10;
    public rowHeight: number = 15;
    public externalSorting: boolean = true;
    public externalPaging: boolean = true;
    public loadingIndicator: boolean = true;
    public reorderable: boolean = true;
}

export class DataTableRow {
    public element: HTMLTableRowElement;
}

export enum ColumnMode {
    flex,
    standard,
    force
}

class DataTableState {
    public echo: number = 0;
    public dataContainer: DataTableResponse = null;
    public config: DataTableConfiguration = null;
    public isVisible: boolean = true;
}

/**
 * An object used to get page information from the server
 */
export class Page {
    //The number of elements in the page
    size: number = 0;
    //The total number of elements
    totalElements: number = 0;
    //The total number of pages
    totalPages: number = 0;
    //The current page number
    pageNumber: number = 0;
}

