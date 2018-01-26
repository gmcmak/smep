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
    public statusId = 0;

    ngOnInit(): void {  
        this.getConsumersList();
        this.loadTable();
    }

    constructor(
        private consumerService: ConsumerService
    ) { }

    /**
     * load table
     */
    public loadTable(){
        setTimeout(function () {
            $('#dataTableConsumers').DataTable({
                "language": {
                    "search": "Search by: (Content consumer's name/ URL)"
                }
            });
        }, 2000);
    }

    /**
     * delete table and reload
     */
    public deleteTable(){
        var x = 0;
        var table = $('#dataTableConsumers').DataTable();
        if(table.destroy()){
            x = 1;
        }
        if(x == 1){
            this.loadTable();
        }
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
     * change status
     */
    public changeStatus(id, status) {
        if (status == false) {
            this.statusId = 0;
        }
        else {
            this.statusId = 1;
        }
        this.consumerService.updateConsumerStatus(
            id,
            this.statusId
        ).subscribe(
            success => {
                this.consumerDeletingStatus = success.success;
                this.error = success.error;
                this.hideAlert();
            }
            );
    }

    /**
     * delete consumer data
     */
    deleteConsumer(deleteId, name) {
        if (confirm("Are you sure to delete ' " + name + " ' ?")) {
            this.consumerService.deleteConsumer(
                deleteId
            ).subscribe(
                success => {
                    this.consumerDeletingStatus = success.success;
                    this.error = success.error;
                    this.getConsumersList();
                    this.hideAlert();
                    this.deleteTable();
                }
                );
        }
    }


}