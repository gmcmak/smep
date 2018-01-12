import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { CategoryService } from "../../../../../../services/businessservices/core/settings/category.service";
import { ExploreService } from "../../../../../../services/businessservices/core/settings/explore.service";
import { KeywordService } from "../../../../../../services/businessservices/core/settings/keyword.service";

const URL_REGEX = ('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}');

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
    }

    private initializeSingleForm(): void{
        this.singleSubForm = this.formBuilder.group({
            'sub_url': [null, [Validators.required, Validators.pattern(URL_REGEX)]],
            'sub_type': [null, [Validators.required]],
            'sub_title': [null, [Validators.required]], 
            'sub_video_url': [null, [Validators.pattern(URL_REGEX)]],
            'sub_keyword': [null, [Validators.required]],
            'sub_free': [null],
            'sub_category': [null, [Validators.required]],
            'sub_explore': [null, [Validators.required]],
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
     * get categories
     */
    public getCategories(){
        this.categoryService.getCategoriesList().subscribe(
            success => {
                this.categoryList = success.success
            }
        );
    }

    /**
     * get explore details
     */
    public getExplores(){
        this.exploreService.getExploresList().subscribe(
            success => {
                this.exploreList = success.success
            }
        );
    }

    /**
     * get keyword details
     */
    public getKeywords(){
        this.keywordService.getKeywordList().subscribe(
            success => {
                this.keywordList = success.success
            }
        );
    }

}

export class SingleSubmission{
    public sub_url1: string;
    public sub_type1: number;
    public sub_title1: string;
    public sub_video_url1: string;
    public sub_Keyword1: number;
    public sub_free1: string;
    public sub_category1: number;
    public sub_explore1: number;
    public sub_description1: string;
}