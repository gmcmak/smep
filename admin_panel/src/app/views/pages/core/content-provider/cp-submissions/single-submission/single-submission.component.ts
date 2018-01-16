import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { CategoryService } from "../../../../../../services/businessservices/core/settings/category.service";
import { ExploreService } from "../../../../../../services/businessservices/core/settings/explore.service";
import { KeywordService } from "../../../../../../services/businessservices/core/settings/keyword.service";

const URL_REGEX = ('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}');

declare var $:any;
declare var jQuery:any;


@Component({
    selector: 'cp-single-submission',
    templateUrl: 'single-submission.component.html',
    styleUrls: ['single-submission.component.css']
})

export class SingleSubmissionComponent implements OnInit{

    public singleSubmission = new SingleSubmission();

    public singleSubForm: FormGroup;
    public categoryList;
    public exploreList;
    public keywordList;

    public keywordItemList = new Array();
    selectedKeyword = [];
    keyword_setting = {};

    public CategoryItemList = new Array();
    selectedCategory = [];
    category_setting = {};

    public ExploreItemList = new Array();
    selectedExplore = [];
    explore_setting = {};



    constructor(
        private formBuilder:FormBuilder,
        private categoryService: CategoryService,
        private exploreService: ExploreService,
        private keywordService: KeywordService
    ){}

    ngOnInit(): void {
        this.initializeSingleForm();
        this.getCategories();
        this.getExplores();
        this.getKeywords();


        //for keyword drop down
        this.keyword_setting = {
            text: "Select Keyword",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            // classes: "myclass custom-class"
        };

        //for category drop down
        this.category_setting = {
            text: "Select Category",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            // classes: "myclass custom-class"
        };

        //for explore drop down
        this.explore_setting = {
            text: "Select Explore",
            selectAllText: 'Select All',
            unSelectAllText: 'UnSelect All',
            // classes: "myclass custom-class"
        };
    }

    //keyword drop down list functions
    onItemSelect1(item: any) {
        //console.log(item);
        console.log(this.selectedKeyword);
    }
    OnItemDeSelect1(item: any) {
        //console.log(item);
        console.log(this.selectedKeyword);
    }
    onSelectAll1(items: any) {
        console.log(items);
    }
    onDeSelectAll1(items: any) {
        console.log(items);
    }

    //category drop down list functions
    onItemSelect2(item: any) {
        //console.log(item);
        console.log(this.selectedCategory);
    }
    OnItemDeSelect2(item: any) {
        //console.log(item);
        console.log(this.selectedCategory);
    }
    onSelectAll2(items: any) {
        console.log(items);
    }
    onDeSelectAll2(items: any) {
        console.log(items);
    }

    //explore drop down list functions
    onItemSelect3(item: any) {
        //console.log(item);
        console.log(this.selectedExplore);
    }
    OnItemDeSelect3(item: any) {
        //console.log(item);
        console.log(this.selectedExplore);
    }
    onSelectAll3(items: any) {
        console.log(items);
    }
    onDeSelectAll3(items: any) {
        console.log(items);
    }

    private initializeSingleForm(): void{
        this.singleSubForm = this.formBuilder.group({
            'sub_url': ['', [Validators.required, Validators.pattern(URL_REGEX)]],
            'sub_type': ['', [Validators.required]],
            'sub_title': ['', [Validators.required]], 
            'sub_video_url': ['', [Validators.pattern(URL_REGEX)]],
            'sub_keywords': new FormGroup({
                'sub_keyword': new FormControl('', Validators.required),
                'sub_free': new FormControl('')
            }),
            'sub_categories': new FormGroup({
                'sub_category': new FormControl('', Validators.required)
            }),
            'sub_explores': new FormGroup({
                'sub_explore': new FormControl('', Validators.required)
            }),
            'sub_description': ['']
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
     * get categories
     */
    public getCategories(){
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
    public getExplores(){
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
    public getKeywords(){
        this.keywordService.getKeywordList().subscribe(
            success => {
                this.keywordList = success.success;
                for(let i=0; i<this.keywordList.length; i++){  
                    this.keywordItemList[i] = new Array();
                    this.keywordItemList[i]['id'] = this.keywordList[i].id;
                    this.keywordItemList[i]['itemName'] = this.keywordList[i].en_name;
                }
            }
        );
    }

    public displayValue(formData){
        // console.log('Input Data '+ this.singleSubmission.selectedCategory);
    }
}

export class SingleSubmission{
    public sub_url1: string;
    public sub_type1: number;
    public sub_title1: string;
    public sub_video_url1: string;
    public selectedKeyword: number;
    public sub_free1: string;
    public selectedCategory: number;
    public selectedExplore: number;
    public sub_description1: string;
}