import { Component } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { TypeService } from "../../../../../services/businessservices/core/type/type.service";
import { ContentService } from "../../../../../services/businessservices/core/content/content.service";
import { FormGroup } from "@angular/forms";

@Component({
    selector: 'cp-history',
    templateUrl: 'content-provider-history.component.html',
    styleUrls: ['content-provider-history.component.css']
})

export class ContentProviderHistoryComponent implements OnInit{

    public content = new Content();
    public contentForm: FormGroup;

    public typeList = new Array();
    public user_id = 61; //logged user id
    public contentCount: number;
    public type_id: number; //type_id taken from backend
    public index = 0;
    public status_id; //default status id
    public contentHistoryList = new Array();
    public contentHistoryListLength: number;
    public changingTypeId: number;

    public approvedCount: number = 0;
    public rejectedCount: number = 0;
    public pendingCount: number = 0;

    constructor(
        private typeService: TypeService,
        private contentService: ContentService
    ){}

    ngOnInit(): void {
        this.loadTypes();
        this.content.radioValue = 0;
        //this.getContentHistory();
        this.getContentHistory(1);
        this.getContentCount(1)
    }

    /**
     * show types
     */
    public loadTypes(){
        this.typeService.getTypeData().subscribe(
            success => {
                this.typeList = success.success;
            }
        );
    }

    /**
     * increase index using arrow button
     */
    public increaseIndex() {
        if (this.index < this.contentHistoryList.length){
            this.index = this.index + 1;
        }    
    }

    /**
     * increase index using arrow button
     */
    public decreaseIndex() {
        if (this.index >=1) {
            this.index = this.index - 1;
        }
    }

    /**
     * get content counts
     */
    public getContentCount(type_id){
        this.contentService.getContentCount(
            this.user_id,
            type_id
        ).subscribe(
            success => {
                this.contentCount = success.success;
                this.type_id = success.type_id;
            }
        );
    }

    public approved(){
        this.contentService.getContentHistory(
            this.user_id,
            this.changingTypeId,
            this.status_id = 1
        ).subscribe(
            success => {
                this.contentHistoryList = success.success;
                this.contentHistoryListLength = this.contentHistoryList.length;
            }
        );

        this.contentService.getContentAllCount(
            this.user_id,
            this.changingTypeId,
            this.status_id = 1   
        ).subscribe(
            success => {
                this.approvedCount = success.success;
            }
        );
    }

    public all() {
        this.getContentHistory(this.changingTypeId);
    }

    public rejected(){
        this.contentService.getContentHistory(
            this.user_id,
            this.changingTypeId,
            this.status_id = 2
        ).subscribe(
            success => {
                this.contentHistoryList = success.success;
                this.contentHistoryListLength = this.contentHistoryList.length;
            }
        );

        this.contentService.getContentAllCount(
            this.user_id,
            this.changingTypeId,
            this.status_id = 2
        ).subscribe(
            success => {
                this.rejectedCount = success.success;
            }
            );
    }

    public pending(){
        this.contentService.getContentHistory(
            this.user_id,
            this.changingTypeId,
            this.status_id = 0
        ).subscribe(
            success => {
                this.contentHistoryList = success.success;
                this.contentHistoryListLength = this.contentHistoryList.length;
            }
        );

        this.contentService.getContentAllCount(
            this.user_id,
            this.changingTypeId,
            this.status_id = 0
        ).subscribe(
            success => {
                this.pendingCount = success.success;
            }
            );
    }

    /**
     * get content history
     */
    public getContentHistory(type_id1){
            this.index = 0;
            this.approvedCount = 0;
            this.rejectedCount = 0;
            this.pendingCount = 0;
            this.contentService.getContentAllHistory(
                this.user_id,
                type_id1
            ).subscribe(
                success => {
                    this.contentHistoryList = success.success;
                    this.contentHistoryListLength = this.contentHistoryList.length;
                    this.content.radioValue = 0;
                    this.changingTypeId = type_id1;
                }
            );

        // this.contentService.getContentAllCount(
        //     this.user_id,
        //     this.changingTypeId,
        //     this.status_id = 1
        // ).subscribe(
        //     success => {
        //         this.approvedCount = 0;
        //         this.approvedCount = success.success;
        //     }
        //     );

        // this.contentService.getContentAllCount(
        //     this.user_id,
        //     this.changingTypeId,
        //     this.status_id = 2
        // ).subscribe(
        //     success => {
        //         this.rejectedCount = 0;
        //         this.rejectedCount = success.success;
        //     }
        //     );

        // this.contentService.getContentAllCount(
        //     this.user_id,
        //     this.changingTypeId,
        //     this.status_id = 0
        // ).subscribe(
        //     success => {
        //         this.pendingCount = 0;
        //         this.pendingCount = success.success;
        //     }
        //     );
    }
  
}

export class Content{
    public radioValue;
}