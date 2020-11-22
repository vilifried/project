import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {ToastController} from '@ionic/angular';
import {HTTP} from '@ionic-native/http/ngx';
import {DomSanitizer} from '@angular/platform-browser';

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

    imgUrl = 'https://api.thecatapi.com/v1/images/search';
    // imgUrl = 'https://api.thecatapi.com/v1/images/search?format=src';
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

    constructor(private localStorageService: LocalStorageService,
                private toastController: ToastController,
                private http: HTTP,
                protected sanitizer: DomSanitizer) {
    }

    getCatfactTextFromApi() {
        this.isCatFactLoading = true;
        this.http.sendRequest(this.catFactUrl,
            {
                method: 'get',
                responseType: 'json'
            }
        )
            .then(response => {
                // prints 200
                console.log('CATFACT ' + response.status);
                this.catfactText = response.data.fact;
                this.catfactCounter++;
            })
            .catch(response => {
                // prints 403
                console.log('CATFCT ERROR' + response.status);
                // prints Permission denied
                console.log(response.error);
            });
    }

    getImgUrlFromApi() {
        this.isCatFactLoading = true;
        this.http.sendRequest(this.imgUrl,
            {
                method: 'get',
                responseType: 'json',
                params: {image_type: 'jpg'},
                headers: {
                    'x-api-key': '752f82d2-0191-4b4b-be84-52016e41f618'
                }
            }
        )
            .then(response => {
                // prints 200
                console.log(response.status);
                console.log('RESP ' + response.data[0].url);
                const url = response.data[0].url;
                const fileExtension = url.substr(url.lastIndexOf('.') + 1);
                if (fileExtension === 'gif') {
                    this.getImgUrlFromApi();
                } else {
                    this.getImageFromApi(url);
                }
            })
            .catch(response => {
                // prints 403
                console.log(response.status);
                // prints Permission denied
                console.log(response.error);
            });
    }

    getImageFromApi(url) {
        this.showProgressBarHideCard();
        this.isImageLoading = true;
        this.http.sendRequest(url,
            {
                method: 'get',
                responseType: 'arraybuffer',
            }
        )
            .then(response => {
                // prints 200
                console.log(response.status);
                //     console.log('HEADERS ' + response.headers);
                this.arrayBufferToBase64(response.data);
                this.isImageLoading = false;
            })
            .catch(response => {
                // prints 403
                console.log(response.status);
                console.log('GET IMG ERROR');
                this.getImgUrlFromApi();
                // prints Permission denied
                console.log(response.error);
                this.isImageLoading = false;
            });
    }

    arrayBufferToBase64(response) {
        // Converts arraybuffer to typed array object
        const TYPED_ARRAY = new Uint8Array(response);
        // converts the typed array to string of characters
        const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
        // converts string of characters to base64String
        const base64String = btoa(STRING_CHAR);
        // sanitize the url that is passed as a value to image src attribute
        this.catImage = this.sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64, ' + base64String);
        this.hideProgressBarShowCard();
    }

    // arrayBufferToBase64(buffer) {
    //     let binary = '';
    //     const bytes = new Uint8Array(buffer);
    //     const len = bytes.byteLength;
    //     for (let i = 0; i < len; i++) {
    //         binary += String.fromCharCode(bytes[i]);
    //     }
    //     console.log(btoa(binary));
    //     return btoa(binary);
    // }

    // JS FileReader - listens to load-Event, returns base64-encoded image
    // createImageFromBlob(image: Blob) {
    //     console.log('READER');
    //     const reader = new FileReader();
    //     reader.addEventListener('load', () => {
    //         this.catImage = reader.result;
    //     }, false);
    //     if (image) {
    //         reader.readAsDataURL(image);
    //     }
    //     this.hideProgressBarShowCard();
    // }

    getNextItemFromService() {
        this.getCatfactTextFromApi();
        this.getImgUrlFromApi();
    }

    saveItem() {
        console.log('SAVE');
        if (this.rating === undefined) {
            this.rating = 0;
        }
        console.log('TEXT' + this.catfactTitle + this.catfactText);
        this.localStorageService.addItem(this.catfactTitle, this.catImage, this.catfactText, this.rating);
        console.log('CATIMG ');
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
            this.getCatfactTextFromApi();
            this.getImgUrlFromApi();
        });
    }
}


