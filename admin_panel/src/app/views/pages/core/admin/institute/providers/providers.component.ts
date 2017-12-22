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
        this.dataTable();
        this.getAddedProviders();
    }

    dataTable() {
        $('#providerTable').DataTable({
            "language": {
                "search": "Search by: (ID/ Name/ Subject Areas)"
            }

        });
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

    public onSubmit(): void{
        this.showDiv = this.providerId;
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
                $("#providerTable").find('tbody').empty();
                var dataClaims = this.providerList;
                for (let i = 0; i < dataClaims.length; i++) {
                    for (let j = 0; j < dataClaims[i].institute_users.length; j++) {
                        $('#providerTable').dataTable().fnAddData([
                            (i + 1),
                            dataClaims[i].institute_users[j].id,
                            dataClaims[i].institute_users[j].name,
                            '<a>Mathsssss</a>',
                            '<a data-toggle="modal" data-target="#deleteModal"><li class="fa fa-1x fa-trash"></li></a>'
                        ]);
                    }
                }
            }
            );
    }

}
