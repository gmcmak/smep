import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'update-submission',
    templateUrl: 'update-submission.component.html',
    styleUrls: ['update-submission.component.css']
})

export class UpdateSubmissionComponent implements OnInit{

    public sub: any;
    public id: number;
    public user_id;

    constructor(
        private route: ActivatedRoute
    ){}

    ngOnInit(): void {
        /**
         * get param id value from the router
         */
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.user_id = +params['user_id'];
        });

        console.log(this.user_id);

    }

}