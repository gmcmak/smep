import {Component, OnInit} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { InstituteService } from "../../../../../../services/businessservices/core/institute/institute.service";
import { UserService } from "../../../../../../services/businessservices/core/user/user.service";

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
    public user_id: number; //logged user id
    public institute_id: number; //institute id
    public error;
    public providerList;
    public instituteDataList;
    public userDataList;

    public addProviderForm: FormGroup;
    constructor(
        private formBuilder:FormBuilder,
        private instituteService: InstituteService,
        private userService: UserService
    ){  }

    ngOnInit(): void {
        this.getLoggedUserData();
        this.validateProviderId();
        this.loadTable();
        

        //this.getAddedProviders();
    }

    public loadTable(){
        setTimeout(function () {
            $('#providerTable').DataTable({
                "language": {
                    "search": "Search by: (ID/ Name/ Subject Areas)"
                }

            });
        }, 5000);
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
    * get logged institute data
    */
    getLoggedUserData() {
        this.userService.getLoggedUser().subscribe(
            success => {
                this.userDataList = success.success;
                this.user_id = this.userDataList.id;
                this.getInstituteId(this.user_id);
            }
        );
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
                this.getAddedProviders(this.institute_id);
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
    public getAddedProviders(institute_id) {
        this.instituteService.getAddedProviders(
            institute_id
        ).subscribe(
            success => {
                this.providerList = success.success;
                this.loadTable();
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
                    this.getAddedProviders(this.institute_id);
                }
                );
        }
    }

    /**
     * get institute id for logged user
     */
    public getInstituteId(user_id){
        this.userService.loadInstituteId(
            user_id
        ).subscribe(
            success => {
                this.instituteDataList = success.success;
                this.institute_id = this.instituteDataList[0].id;
                this.getAddedProviders(this.institute_id);
            }
        );
    }

}
