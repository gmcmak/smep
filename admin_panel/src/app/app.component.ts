import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { ActivatedRoute, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { StartupService } from './services/settings/application-startup.service';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastCommunicationService } from './services/toast/toast-communication.service';
import { UserService } from "./services/businessservices/core/user/user.service";

import { FormGroup, Validators, FormControl} from '@angular/forms';
import { LocalStorageStore } from './services/storage/local-storage.service';




@Component({
    selector: 'app',
    styleUrls: ['./app.component.css'],
    templateUrl: './app.component.html'
})
export class AppComponent {

    currentDate: Date = new Date();
    private static readonly DEFAULT_LANGUAGE: string = "en";
    private sub: any;
    // Position of Ng2ToastyComponent
    public toastyComponentPosition: string;
    public edited = false;
    languages: Array<string> = [AppComponent.DEFAULT_LANGUAGE, "si"];
    private selectedLang: string = AppComponent.DEFAULT_LANGUAGE;
    private subscribe:any;
    private username;
    private token;
    loggedInUserList: any[];
    public userDataList; //logged user details
    public userRoleId;
   

    constructor(
        private translate: TranslateService, 
        private router: Router, 
        private startup: StartupService, 
        private slimLoader: SlimLoadingBarService, 
        private toastCommunicationService: ToastCommunicationService, 
        private UserService:UserService,
        private localStorageService: LocalStorageStore,
        private activatedRoute: ActivatedRoute
    ) {
        this.translate.addLangs(this.languages);
        // this language will be used as a fallback when a translation isn't found in the current language
        this.translate.setDefaultLang(AppComponent.DEFAULT_LANGUAGE);
        // the lang to use, if the lang isn't available, it will use the current loader to get them
        this.translate.use(this.selectedLang);

        //TODO : get user settings and use preferredLanguage to initialize translate service

        let browserLang = this.translate.getBrowserLang();
        this.translate.use(browserLang.match(/en|si/) ? browserLang : this.selectedLang);

        // We listen the position's changes
        this.toastCommunicationService.position$.subscribe(pos => this.toastyComponentPosition = pos);
        // Listen the navigation events to start or complete the slim bar loading
        this.sub = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.slimLoader.start();
            } else if ( event instanceof NavigationEnd ||
                        event instanceof NavigationCancel ||
                        event instanceof NavigationError) {
                this.slimLoader.complete();
            }
        }, (error: any) => {
            this.slimLoader.complete();
        });

    }

    ngOnInit() {

        this.getLoggedUserData();

        // If there is no startup data received (maybe an error!)
        // navigate to error route
        if (!this.startup.startupData) {
            console.log('NO STARTUP DATA');
            // this.router.navigate(['error'], { replaceUrl: true });
           
        }
        

        this.activatedRoute
            .queryParams
            .subscribe(params => {
                
            });
        
        
        this.loggedInUserList = JSON.parse(this.localStorageService.get('userData'));
        if(this.loggedInUserList){
            this.username = this.loggedInUserList.name;
            // if(this.loggedInUserList.token){
                
            // }
        }else{
            this.router.navigate(['/login']);
        }
                    
    }

    /**
     * get logged user data
     */
    getLoggedUserData() {
        this.UserService.getLoggedUser().subscribe(
            success => {
                this.userDataList = success.success;
                this.userRoleId = this.userDataList.role_id;
                return this.userRoleId;
                //console.log("logged user role id "+this.userDataList.role_id);
            }
        );
    }

    /**
     * logout
     */
    logout(){
        this.localStorageService.remove('userData');
        this.router.navigate(['/login']);
    }

    ngOnDestroy(): any {
        this.sub.unsubscribe();
    }

    private changeLanguage(lang: string) {
        this.selectedLang = lang;
        //TODO : set user settings
        this.translate.use(this.selectedLang);
    }

    homeButtonClick() {
        //  console.log('homeButtonClick');
        this.router.navigate(['home'], { replaceUrl: true });
    }

    voidButtonClick() {
        return false;
    }

    loginTrue(loginParam){
        return loginParam;
    }

    /**
     * this is use to display login icons, when click on the login button
     */
    loginSettings(){
        if(this.router.url == '/login'){ 
            return false;
        } else { 
            return true;
        }        
    }    


}
