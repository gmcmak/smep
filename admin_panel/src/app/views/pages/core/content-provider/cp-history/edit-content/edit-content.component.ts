import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { CategoryService } from "../../../../../../services/businessservices/core/settings/category.service";
import { ExploreService } from "../../../../../../services/businessservices/core/settings/explore.service";
import { KeywordService } from "../../../../../../services/businessservices/core/settings/keyword.service";
import { ActivatedRoute } from "@angular/router";
import { ContentService } from "../../../../../../services/businessservices/core/content/content.service";
import { TypeService } from "../../../../../../services/businessservices/core/type/type.service";
import { AuthorService } from "../../../../../../services/businessservices/core/settings/author.service";

const URL_REGEX = ('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}');

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'edit-content',
    templateUrl: 'edit-content.component.html',
    styleUrls: ['edit-content.component.css']
})

export class EditContentComponent implements OnInit{

    public singleSubmission = new SingleSubmission();
    public index = 0; //content submission form page index
    public contentArrayLength = 0;

    public singleSubForm: FormGroup;
    public categoryList;
    public exploreList;
    public keywordList;
    public authorList;
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

    public AuthorItemList = new Array();
    selectedAuthor1 = [];
    author_setting = {};

    public submission_id;
    public id;
    public sub;
    //public submission_level;

    public contentDetails;
    public content_id;
    public status = 0;
    public updateContentStatus;
    public error = 0;

    public exploreArray = new Array();
    public keywordArray = new Array();
    public categoryArray = new Array();
    public authorArray = new Array();

    constructor(
        private formBuilder: FormBuilder,
        private categoryService: CategoryService,
        private exploreService: ExploreService,
        private keywordService: KeywordService,
        private route: ActivatedRoute,
        private contentService: ContentService,
        private typeService: TypeService,
        private authorService: AuthorService
    ){}
    
