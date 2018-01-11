import { Component, OnInit } from "@angular/core";
import { SubmissionService } from "../../../../../../services/businessservices/core/submission/submission.service";

declare var $:any;
declare var jQuery:any;

@Component({
    selector: 'view-submission',
    templateUrl: 'view-submission.component.html',
    styleUrls: ['view-submission.component.css']
})

export class ViewSubmissionComponent implements OnInit{

    public submissionDataList;
    public user_id = 61; //logged user id

    ngOnInit(): void {
        this.loadSubmissionData();

        setTimeout(
            function () {
                $('#submissionTable').DataTable({
                    "language": {
                        "search": "Search by: (Name/ Url)"
                    }
                });
            }, 2000
        );
        
    }

    constructor(
        private submissionService: SubmissionService
    ){}

    /**
     * get submission data
     */
    loadSubmissionData(){
        this.submissionService.getSubmissionData(
            this.user_id
        ).subscribe(
            success => {
                this.submissionDataList = success.success;
            }
        );
    }

}