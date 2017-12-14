import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
    selector: 'ca-content-authorization',
    templateUrl: 'content-authorization.component.html',
    styleUrls: ['content-authorization.component.css']
})

export class ContentAuthorizationComponent implements OnInit{

    public providerInfo = new ProviderInfo();

    public searchForm: FormGroup;

    constructor(private formBuilder: FormBuilder){

    }
    ngOnInit(): void {
        this.initializeProviderSerach();
    }

    private initializeProviderSerach(): void{
        this.searchForm = this.formBuilder.group({
            'providerId': [null, [Validators.required]]
        });
    }

    public isFieldValid(field: string) {
        return !this.searchForm.get(field).valid && this.searchForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }

}

export class ProviderInfo{
    public provider_id: string;
}