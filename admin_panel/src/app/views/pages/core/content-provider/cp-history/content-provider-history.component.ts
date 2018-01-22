import { Component } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { TypeService } from "../../../../../services/businessservices/core/type/type.service";
import { ContentService } from "../../../../../services/businessservices/core/content/content.service";

@Component({
    selector: 'cp-history',
    templateUrl: 'content-provider-history.component.html',
    styleUrls: ['content-provider-history.component.css']
})

export class ContentProviderHistoryComponent implements OnInit{

    public typeList = new Array();
    public user_id = 61; //logged user id
    public contentCount: number;
    public type_id: number; //type_id taken from backend
    public index = 0;

    constructor(
        private typeService: TypeService,
        private contentService: ContentService
    ){}

    ngOnInit(): void {
        this.loadTypes();
    }

    /**
     * show types
     */
    public loadTypes(){
        this.typeService.getTypeData().subscribe(
            success => {
                this.typeList = success.success
            }
        );
    }

    /**
     * increase index using arrow button
     */
    public increaseIndex() {
        
            this.index = this.index + 1;
        
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
    
}