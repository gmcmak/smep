import { Component } from "@angular/core";
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { UserService } from "../../../../../services/businessservices/core/user/user.service";

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
        private userService: UserService
    ){}

    /**
     * get logged user data
     */
    getLoggedUserData(){
        this.userService.getLoggedUser().subscribe(
            success => {
                this.userDataList = success.success;
            }
        );
    }

}