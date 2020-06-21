import {Component, OnInit} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {CatfactService} from '../services/catfact.service';
import {ImageService} from '../services/image.service';
import {LocalStorageService} from '../services/local-storage.service';
import {ToastController} from '@ionic/angular';

@Component({
    selector: 'app-create-catfact',
    templateUrl: './create-catfact.page.html',
    styleUrls: ['./create-catfact.page.scss'],
})
export class CreateCatfactPage implements OnInit {

    imgUrl = 'https://api.thecatapi.com/v1/images/search?format=src';
    catImage: any;
    isImageLoading: boolean;

    catFactsUrl = 'https://cat-fact.herokuapp.com/facts';
    isCatFactLoading: boolean;
    arrayIndexNumber: number;
    catfactText: string;
    httpStatusCode: number;

    showLoader: boolean;

    myCatfactList: Array<{ title: string, img: any, catfact: string }>;

    catfactTitle: string;

    titleInputElement = false;
    buttonContainerElement = true;
    cardElement = true;

    constructor(private catfactService: CatfactService,
                private imageService: ImageService,
                private localStorageService: LocalStorageService,
                private toastController: ToastController) {
        this.arrayIndexNumber = 0;
    }

    getImageFromService() {
        this.showProgressBarHideCard();
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
            this.catImage = reader.result;
        }, false);

        if (image) {
            reader.readAsDataURL(image);
        }
        this.hideProgressBarShowCard();
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
        if (response.body.all.length > this.arrayIndexNumber) {
            this.arrayIndexNumber++;
        } else {
            this.arrayIndexNumber = 0;
        }
        this.catfactText = response.body.all[this.arrayIndexNumber].text;
        this.httpStatusCode = response.status;
    }

    nextItem() {
        this.getImageFromService();
        this.getHttpResponseObjectFromService();
    }

    addItem() {
        this.localStorageService.addItem(this.catfactTitle, this.catImage, this.catfactText);
        this.hideTitleInputShowButtons();
        this.presentToast();
        this.catfactTitle = '';
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Cat Fact Saved.',
            duration: 2000
        });
        toast.present();
    }

    showTitleInputHideButtons() {
        this.titleInputElement = true;
        this.buttonContainerElement = false;
    }

    hideTitleInputShowButtons() {
        this.titleInputElement = false;
        this.buttonContainerElement = true;
    }

    showProgressBarHideCard() {
        this.catImage = null;
        this.showLoader = true;
        this.cardElement = false;
        this.buttonContainerElement = false;
    }

    hideProgressBarShowCard() {
        this.showLoader = false;
        this.cardElement = true;
        this.buttonContainerElement = true;
    }

    ngOnInit() {
        this.localStorageService.readStorage().then((value) => {
            this.myCatfactList = value;
            this.getImageFromService();
            this.getHttpResponseObjectFromService();
        });
    }
}


