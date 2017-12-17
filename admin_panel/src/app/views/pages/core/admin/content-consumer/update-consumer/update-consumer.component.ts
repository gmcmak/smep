import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import CustomValidators from '../../../../../../common/validation/CustomValidators';

declare var $: any;
declare var jQuery: any;
const NIC_REGEX = /^[0-9]{9}[VXvx]/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])/;
const MOBILE_REGEX = /^[0-9]{10}/;
const URL_REGEX = ('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}');

@Component({
    selector: 'update-consumer',
    templateUrl: 'update-consumer.component.html',
    styleUrls: ['update-consumer.component.css']
})

export class UpdateConsumersComponent implements OnInit{

    public consumer = new Consumer();

    public consumerForm: FormGroup;
    constructor(private formBuilder: FormBuilder) {

    }

    ngOnInit(): void {
        this.initializeConsumerForm();

    }
    private initializeConsumerForm(): void {
        this.consumerForm = this.formBuilder.group({
            'caName': [null, Validators.required],
            'caWebUrl': [null, [Validators.required, Validators.pattern(URL_REGEX)]],
            'caPassword': [null, Validators.required]
        })
    }

    public isFieldValid(field: string) {
        return !this.consumerForm.get(field).valid && this.consumerForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }
}

export class Consumer {
    public caName: string;
    public caWebUrl: string;
    public caPassword: string;
}