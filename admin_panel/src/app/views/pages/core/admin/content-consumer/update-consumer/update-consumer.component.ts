import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import CustomValidators from '../../../../../../common/validation/CustomValidators';
import { ModuleService } from "../../../../../../services/businessservices/core/module/module.service";
import { ConsumerService } from "../../../../../../services/businessservices/core/content-consumer/consumer.service";
import { ActivatedRoute } from "@angular/router";

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
    public error = 0;

    public sub: any;
    public id: number;
    public editId: number;
    public editConsumerList;
    public moduleId: any[];

    public consumerUpdatingStatus;

    constructor(
        private formBuilder: FormBuilder,
        private moduleService: ModuleService,
        private consumerService: ConsumerService,
        private route: ActivatedRoute
    ) {

    }

    ngOnInit(): void {
        this.initializeConsumerForm();
        this.loadModules();

        /**
         * get param id value from the router
         */
        this.sub = this.route.params.subscribe(params => {
            this.editId = +params['id'];
        });

        this.editConsumer();
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
                this.moduleId = [];
                for(let i=0 ; i<this.editConsumerList[0].modules.length; i++){
                    this.moduleId.push(this.editConsumerList[0].modules[i].id);
                }
            }
            
        );
        
    }

    /**
     * update consumer
     */
    updateConsumer(formData){
        this.permissions = $.map($('input[name="permissions"]:checked'), function (c) { return c.value; });
        this.consumerService.updateConsumer(
            this.editId,
            formData.caName,
            formData.caWebUrl,
            formData.status,
            this.permissions
        ).subscribe(
            success => {
                this.consumerUpdatingStatus = success.success;
                this.error = success.error;
                this.consumerForm.reset();
                this.hideAlert();
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