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
     * get all consumers' details
     */
    getConsumersList(){
        this.consumerService.getConsumerList(

        ).subscribe(
            success => {
                this.consumerList = success.success;
                // $("#dataTableConsumers").find('tbody').empty();
                // var dataClaims = this.consumerList;
                // for (let i = 0; i < dataClaims.length; i++) {
                //     var modules = "<ul>";
                //     for (let j = 0; j < dataClaims[i].modules.length; j++) {
                //         modules = modules.concat("<li>"+dataClaims[i].modules[j].module_name+"</li>");
                //     }
               
                //     modules = modules.concat("</ul>");
                //     $('#dataTableConsumers').dataTable().fnAddData([
                //         (i + 1),
                //         dataClaims[i].name,
                //         dataClaims[i].url,
                //         modules,
                //         '<a href="www.g">10</a>',
                //         '<a [routerLink]='+'"['+"'"+ '../../content-consumer/update-consumers' + "'" + ']"' + ' class="fa fa-1x fa-pencil-square-o"></a>',
                //         '<a data-toggle="modal" data-target="#deleteModal"><li class="fa  fa-1x fa-trash"></li></a>'
                //     ]);
                // }
            }
        );
    }


}