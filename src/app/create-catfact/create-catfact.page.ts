import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {CatfactService} from '../services/catfact.service';
import {ImageService} from '../services/image.service';

@Component({
    selector: 'app-create-catfact',
    templateUrl: './create-catfact.page.html',
    styleUrls: ['./create-catfact.page.scss'],
})
export class CreateCatfactPage implements OnInit {

    imgUrl = 'https://api.thecatapi.com/v1/images/search?format=src';
    imageToShow: any;
    isImageLoading: boolean;

    catFactsUrl= 'https://cat-fact.herokuapp.com/facts';
    isCatFactLoading: boolean;
    arrayIndexNumber: number;
    catFactItemText: string;
    statusCode: number;
    url: string;

    showLoader: boolean;

    constructor(private catfactService: CatfactService, private imageService: ImageService) {
        this.arrayIndexNumber = 0;
    }

    getImageFromService() {
        this.showProgressBar();
        this.isImageLoading = true;
        this.imageService.getImage(this.imgUrl).subscribe(data => {
            this.createImageFromBlob(data);
            this.isImageLoading = false;
        }, error => {
            this.isImageLoading = false;
            console.log(error);
        });
    }

    // JS FileReader - listens to load-Event, returns base64-encoded image
    createImageFromBlob(image: Blob) {
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            this.imageToShow = reader.result;
        }, false);

        if (image) {
            reader.readAsDataURL(image);
        }
        this.hideProgressBar();
    }

    getHttpResponseObjectFromService() {
        this.isCatFactLoading = true;
        this.catfactService.getCatFact(this.catFactsUrl).subscribe(data => {
            this.createStringFromHttpResponseObject(data);
            this.isCatFactLoading = false;
        }, error => {
            this.isCatFactLoading = false;
            console.log(error);
        });
    }

    createStringFromHttpResponseObject(response: HttpResponse<any>) {
        if (response.body['all'].length > this.arrayIndexNumber) {
            this.arrayIndexNumber++;
        } else {
            this.arrayIndexNumber = 0;
        }
        this.catFactItemText = response.body['all'][this.arrayIndexNumber]['text'];
        this.statusCode = response.status;
        this.url = response.url;
    }

    // action for floating action button
    nextItem() {
        this.getImageFromService();
        this.getHttpResponseObjectFromService();
    }

    showProgressBar() {
        this.imageToShow = null;
        this.showLoader = true;
    }

    hideProgressBar() {
        this.showLoader = false;
    }

    ngOnInit() {
        this.getImageFromService();
        this.getHttpResponseObjectFromService();
    }

}
