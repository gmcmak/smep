import {Component,OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExploreService } from "../../../../../../../services/businessservices/core/settings/explore.service";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'add-explore',
    templateUrl: 'add-explore.component.html',
    styleUrls: ['add-explore.component.css']
})

export class AddExploreComponent implements OnInit{

    public explore = new Explore();
    public exploreForm: FormGroup;
    private deleted;
    public exploreAddingStatus;
    public error = 0;

    constructor(
        private formBuilder: FormBuilder,
        private exploreService: ExploreService
    ) {}

    ngOnInit(): void {
        this.initializeExploreForm();
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
    public changeAlertClass(){
        return{
            'alert-success': this.error === 0,
            'alert-danger': this.error != 0
        }
    }

    private initializeExploreForm(): void {
        this.exploreForm = this.formBuilder.group({
            'english_name': [null, [Validators.required]],
            'sinhala_name': [null, [Validators.required]],
            'tamil_name': [null, [Validators.required]],
            'explore_status': [null, [Validators.required]],
        });
    }

    public isFieldValid(field: string) {
        return !this.exploreForm.get(field).valid && this.exploreForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }
    
    /**
     * insert explore data
     */
    addExplore(formData){
        this.exploreService.addExploresList(
            formData.english_name,
            formData.sinhala_name,
            formData.tamil_name,
            formData.explore_status,
            this.deleted=0,
        ).subscribe(
            success => {
                this.exploreAddingStatus = success.success;
                this.error = success.error;
                this.exploreForm.reset();
                this.hideAlert();
            }
        );
    }
}

export class Explore{
    public englishName: string;
    public sinhalaName: string;
    public tamilName: string;
    public exploreStatus: boolean;
}