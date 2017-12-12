import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";



@Injectable()

export class MenuService {

    constructor(private http: Http) {}

    public static API_ENDPOINT = "http://localhost:8080/web/";

    /**
     * Expore menu items 
     */
    public exploreMenuItems() {
        return this.http.get(MenuService.API_ENDPOINT + "exploreMenu.php")
            .map((response: Response) => response.json());
    }    


}
