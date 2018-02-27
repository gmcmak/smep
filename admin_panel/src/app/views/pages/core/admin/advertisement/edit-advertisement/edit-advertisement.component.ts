import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { CategoryService } from "../../../../../../services/businessservices/core/settings/category.service";
import { ExploreService } from "../../../../../../services/businessservices/core/settings/explore.service";
import { KeywordService } from "../../../../../../services/businessservices/core/settings/keyword.service";
import { ActivatedRoute } from "@angular/router";
import { TypeService } from "../../../../../../services/businessservices/core/type/type.service";
import { AdvertisementService } from "../../../../../../services/businessservices/core/advertisement/advertisement.service";

const URL_REGEX = ('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}');

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'edit-advertisement',
    templateUrl: 'edit-advertisement.component.html',
    styleUrls: ['edit-advertisement.component.css']
})

export class EditAdvertisementComponent implements OnInit{

    public advertisement = new Advertisement();
    public advertisementData;
    public index = 0;
    //public contentArrayLength = 0;

    public advertisementForm: FormGroup;
    public categoryList;
    public exploreList;
    public keywordList;
    public typeList;

    public keywordItemList = new Array();
    selectedKeyword1 = [];
    keyword_setting = {};

    public CategoryItemList = new Array();
    selectedCategory1 = [];
    category_setting = {};

    public ExploreItemList = new Array();
    selectedExplore1 = [];
    explore_setting = {};

    public sub;
    public id: number;
    public status = 1;
    public updateAdvertisementStatus;
    public error = 0;

    public exploreArray = new Array();
    public keywordArray = new Array();
    public categoryArray = new Array();

