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
    public changingTypeId: number; //change type id selecting all, video and image

    public approvedCount: number = 0;
    public rejectedCount: number = 0;
    public pendingCount: number = 0;

    public pending_id: boolean = false; //show and hide submbit button on pending page

    constructor(
        private typeService: TypeService,
        private contentService: ContentService
    ){}

    ngOnInit(): void {
        this.loadTypes();
        this.content.radioValue = 0;
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

    /**
     * get approved content details
     */
    public approved(){
        this.pending_id = false;
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
    }

    /**
     * get all content details
     */
    public all() {
        this.pending_id = false;
        this.getContentHistory(this.changingTypeId);
    }

    /**
     * get rejected content details
     */
    public rejected(){
        this.pending_id = false;
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
    }

    /**
     * get pending content details
     */
    public pending(){
        this.pending_id = true;
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
    }

    /**
     * get content history
     */
    public getContentHistory(type_id1){
            this.index = 0;
            this.pending_id = false;
            this.contentService.getContentAllHistory(
                this.user_id,
                type_id1
            ).subscribe(
                success => {
                    this.contentHistoryList = success.success;
                    this.contentHistoryListLength = this.contentHistoryList.length;
                    this.content.radioValue = 0;
                    this.changingTypeId = type_id1;
                    this.getApprovedCount();
                    this.getRejectedCount();
                    this.getPendingCount();
                }
            ); 
    }

    /**
     * get approved content count
     */
    public getApprovedCount(){
        this.contentService.getContentAllCount(
            this.user_id,
            this.changingTypeId,
            this.status_id = 1
        ).subscribe(
            success => {
                this.approvedCount = 0;
                this.approvedCount = success.success;
                //console.log('approved count = ' + this.approvedCount);
            }
        );
    }

    /**
     * get rejected content count
     */
    public getRejectedCount(){
        this.contentService.getContentAllCount(
            this.user_id,
            this.changingTypeId,
            this.status_id = 2
        ).subscribe(
            success => {
                this.rejectedCount = 0;
                this.rejectedCount = success.success;
                //console.log('rejected count = ' + this.rejectedCount);
            }
        );
    }

    /**
     * get pending content count
     */
    public getPendingCount(){
        this.contentService.getContentAllCount(
            this.user_id,
            this.changingTypeId,
            this.status_id = 0
        ).subscribe(
            success => {
                this.pendingCount = 0;
                this.pendingCount = success.success;
                //console.log('pending count = ' + this.pendingCount);
            }
        );
    }

    public show(id, submission_id){
        console.log('id = '+id);
        console.log('sub id = '+submission_id);
    }
  
}

export class Content{
    public radioValue;
}