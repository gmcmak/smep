import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms/src/validators';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])/;

@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit{

    public loginForm: FormGroup;
    constructor(private formBuilder: FormBuilder){}

    ngOnInit(): void {
        this.initializeLoginForm();
    }

    private initializeLoginForm(): void{
        this.loginForm = this.formBuilder.group({
            'email': [null, [Validators.required, Validators.pattern(EMAIL_REGEX)]],
            'password': [null, [Validators.required]]
        });
    }

    public isFieldValid(field: string) {
        return !this.loginForm.get(field).valid && this.loginForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }

}