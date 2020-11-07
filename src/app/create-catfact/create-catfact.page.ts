import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {CatfactService} from '../services/catfact.service';
import {ImageService} from '../services/image.service';
import {LocalStorageService} from '../services/local-storage.service';
import {ToastController} from '@ionic/angular';
import {HTTP} from '@ionic-native/http/ngx';

enum COLORS {
    GREY = '#E0E0E0',
    GREEN = '#66fd01',
    YELLOW = '#ffe802',
    RED = '#f80606'
}

@Component({
    selector: 'app-create-catfact',
    templateUrl: './create-catfact.page.html',
    styleUrls: ['./create-catfact.page.scss'],
})

export class CreateCatfactPage implements OnInit {

    imgUrl = 'https://api.thecatapi.com/v1/images/search?format=src';
    catImage: any;
    isImageLoading: boolean;

    catFactUrl = 'https://catfact.ninja/fact?max_length=900';
    isCatFactLoading: boolean;
    catfactText: string;
    catfactCounter: number;

    showLoader: boolean;

    catfactTitle: string;

    titleInputElement = false;
    cardElement = true;
    footerButtons = true;

    @Input() rating: number;
    @Output() ratingChange: EventEmitter<number> = new EventEmitter();

    constructor(private catfactService: CatfactService,
                private imageService: ImageService,
                private localStorageService: LocalStorageService,
                private toastController: ToastController,
                private http: HTTP) {
    }

    getCatfact() {
        this.isCatFactLoading = true;
        console.log('START');
        this.http.get(this.catFactUrl, {}, {})
            .then(data => {
                // this.createStringFromHttpResponseObject(data);
                this.isCatFactLoading = false;
                // this.catfactText = data.data.body.fact;
                //   console.log('DATA: ' + data.data.body.fact);
                this.catfactCounter++;
                console.log(data.status);
                console.log(data.data); // data received by server
                console.log(data.headers);

            })
            .catch(error => {

                console.log(error.status);
                console.log(error.error); // error message as string
                console.log(error.headers);

            });
    }

    // getHttpResponseObjectFromService() {
    //     this.isCatFactLoading = true;
    //     this.catfactService.getCatFact(this.catFactUrl).subscribe(data => {
    //         this.createStringFromHttpResponseObject(data);
    //         this.isCatFactLoading = false;
    //     }, error => {
    //         this.isCatFactLoading = false;
    //         console.log(error);
    //     });
    // }

    createStringFromHttpResponseObject(response: HttpResponse<any>) {
        this.catfactText = response.body.fact;
        this.catfactCounter++;
    }

    getBlobFromService() {
        this.showProgressBarHideCard();
        this.isImageLoading = true;
        // this.imageService.getImage(this.imgUrl).subscribe(data => {
        //     this.createImageFromBlob(data);
        //     this.isImageLoading = false;
        // }, error => {
        //     this.isImageLoading = false;
        //     console.log(error);
        // });
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

    getNextItemFromService() {
        this.getBlobFromService();
        //   this.getHttpResponseObjectFromService();
    }

    saveItem() {
        if (this.rating === undefined) {
            this.rating = 0;
        }
        this.localStorageService.addItem(this.catfactTitle, this.catImage, this.catfactText, this.rating);
        this.hideTitleInput();
        this.presentToast();
        this.catfactTitle = '';
        this.rating = 0;
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'Cat Fact Saved.',
            duration: 500,
            position: 'top',
            color: 'primary',
        });
        toast.present();
    }

    showTitleInput() {
        this.titleInputElement = true;
        this.footerButtons = false;
    }

    hideTitleInput() {
        this.titleInputElement = false;
        this.footerButtons = true;
    }

    showProgressBarHideCard() {
        this.catImage = null;
        this.showLoader = true;
        this.cardElement = false;
    }

    hideProgressBarShowCard() {
        this.showLoader = false;
        this.cardElement = true;
    }

    rate(index: number) {
        this.rating = index;
        this.ratingChange.emit(this.rating);
    }

    isAboveRating(index: number): boolean {
        return index > this.rating;
    }

    getColor(index: number) {
        if (this.isAboveRating(index)) {
            return COLORS.GREY;
        }
        switch (this.rating) {
            case 1:
            case 2:
                return COLORS.RED;
            case 3:
                return COLORS.YELLOW;
            case 4:
            case 5:
                return COLORS.GREEN;
            default:
                return COLORS.GREY;
        }
    }

    ngOnInit() {
        this.catfactCounter = 0;
        this.localStorageService.readStorage().then((value) => {
            // this.getBlobFromService();
            this.getCatfact();
            // this.getHttpResponseObjectFromService();
        });
    }
}


