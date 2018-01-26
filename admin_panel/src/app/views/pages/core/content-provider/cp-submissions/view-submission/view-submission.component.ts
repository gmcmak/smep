import { Component, OnInit } from "@angular/core";
import { SubmissionService } from "../../../../../../services/businessservices/core/submission/submission.service";
import { UserService } from "../../../../../../services/businessservices/core/user/user.service";

declare var $:any;
declare var jQuery:any;

@Component({
    selector: 'view-submission',
    templateUrl: 'view-submission.component.html',
    styleUrls: ['view-submission.component.css']
})

export class ViewSubmissionComponent implements OnInit{

    public submissionDataList;
    public userDataList;
    public user_id: number; //logged user id

    ngOnInit(): void {
        this.getLoggedUserData();
        //this.loadSubmissionData();

    }

    constructor(
        private submissionService: SubmissionService,
        private userService: UserService
    ){}

    public loadTable(){
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

    /**
     * get logged user data
     */
    getLoggedUserData() {
        this.userService.getLoggedUser().subscribe(
            success => {
                this.userDataList = success.success;
                //console.log(this.userDataList.id);
                this.user_id = this.userDataList.id;
                this.loadSubmissionData(this.user_id);
            }
        );
    }

    /**
     * get submission data
     */
    loadSubmissionData(user_id){
        this.submissionService.getSubmissionData(
            user_id
        ).subscribe(
            success => {
                this.submissionDataList = success.success;
                this.loadTable();
            }
        );
    }
}