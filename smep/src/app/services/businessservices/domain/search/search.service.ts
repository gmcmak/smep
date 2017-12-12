import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";



@Injectable()

export class SearchService {

    constructor(private http: Http) {}

    public static API_ENDPOINT = "http://localhost:8080/web/";

    /**
     * Search All data from backend
     * @param searchText 
     */
    public getSearchResult(searchText: string, sortOrder: string, itemPerPage: number, paginationStartingValue: number, contentTypes:string, contentDates:string, fromDate:string, toDate:string, as_q_1:string, as_q_2:string, as_ty_1:string, as_ty_2:string, as_op:string) {
        return this.http.get(SearchService.API_ENDPOINT + "search.php?searchText=" + searchText +"&sortOrder="+sortOrder+"&type=all&size="+itemPerPage+"&from="+paginationStartingValue+"&content_type="+contentTypes+"&content_dates="+contentDates+"&from_date="+fromDate+"&to_date="+toDate+"&as_q_1="+as_q_1+"&as_q_2="+as_q_2+"&as_ty_1="+as_ty_1+"&as_ty_2="+as_ty_2+"&as_op="+as_op)
            .map((response: Response) => response.json());
    }    

    /**
     * Search Image data from backend
     * @param searchText 
     */
    public getSearchImageResult(searchText: string, sortOrder: string, itemPerPage: number, paginationStartingValue: number, contentTypes:string, contentDates:string, fromDate:string, toDate:string, as_q_1:string, as_q_2:string, as_ty_1:string, as_ty_2:string, as_op:string) {
        return this.http.get(SearchService.API_ENDPOINT + "search.php?searchText=" + searchText+"&sortOrder="+sortOrder+"&type=pictures&size="+itemPerPage+"&from="+paginationStartingValue+"&content_type="+contentTypes+"&content_dates="+contentDates+"&from_date="+fromDate+"&to_date="+toDate+"&as_q_1="+as_q_1+"&as_q_2="+as_q_2+"&as_ty_1="+as_ty_1+"&as_ty_2="+as_ty_2+"&as_op="+as_op)
            .map((response: Response) => response.json());
    }  
        
    /**
     * Search Video data from backend
     * @param searchText 
     */
    public getSearchVideoResult(searchText: string, sortOrder: string, itemPerPage: number, paginationStartingValue: number, contentTypes:string, contentDates:string, fromDate:string, toDate:string, as_q_1:string, as_q_2:string, as_ty_1:string, as_ty_2:string, as_op:string) {
        return this.http.get(SearchService.API_ENDPOINT + "search.php?searchText=" + searchText+"&sortOrder="+sortOrder+"&type=videos&size="+itemPerPage+"&from="+paginationStartingValue+"&content_type="+contentTypes+"&content_dates="+contentDates+"&from_date="+fromDate+"&to_date="+toDate+"&as_q_1="+as_q_1+"&as_q_2="+as_q_2+"&as_ty_1="+as_ty_1+"&as_ty_2="+as_ty_2+"&as_op="+as_op)
            .map((response: Response) => response.json());
    }      

    /**
     * search related search terms from db
     * @param searchText 
     */
    public relatedSearch(searchText: string){
        return this.http.get(SearchService.API_ENDPOINT + "relatedSearch.php?searchText=" + searchText)
            .map((response: Response) => response.json());
    }

    /**
     * if user logged in search history show from db. 
     * Otherwise search history is shown from cookies. 
     */
    public searchHistory(){

    }
    



}
