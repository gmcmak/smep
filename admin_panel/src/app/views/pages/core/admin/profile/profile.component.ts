import { Component } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { UserService } from "../../../../../services/businessservices/core/user/user.service";
import { Router } from "@angular/router";

@Component({
    selector: 'profile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css']
})

export class ProfileComponent implements OnInit{

    public userDataList;

    ngOnInit(): void {
       this.getLoggedUserData();
    }

    constructor(
        private userService: UserService,
        private router: Router
    ){}

    /**
     * get logged user data
     */
    getLoggedUserData(){
        this.userService.getLoggedUser().subscribe(
            success => {
                this.userDataList = success.success;
                //console.log(this.userDataList.id);
            }
        );
    }

    // public changeRouter(userId){
    //     if(userId==4){
    //         this.router.navigate(['../../content-authorizer/update-authorizers/', userId]);
    //     }
    //     if (userId == 3) {
    //         this.router.navigate(['../../content-provider/update-providers/', userId]);
    //     }
    //     if (userId == 5) {
    //         this.router.navigate(['../../institute/update-institute/', userId]);
    //     }
    // }

}