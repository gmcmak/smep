import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';

@Component({
    selector: 'ca-content-authorization',
    templateUrl: 'content-authorization.component.html',
    styleUrls: ['content-authorization.component.css']
})

export class ContentAuthorizationComponent implements OnInit{

    public providerInfo = new ProviderInfo();

    public searchProvider: FormGroup;

    constructor(private formBuilder: FormBuilder){

    }
    ngOnInit(): void {
        this.initializeProviderSerach();
    }

    private initializeProviderSerach(): void{
        this.searchProvider = this.formBuilder.group({
            'providerId': [null, [Validators.required]]
        });
    }

}

export class ProviderInfo{
    public provider_id: string;
}