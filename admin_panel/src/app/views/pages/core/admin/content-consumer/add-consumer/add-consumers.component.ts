import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';
import CustomValidators from '../../../../../../common/validation/CustomValidators';
import { ModuleService } from "../../../../../../services/businessservices/core/module/module.service";
import { ConsumerService } from "../../../../../../services/businessservices/core/content-consumer/consumer.service";
import { FormArray } from "@angular/forms/src/model";

declare var $: any;
declare var jQuery: any;
const NIC_REGEX = /^[0-9]{9}[VXvx]/;
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-])/;
const MOBILE_REGEX = /^[0-9]{10}/;
const URL_REGEX = ('https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,}');

@Component({
    selector: 'add-consumers',
    templateUrl: 'add-consumers.component.html',
    styleUrls: ['add-consumers.component.css']
})

export class AddConsumersComponent implements OnInit{

    public consumer = new Consumer();
    public consumerForm: FormGroup;
    public modulesList;
    private permissions;

    public consumerAddingStatus;

    constructor(
        private formBuilder: FormBuilder,
        private moduleService: ModuleService,
        private consumerService: ConsumerService
    ){

    }

    ngOnInit(): void {
        this.initializeConsumerForm();
        this.loadModules();

    }
<<<<<<< HEAD
        private initializeConsumerForm(): void{
            this.consumerForm = this.formBuilder.group({
                'caName': [null, Validators.required],
                'caWebUrl': [null, [Validators.required, Validators.pattern(URL_REGEX)]]
            })
        }
=======
    private initializeConsumerForm(): void{
        this.consumerForm = this.formBuilder.group({
            'caName': [null, Validators.required],
            'caWebUrl': [null, [Validators.required, Validators.pattern(URL_REGEX)]],
            'permissions': [null]
            
            //'caPassword': [null, Validators.required]
        })
    }

    get products() { 
        return this.consumerForm.get('products'); 
    }    
>>>>>>> fcac104a827d40ed2970a568413fc939e44e6aa1

    public isFieldValid(field: string) {
        return !this.consumerForm.get(field).valid && this.consumerForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
    }

    /**
     * get modules list
     */
    loadModules(){
        this.moduleService.getModulesList(

        ).subscribe(
            success => {
                this.modulesList = success.success
            }
        );
    }

    /**
     * add consumer details
     */
    addConsumer(formData){
        this.permissions = $.map($('input[name="permissions"]:checked'), function(c){return c.value; });
        this.consumerService.addConsumer(
            formData.caName,
            formData.caWebUrl,
            this.permissions
        ).subscribe(
            success => {
                this.consumerAddingStatus = success.success
            }
        );
    }
}

export class Consumer{
    public caName: string;
    public caWebUrl: string;
    //public caPassword: string;
}