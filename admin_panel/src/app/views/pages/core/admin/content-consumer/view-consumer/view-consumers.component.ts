import { Component, OnInit } from "@angular/core";
import { ConsumerService } from "../../../../../../services/businessservices/core/content-consumer/consumer.service";
import { setTimeout } from "timers";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-consumers',
    templateUrl: 'view-consumers.component.html',
    styleUrls: ['view-consumers.component.css']
})

export class ViewConsumersComponent implements OnInit {

    public consumerList;
    public consumerDeletingStatus;
    public error = 0;

    ngOnInit(): void {
        setTimeout(function(){
            $('#dataTableConsumers').DataTable({
                "language": {
                    "search": "Search by: (Content consumer's name/ URL)"
                }
            });  
        }, 2000);
        this.getConsumersList();
    }

    constructor(
        private consumerService: ConsumerService
    ) { }

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

    /**
     * get all consumers' details
     */
    getConsumersList(){
        this.consumerService.getConsumerList(

        ).subscribe(
            success => {
                this.consumerList = success.success;
            }
        );
    }

    /**
     * delete consumer data
     */
    deleteConsumer(deleteId){
        this.consumerService.deleteConsumer(
            deleteId
        ).subscribe(
            success => {
                this.consumerDeletingStatus = success.success;
                this.error = success.error;
                this.getConsumersList();
                this.hideAlert();
            }
        );
    }


}