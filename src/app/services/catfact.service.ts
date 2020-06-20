import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CatfactService {

    constructor(private httpClient: HttpClient) {
    }

    getCatFact(catFactsUrl: string): Observable<HttpResponse<any>> {
        return this.httpClient.get(catFactsUrl, {observe: 'response'});
    }
}
