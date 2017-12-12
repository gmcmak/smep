import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";



@Injectable()

export class UserService {

    constructor(private http: Http) {}

    public static API_ENDPOINT = "http://localhost:8080/web/";

    /**
     * Social User login date store
     * @param searchText 
     */
    public socialUserRecords(socialId: string, mediaType: string, socialEmail: string) {
        return this.http.get(UserService.API_ENDPOINT + "socialLoginData.php?socialId=" + socialId +"&mediaType="+mediaType +"&socialEmail="+socialEmail)
            .map((response: Response) => response.json());
    }    

    /**
     * this service used to store user searched keywords on db
     * @param socialId 
     * @param keyword 
     */
    public socialUserKeywords(socialId: string, keyword: string) {
        return this.http.get(UserService.API_ENDPOINT + "socialKeywordData.php?socialId=" + socialId +"&keyword="+keyword)
            .map((response: Response) => response.json());
    }   

    /**
     * this is used to get list of searched keyword list from logged users
     * @param socialId 
     */
    public getSocialUserKeywordsList(socialId: string) {
        return this.http.get(UserService.API_ENDPOINT + "getSocialKeywordData.php?socialId=" + socialId)
            .map((response: Response) => response.json());
    }   

    /**
     * this is used to update rate
     * @param rate 
     * @param recordId 
     * @param type 
     */
    public updateUserRate(rate: number, recordId:number, type:string){
        return this.http.get(UserService.API_ENDPOINT + "updateUserRate.php?rate=" + rate+"&recordId="+recordId+"&type="+type)
            .map((response: Response) => response.json());        
    }

}
