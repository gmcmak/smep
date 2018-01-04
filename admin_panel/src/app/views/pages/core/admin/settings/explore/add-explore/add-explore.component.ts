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