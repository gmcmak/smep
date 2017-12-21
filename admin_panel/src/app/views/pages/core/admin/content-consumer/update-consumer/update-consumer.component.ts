import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import CustomValidators from '../../../../../../common/validation/CustomValidators';
import { ModuleService } from "../../../../../../services/businessservices/core/module/module.service";
import { ConsumerService } from "../../../../../../services/businessservices/core/content-consumer/consumer.service";

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
    public modulesList;
    private permissions;

    public editId = 91; //consumer id for edit
    public editConsumerList;
    public moduleId;

    public consumerAddingStatus;

    constructor(
        private formBuilder: FormBuilder,
        private moduleService: ModuleService,
        private consumerService: ConsumerService
    ) {

    }

    ngOnInit(): void {
        this.initializeConsumerForm();
        this.loadModules();
        this.editConsumer();

    }
    private initializeConsumerForm(): void {
        this.consumerForm = this.formBuilder.group({
            'caName': [null, Validators.required],
            'caWebUrl': [null, [Validators.required, Validators.pattern(URL_REGEX)]],
            'status': [null, [Validators.required]],
            'permissions': [null]
        })
    }

    get products() {
        return this.consumerForm.get('products');
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

    /**
     * get modules list
     */
    loadModules() {
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
    // addConsumer(formData) {
    //     this.permissions = $.map($('input[name="permissions"]:checked'), function (c) { return c.value; });
    //     this.consumerService.addConsumer(
    //         formData.caName,
    //         formData.caWebUrl,
    //         formData.status,
    //         this.permissions
    //     ).subscribe(
    //         success => {
    //             this.consumerAddingStatus = success.success
    //         }
    //         );
    //}

    /**
     * get consumer details for edit
     */
    editConsumer(){
        this.consumerService.editConsumerList(
            this.editId
        ).subscribe(
            success => {
                this.editConsumerList = success.success;
                this.consumer.caName = this.editConsumerList[0].name;
                this.consumer.caWebUrl = this.editConsumerList[0].url;
                this.consumer.status = this.editConsumerList[0].status;
                for(let i=0 ; i<this.editConsumerList[0].modules.length; i++){
                    //alert(this.editConsumerList[0].modules[i].module_name);
                    this.moduleId = this.editConsumerList[0].modules[i].id;
                }
            }
        );
    }
}

export class Consumer {
    public caName: string;
    public caWebUrl: string;
    public status: boolean;
    public moduleId: number;
    //public caPassword: string;
}