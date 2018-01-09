import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InstituteService } from "../../../../../../services/businessservices/core/institute/institute.service";

declare var $: any;
declare var jQuery: any;

const NIC_REGEX = /^[0-9]{9}[VXvx]/;

@Component({
    selector: 'providers',
    templateUrl: 'providers.component.html',
    styleUrls: ['providers.component.css']
})

export class ProvidersComponent implements OnInit{
    public providerNic: string;
    public showDiv: string = '';

    public providerStatus;
    public institute_id = 17; //institute id
    public error;
    public providerList;

    public addProviderForm: FormGroup;
    constructor(
        private formBuilder:FormBuilder,
        private instituteService: InstituteService
    ){  }

    ngOnInit(): void {
        this.validateProviderId();
        
        setTimeout(function(){
            $('#providerTable').DataTable({
                "language": {
                    "search": "Search by: (ID/ Name/ Subject Areas)"
                }

            });
        }, 2000);

        this.getAddedProviders();
    }

    private validateProviderId(): void{
        this.addProviderForm = this.formBuilder.group({
            'providerNic': [null, [Validators.required, Validators.pattern(NIC_REGEX)]]
        });
    }

    public isFieldValid(field: string) {
        return !this.addProviderForm.get(field).valid && this.addProviderForm.get(field).touched;
    }

    public displayFieldCss(field: string) {
        return {
            'is-invalid': this.isFieldValid(field),
            'is-valid': this.isFieldValid(field)
        };
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
     * add authorizer
     */
    addProvider(formData) {
        this.instituteService.addProvider(
            this.institute_id,
            formData.providerNic
        ).subscribe(
            success => {
                this.providerStatus = success.success;
                this.error = success.error;
                this.addProviderForm.reset();
                this.hideAlert();
                this.getAddedProviders();
            }
            );
    }

    /**
     * change alert design
     */
    public changeAlertClass() {
        return this.error === 0 ? 'alert-success' : 'alert-danger';
    }

    /**
    * get added providers details 
    */
    public getAddedProviders() {
        this.instituteService.getAddedProviders(
            this.institute_id
        ).subscribe(
            success => {
                this.providerList = success.success;
            }
            );
    }

    /**
     * remove added providers
     */
    deleteProvider(deleteId, name) {
        if (confirm("Are you sure to delete ' " + name + " ' ?")) {
            this.instituteService.removeProvider(
                deleteId,
                this.institute_id
            ).subscribe(
                success => {
                    this.providerStatus = success.success;
                    this.error = success.error;
                    this.hideAlert();
                    this.getAddedProviders();
                }
                );
        }
    }

}
