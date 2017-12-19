import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExploreService } from "../../../../../../../services/businessservices/core/settings/explore.service";

@Component({
    selector: 'update-explore',
    templateUrl: 'update-explore.component.html',
    styleUrls: ['update-explore.component.css']
})

export class UpdateExploreComponent implements OnInit{

    public explore = new Explore();
    public exploreForm: FormGroup;
    public editExploreList;
    public id;
    public parent_id;
    public exploreUpdatingStatus;
    public updateExploreList;
    public deleted;

    constructor(
        private formBuilder: FormBuilder,
        private exploreService: ExploreService
    ) {}

    ngOnInit(): void {
        this.initializeExploreForm();
        this.editExplore();
    }

    private initializeExploreForm(): void {
        this.exploreForm = this.formBuilder.group({
            'english_name': [null, [Validators.required]],
            'sinhala_name': [null, [Validators.required]],
            'tamil_name': [null, [Validators.required]],
            'explore_status': [null, [Validators.required]],
        });
    }

    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
                return passwordConfirmationInput.setErrors({ notEquivalent: true })
            }
            else {
                if (passwordConfirmationInput.touched) {
                    return passwordConfirmationInput.setErrors(null);
                }
            }
        }
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
     * get explore details for update
     */
    editExplore(){
        this.exploreService.editExploresList(
            this.id=2
        ).subscribe(
            success => {
                this.editExploreList = success.success;
                this.explore.englishName = this.editExploreList[0].en_tag;
                this.explore.sinhalaName = this.editExploreList[0].si_tag;
                this.explore.tamilName = this.editExploreList[0].ta_tag;
                this.explore.exploreStatus = this.editExploreList[0].status;
            }
        );
    }

    /**
     * update explore details
     */
    updateExplore(formData){
        this.exploreService.updateExploresList(
            this.id=2,
            this.parent_id=0,
            formData.english_name,
            formData.sinhala_name,
            formData.tamil_name,
            formData.explore_status,
            this.deleted=0
        ).subscribe(
            success => {
                this.exploreUpdatingStatus = success.success;
            }
        );
    }
}

export class Explore {
    public englishName: string;
    public sinhalaName: string;
    public tamilName: string;
    public exploreStatus: boolean;
}