    ngOnInit(): void {
        /**
        * get param id value from the router
        */
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.submission_id = +params['submission_id'];
        });

        this.initializeSingleForm();
        this.getCategories();
        this.getExplores();
        this.getKeywords();
        this.getAuthors();
        this.getTypes();
        this.getContentDetails(this.index);

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

        //for author drop down
        this.author_setting = {
            text: "Select Author",
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
            this.singleSubmission.selectedKeyword[i] = new Array();
            this.singleSubmission.selectedKeyword[i]['id'] = item[i].id;
            this.singleSubmission.selectedKeyword[i]['itemName'] = item[i].itemName;
        }
        return this.singleSubmission.selectedKeyword;
    }
    onItemDeSelect1(item: any) {
        for (let i = 0; i < item.length; i++) {
            this.singleSubmission.selectedKeyword[i] = new Array();
            this.singleSubmission.selectedKeyword[i]['id'] = item[i].id;
            this.singleSubmission.selectedKeyword[i]['itemName'] = item[i].itemName;
        }
        return this.singleSubmission.selectedKeyword;
    }
    onSelectAll1(items: any) {
        for (let i = 0; i < this.keywordItemList.length; i++) {
            this.singleSubmission.selectedKeyword[i] = new Array();
            this.singleSubmission.selectedKeyword[i]['id'] = this.keywordItemList[i].id;
            this.singleSubmission.selectedKeyword[i]['itemName'] = this.keywordItemList[i].itemName;
        }
        return this.singleSubmission.selectedKeyword;
    }
    onDeSelectAll1(items: any) {
        this.singleSubmission.selectedKeyword = [];
        return this.singleSubmission.selectedKeyword;
    }

    //category drop down list functions
    onItemSelect2(item: any) {
        for (let i = 0; i < item.length; i++) {
            this.singleSubmission.selectedCategory[i] = new Array();
            this.singleSubmission.selectedCategory[i]['id'] = item[i].id;
            this.singleSubmission.selectedCategory[i]['itemName'] = item[i].itemName;
        }
        return this.singleSubmission.selectedCategory;
    }
    onItemDeSelect2(item: any) {
        for (let i = 0; i < item.length; i++) {
            this.singleSubmission.selectedCategory[i] = new Array();
            this.singleSubmission.selectedCategory[i]['id'] = item[i].id;
            this.singleSubmission.selectedCategory[i]['itemName'] = item[i].itemName;
        }
        return this.singleSubmission.selectedCategory;
    }
    onSelectAll2(items: any) {
        for (let i = 0; i < this.CategoryItemList.length; i++) {
            this.singleSubmission.selectedCategory[i] = new Array();
            this.singleSubmission.selectedCategory[i]['id'] = this.CategoryItemList[i].id;
            this.singleSubmission.selectedCategory[i]['itemName'] = this.CategoryItemList[i].itemName;
        }
        return this.singleSubmission.selectedCategory;
    }
    onDeSelectAll2(items: any) {
        this.singleSubmission.selectedCategory = [];
        return this.singleSubmission.selectedCategory;
    }

    //explore drop down list functions
    onItemSelect3(item: any) {
        for (let i = 0; i < item.length; i++) {
            this.singleSubmission.selectedExplore[i] = new Array();
            this.singleSubmission.selectedExplore[i]['id'] = item[i].id;
            this.singleSubmission.selectedExplore[i]['itemName'] = item[i].itemName;
        }
        return this.singleSubmission.selectedExplore;
    }
    onItemDeSelect3(item: any) {
        for (let i = 0; i < item.length; i++) {
            this.singleSubmission.selectedExplore[i] = new Array();
            this.singleSubmission.selectedExplore[i]['id'] = item[i].id;
            this.singleSubmission.selectedExplore[i]['itemName'] = item[i].itemName;
        }
        return this.singleSubmission.selectedExplore;
    }
    onSelectAll3(items: any) {
        for (let i = 0; i < this.ExploreItemList.length; i++) {
            this.singleSubmission.selectedExplore[i] = new Array();
            this.singleSubmission.selectedExplore[i]['id'] = this.ExploreItemList[i].id;
            this.singleSubmission.selectedExplore[i]['itemName'] = this.ExploreItemList[i].itemName;
        }
        return this.singleSubmission.selectedExplore;
    }
    onDeSelectAll3(items: any) {
        this.singleSubmission.selectedExplore = [];
        return this.singleSubmission.selectedExplore;
    }

    //author drop down list functions
    onItemSelect4(item: any) {
        for (let i = 0; i < item.length; i++) {
            this.singleSubmission.selectedAuthor[i] = new Array();
            this.singleSubmission.selectedAuthor[i]['id'] = item[i].id;
            this.singleSubmission.selectedAuthor[i]['itemName'] = item[i].itemName;
        }
        return this.singleSubmission.selectedExplore;
    }
    onItemDeSelect4(item: any) {
        for (let i = 0; i < item.length; i++) {
            this.singleSubmission.selectedAuthor[i] = new Array();
            this.singleSubmission.selectedAuthor[i]['id'] = item[i].id;
            this.singleSubmission.selectedAuthor[i]['itemName'] = item[i].itemName;
        }
        return this.singleSubmission.selectedExplore;
    }
    onSelectAll4(items: any) {
        for (let i = 0; i < this.AuthorItemList.length; i++) {
            this.singleSubmission.selectedAuthor[i] = new Array();
            this.singleSubmission.selectedAuthor[i]['id'] = this.AuthorItemList[i].id;
            this.singleSubmission.selectedAuthor[i]['itemName'] = this.AuthorItemList[i].itemName;
        }
        return this.singleSubmission.selectedAuthor;
    }
    onDeSelectAll4(items: any) {
        this.singleSubmission.selectedAuthor = [];
        return this.singleSubmission.selectedAuthor;
    }

    private initializeSingleForm(): void {
        this.singleSubForm = this.formBuilder.group({
            'sub_url': [''],
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
            'sub_authors': new FormGroup({
                'sub_author': new FormControl([], Validators.required)
            }),
            'sub_description': [null]
        });
    }

    public isFieldValid(field: string) {
        return !this.singleSubForm.get(field).valid && this.singleSubForm.get(field).touched;
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
     * get author details
     */
    public getAuthors() {
        this.authorService.getAuthorsList().subscribe(
            success => {
                this.authorList = success.success;
                for (let i = 0; i < this.authorList.length; i++) {
                    this.AuthorItemList[i] = new Array();
                    this.AuthorItemList[i]['id'] = this.authorList[i].id;
                    this.AuthorItemList[i]['itemName'] = this.authorList[i].en_name;
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
     * increase index using arrow button
     */
    // public increaseIndex() {
    //     if (this.index < this.contentDetails.length) {
    //         this.index = this.index + 1;
    //         this.singleSubmission.selectedKeyword = [];
    //         this.singleSubmission.selectedCategory = [];
    //         this.singleSubmission.selectedExplore = [];
    //         this.getContentDetails(this.index);
    //     }
    // }

    /**
     * increase index using arrow button
     */
    // public decreaseIndex() {
    //     if (this.index >= 1) {
    //         this.index = this.index - 1;
    //         this.singleSubmission.selectedKeyword = [];
    //         this.singleSubmission.selectedCategory = [];
    //         this.singleSubmission.selectedExplore = [];
    //         this.getContentDetails(this.index);
    //     }
    // }

    /**
     * get content data
     */
    public getContentDetails(x) {
        this.contentService.editContent(
            this.id,
            this.submission_id
        ).subscribe(
            success => {
                this.contentDetails = success.success;
                this.contentArrayLength = this.contentDetails.length;
                this.content_id = this.contentDetails[x].id;
                this.singleSubmission.sub_url1 = this.contentDetails[x].url;
                this.singleSubmission.sub_description1 = this.contentDetails[x].description;
                this.singleSubmission.sub_title1 = this.contentDetails[x].title;
                this.singleSubmission.sub_video_url1 = this.contentDetails[x].video_url;
                this.singleSubmission.sub_type1 = this.contentDetails[x].type_id;
                this.singleSubmission.sub_free1 = this.contentDetails[x].freeform_keyword;

                if (this.contentDetails[x].keyword.length > 0) {
                    this.singleSubmission.selectedKeyword = new Array();
                    for (let i = 0; i < this.contentDetails[x].keyword.length; i++) {
                        this.singleSubmission.selectedKeyword[i] = {};
                        this.singleSubmission.selectedKeyword[i].id = this.contentDetails[x].keyword[i].id;
                        this.singleSubmission.selectedKeyword[i].itemName = this.contentDetails[x].keyword[i].en_name;
                    }
                }

                if (this.contentDetails[x].category.length > 0) {
                    this.singleSubmission.selectedCategory = new Array();
                    for (let i = 0; i < this.contentDetails[x].category.length; i++) {
                        this.singleSubmission.selectedCategory[i] = {};
                        this.singleSubmission.selectedCategory[i]['id'] = this.contentDetails[x].category[i].id;
                        this.singleSubmission.selectedCategory[i]['itemName'] = this.contentDetails[x].category[i].en_name;
                    }
                }

                if (this.contentDetails[x].explore.length > 0) {
                    this.singleSubmission.selectedExplore = new Array();
                    for (let i = 0; i < this.contentDetails[x].explore.length; i++) {
                        this.singleSubmission.selectedExplore[i] = {};
                        this.singleSubmission.selectedExplore[i]['id'] = this.contentDetails[x].explore[i].id;
                        this.singleSubmission.selectedExplore[i]['itemName'] = this.contentDetails[x].explore[i].en_tag;
                    }
                }

                if (this.contentDetails[x].author.length > 0) {
                    this.singleSubmission.selectedAuthor = new Array();
                    for (let i = 0; i < this.contentDetails[x].author.length; i++) {
                        this.singleSubmission.selectedAuthor[i] = {};
                        this.singleSubmission.selectedAuthor[i]['id'] = this.contentDetails[x].author[i].id;
                        this.singleSubmission.selectedAuthor[i]['itemName'] = this.contentDetails[x].author[i].en_name;
                    }
                }
            }
            );
    }

    /**
     * add or update contents
     * @param formData 
     */
    public addContents() {

        this.exploreArray = [];
        this.categoryArray = [];
        this.keywordArray = [];
        this.authorArray = [];

        for (let i = 0; i < this.singleSubmission.selectedExplore.length; i++) {

            this.exploreArray.push(this.singleSubmission.selectedExplore[i].id);
            //this.exploreArray[i] = this.singleSubmission.selectedExplore[i].id;
        }

        for (let i = 0; i < this.singleSubmission.selectedKeyword.length; i++) {

            this.keywordArray.push(this.singleSubmission.selectedKeyword[i].id);
        }

        for (let i = 0; i < this.singleSubmission.selectedCategory.length; i++) {

            this.categoryArray.push(this.singleSubmission.selectedCategory[i].id);
        }

        for (let i = 0; i < this.singleSubmission.selectedAuthor.length; i++) {

            this.authorArray.push(this.singleSubmission.selectedAuthor[i].id);
        }

        this.contentService.addContentData(
            this.content_id,
            this.submission_id,
            this.singleSubmission.sub_title1,
            this.singleSubmission.sub_type1,
            this.singleSubmission.sub_video_url1,
            this.keywordArray,
            this.singleSubmission.sub_free1,
            this.categoryArray,
            this.exploreArray,
            this.authorArray,
            this.singleSubmission.sub_description1,
            this.status
        ).subscribe(
            success => {
                this.updateContentStatus = success.success;
                this.error = success.error;
                this.hideAlert();

            }
            );
    }

}

export class SingleSubmission {
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