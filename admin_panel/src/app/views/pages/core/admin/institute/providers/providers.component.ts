import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

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

    public addProviderForm: FormGroup;
    constructor(private formBuilder:FormBuilder){  }

    ngOnInit(): void {
        this.validateProviderId();
        this.dataTable();
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

}