    public videoUrl: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private exploreService: ExploreService,
        private keywordService: KeywordService,
        private route: ActivatedRoute,
        private typeService: TypeService,
        private advertisementService: AdvertisementService
    ) { }

    ngOnInit(): void {

        /**
        * get param id value from the router
        */
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });

        this.getAdvertisementsData(this.index);
        this.getCategories();
        this.getExplores();
        this.getKeywords();
        this.getTypes();
        this.initializeAdvertisementForm();

        //for keyword drop down
        this.keyword_setting = {
            text: "Select Keyword",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            singleSelection: false,
            enableSearchFilter: true,
            badgeShowLimit: 3, //show only three selected
            // classes: "myclass custom-class"
        };

        //for category drop down
        this.category_setting = {
            text: "Select Category",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            badgeShowLimit: 3,
            stopScrollPropagation: false,
            // classes: "myclass custom-class"
        };

        //for explore drop down
        this.explore_setting = {
            text: "Select Explore",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            enableSearchFilter: true,
            badgeShowLimit: 3
            // classes: "myclass custom-class"
        };
    }

    //keyword drop down list functions
    onItemSelect1(item: any) {
        for (let i = 0; i < item.length; i++) {
            this.advertisement.selectedKeyword[i] = new Array();
            this.advertisement.selectedKeyword[i]['id'] = item[i].id;
            this.advertisement.selectedKeyword[i]['itemName'] = item[i].itemName;
        }
        return this.advertisement.selectedKeyword;
    }
    onItemDeSelect1(item: any) {
        for (let i = 0; i < item.length; i++) {
            this.advertisement.selectedKeyword[i] = new Array();
            this.advertisement.selectedKeyword[i]['id'] = item[i].id;
            this.advertisement.selectedKeyword[i]['itemName'] = item[i].itemName;
        }
        return this.advertisement.selectedKeyword;
    }
    onSelectAll1(items: any) {
        for (let i = 0; i < this.keywordItemList.length; i++) {
            this.advertisement.selectedKeyword[i] = new Array();
            this.advertisement.selectedKeyword[i]['id'] = this.keywordItemList[i].id;
            this.advertisement.selectedKeyword[i]['itemName'] = this.keywordItemList[i].itemName;
        }
        return this.advertisement.selectedKeyword;
    }
    onDeSelectAll1(items: any) {
        this.advertisement.selectedKeyword = [];
        return this.advertisement.selectedKeyword;
    }

    //category drop down list functions
    onItemSelect2(item: any) {
        for (let i = 0; i < item.length; i++) {
            this.advertisement.selectedCategory[i] = new Array();
            this.advertisement.selectedCategory[i]['id'] = item[i].id;
            this.advertisement.selectedCategory[i]['itemName'] = item[i].itemName;
        }
        return this.advertisement.selectedCategory;
    }
    onItemDeSelect2(item: any) {
        for (let i = 0; i < item.length; i++) {
            this.advertisement.selectedCategory[i] = new Array();
            this.advertisement.selectedCategory[i]['id'] = item[i].id;
            this.advertisement.selectedCategory[i]['itemName'] = item[i].itemName;
        }
        return this.advertisement.selectedCategory;
    }
    onSelectAll2(items: any) {
        for (let i = 0; i < this.CategoryItemList.length; i++) {
            this.advertisement.selectedCategory[i] = new Array();
            this.advertisement.selectedCategory[i]['id'] = this.CategoryItemList[i].id;
            this.advertisement.selectedCategory[i]['itemName'] = this.CategoryItemList[i].itemName;
        }
        return this.advertisement.selectedCategory;
    }
    onDeSelectAll2(items: any) {
        this.advertisement.selectedCategory = [];
        return this.advertisement.selectedCategory;
    }

    //explore drop down list functions
    onItemSelect3(item: any) {
        for (let i = 0; i < item.length; i++) {
            this.advertisement.selectedExplore[i] = new Array();
            this.advertisement.selectedExplore[i]['id'] = item[i].id;
            this.advertisement.selectedExplore[i]['itemName'] = item[i].itemName;
        }
        return this.advertisement.selectedExplore;
    }
    onItemDeSelect3(item: any) {
        for (let i = 0; i < item.length; i++) {
            this.advertisement.selectedExplore[i] = new Array();
            this.advertisement.selectedExplore[i]['id'] = item[i].id;
            this.advertisement.selectedExplore[i]['itemName'] = item[i].itemName;
        }
        return this.advertisement.selectedExplore;
    }
    onSelectAll3(items: any) {
        for (let i = 0; i < this.ExploreItemList.length; i++) {
            this.advertisement.selectedExplore[i] = new Array();
            this.advertisement.selectedExplore[i]['id'] = this.ExploreItemList[i].id;
            this.advertisement.selectedExplore[i]['itemName'] = this.ExploreItemList[i].itemName;
        }
        return this.advertisement.selectedExplore;
    }
    onDeSelectAll3(items: any) {
        this.advertisement.selectedExplore = [];
        return this.advertisement.selectedExplore;
    }

    private initializeAdvertisementForm(): void {
        this.advertisementForm = this.formBuilder.group({
            'sub_url': ['', [Validators.required, Validators.pattern(URL_REGEX)]],
            'sub_type': ['', [Validators.required]],
            'sub_title': ['', [Validators.required]],
            'sub_video_url': [null, [Validators.pattern(URL_REGEX)]],
            'sub_keywords': new FormGroup({
                'sub_keyword': new FormControl([], Validators.required),
                'sub_free': new FormControl('')
            }),
            'sub_categories': new FormGroup({
                'sub_category': new FormControl([], Validators.required)
            }),
            'sub_explores': new FormGroup({
                'sub_explore': new FormControl([], Validators.required)
            }),
            'sub_description': [null]
        });
    }

    public isFieldValid(field: string) {
        return !this.advertisementForm.get(field).valid && this.advertisementForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }

    /**
     * hide success alert
     */
    hideAlert() {
        $('#success_alert').show();
        setTimeout(function () {
            $('#success_alert').slideUp("slow");
        }, 2000);
    }

    /**
     * change alert class
     */
    public changeAlertClass() {
        return {
            'alert-success': this.error === 0,
            'alert-danger': this.error != 0
        }
    }

    /**
     * get categories
     */
    public getCategories() {
        this.categoryService.getCategoriesList().subscribe(
            success => {
                this.categoryList = success.success;
                for (let i = 0; i < this.categoryList.length; i++) {
                    this.CategoryItemList[i] = new Array();
                    this.CategoryItemList[i]['id'] = this.categoryList[i].id;
                    this.CategoryItemList[i]['itemName'] = this.categoryList[i].en_name;
                }
            }

        );
    }

    /**
     * get explore details
     */
    public getExplores() {
        this.exploreService.getExploresList().subscribe(
            success => {
                this.exploreList = success.success;
                for (let i = 0; i < this.exploreList.length; i++) {
                    this.ExploreItemList[i] = new Array();
                    this.ExploreItemList[i]['id'] = this.exploreList[i].id;
                    this.ExploreItemList[i]['itemName'] = this.exploreList[i].en_tag;
                }
            }
        );
    }

    /**
     * get keyword details
     */
    public getKeywords() {
        this.keywordService.getKeywordList().subscribe(
            success => {
                this.keywordList = success.success;
                for (let i = 0; i < this.keywordList.length; i++) {
                    this.keywordItemList[i] = new Array();
                    this.keywordItemList[i]['id'] = this.keywordList[i].id;
                    this.keywordItemList[i]['itemName'] = this.keywordList[i].en_name;
                }
            }
        );
    }

    /**
     * get type details
     */
    public getTypes() {
        this.typeService.getTypeData().subscribe(
            success => {
                this.typeList = success.success;
                console.log(this.typeList);
            }
        );
    }

    /**
     * get content data
     */
    public getAdvertisementsData(x) {
        this.advertisementService.editAdvertisementData(
            this.id
        ).subscribe(
            success => {
                this.advertisementData = success.success;
                this.advertisement.sub_url1 = this.advertisementData[x].url;
                this.advertisement.sub_description1 = this.advertisementData[x].description;
                this.advertisement.sub_title1 = this.advertisementData[x].title;
                this.advertisement.sub_video_url1 = this.advertisementData[x].video_url;
                this.advertisement.sub_type1 = this.advertisementData[x].type_id;
                this.advertisement.sub_free1 = this.advertisementData[x].freeform_keyword;

                if (this.advertisementData[x].keyword.length > 0) {
                    this.advertisement.selectedKeyword = new Array();
                    for (let i = 0; i < this.advertisementData[x].keyword.length; i++) {
                        this.advertisement.selectedKeyword[i] = {};
                        this.advertisement.selectedKeyword[i].id = this.advertisementData[x].keyword[i].id;
                        this.advertisement.selectedKeyword[i].itemName = this.advertisementData[x].keyword[i].en_name;
                    }
                }

                if (this.advertisementData[x].category.length > 0) {
                    this.advertisement.selectedCategory = new Array();
                    for (let i = 0; i < this.advertisementData[x].category.length; i++) {
                        this.advertisement.selectedCategory[i] = {};
                        this.advertisement.selectedCategory[i]['id'] = this.advertisementData[x].category[i].id;
                        this.advertisement.selectedCategory[i]['itemName'] = this.advertisementData[x].category[i].en_name;
                    }
                }

                if (this.advertisementData[x].explore.length > 0) {
                    this.advertisement.selectedExplore = new Array();
                    for (let i = 0; i < this.advertisementData[x].explore.length; i++) {
                        this.advertisement.selectedExplore[i] = {};
                        this.advertisement.selectedExplore[i]['id'] = this.advertisementData[x].explore[i].id;
                        this.advertisement.selectedExplore[i]['itemName'] = this.advertisementData[x].explore[i].en_tag;
                    }
                }

                if (this.advertisement.sub_type1 == 3){
                    this.videoUrl = true;
                }
                else{
                    this.videoUrl = false;
                }
            }
        );
    }

    /**
     * update advertisement details
     * @param formData 
     */
    public updateAdvertisement() {

        this.exploreArray = [];
        this.categoryArray = [];
        this.keywordArray = [];

        for (let i = 0; i < this.advertisement.selectedExplore.length; i++) {

            this.exploreArray.push(this.advertisement.selectedExplore[i].id);
            //this.exploreArray[i] = this.advertisement.selectedExplore[i].id;
        }

        for (let i = 0; i < this.advertisement.selectedKeyword.length; i++) {

            this.keywordArray.push(this.advertisement.selectedKeyword[i].id);
        }

        for (let i = 0; i < this.advertisement.selectedCategory.length; i++) {

            this.categoryArray.push(this.advertisement.selectedCategory[i].id);
        }


        this.advertisementService.updateAdvertisement(
            this.id,
            this.advertisement.sub_title1,
            this.advertisement.sub_description1,
            this.advertisement.sub_url1,
            this.advertisement.sub_video_url1,
            this.advertisement.sub_free1,
            this.status,
            this.advertisement.sub_type1,
            this.keywordArray,
            this.categoryArray,
            this.exploreArray
        ).subscribe(
            success => {
                this.updateAdvertisementStatus = success.success;
                this.error = success.error;
                this.hideAlert();
                this.advertisementForm.reset();

            }
        );
    }

    /**
    * show and hide video url input box
    */
    public showVideoUrl(index) {
        if (index == 3) {
            this.videoUrl = true;
        }
        else {
            this.videoUrl = false;
            this.advertisement.sub_video_url1 = "";
        }
    }
}

export class Advertisement {
    public sub_url1: string;
    public sub_type1: number;
    public sub_title1: string;
    public sub_video_url1: string;
    public selectedKeyword = new Array();
    public sub_free1: string;
    public selectedCategory = new Array();
    public selectedExplore = new Array();
    public selectedAuthor = new Array();
    public sub_description1: string;
}