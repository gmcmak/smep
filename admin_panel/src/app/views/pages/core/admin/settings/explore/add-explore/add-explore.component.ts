import {Component,OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'add-explore',
    templateUrl: 'add-explore.component.html',
    styleUrls: ['add-explore.component.css']
})

export class AddExploreComponent implements OnInit{

    public englishName: string;
    public sinhalaName: string;
    public tamilName: string;
    public exploreStatus: boolean;

    ngOnInit(): void {
        this.initializeExploreForm();
    }

    public exploreForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {

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
    
}