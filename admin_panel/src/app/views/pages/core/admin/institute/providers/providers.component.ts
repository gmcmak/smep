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
    public providerId: string;
    public showDiv: string = '';

    public id=17; //institute id
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
            'providerId': [null, [Validators.required, Validators.pattern(NIC_REGEX)]]
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
    * get added providers details 
    */
    public getAddedProviders() {
        this.instituteService.getAddedProviders(
            this.id
        ).subscribe(
            success => {
                this.providerList = success.success;
            }
            );
    }

    showId(id){
        alert(id);
    }

}
