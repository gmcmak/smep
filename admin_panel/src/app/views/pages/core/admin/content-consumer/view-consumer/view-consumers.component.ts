import { Component, OnInit} from "@angular/core";

declare var $: any;
declare var jQuery: any;

@Component({
    selector: 'view-consumers',
    templateUrl: 'view-consumers.component.html',
    styleUrls: ['view-consumers.component.css']
})

export class ViewConsumersComponent implements OnInit{
    ngOnInit(): void {
        this.dataTable();
     }
 
 
     dataTable(){
         $('#dataTableConsumers').DataTable({
            "language": {
                "search": "Search by: (Content consumer's name/ URL)"
              }
         });
     }
}