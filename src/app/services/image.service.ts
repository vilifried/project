import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImageService {

    constructor(private httpClient: HttpClient) {
    }

  /*  getImage(imageUrl: string): Observable<Blob> {
        const headers = new HttpHeaders({'x-api-key': '752f82d2-0191-4b4b-be84-52016e41f618'});
        return this.httpClient.get(imageUrl, {responseType: 'blob'});
    }*/
}
