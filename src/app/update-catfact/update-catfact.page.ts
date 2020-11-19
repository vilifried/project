import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';

enum COLORS {
    GREY = '#E0E0E0',
    GREEN = '#66fd01',
    YELLOW = '#ffe802',
    RED = '#f80606'
}

@Component({
    selector: 'app-update-catfact',
    templateUrl: './update-catfact.page.html',
    styleUrls: ['./update-catfact.page.scss'],
})
export class UpdateCatfactPage implements OnInit {

    localStorage: LocalStorageService;

    imgUrl = 'https://api.thecatapi.com/v1/images/search?format=src';
    catImage: any;
    isImageLoading: boolean;

    catFactsUrl = 'https://catfact.ninja/fact?max_length=900';
    isCatFactLoading: boolean;

    itemId: number;
    catfactTitle: string;
    catfactText: string;

    showLoader: boolean;

    starRatingArray = Array;
    savedRating: number;
    @Input() updatedRating: number;
    @Output() ratingChange: EventEmitter<number> = new EventEmitter();

    isUpdatingRating = false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private localStorageService: LocalStorageService,
                private alertController: AlertController,
                private toastController: ToastController
    ) {
        if (this.route.snapshot.paramMap.get('itemId')) {
            this.itemId = Number(this.route.snapshot.paramMap.get('itemId'));
            this.localStorage = localStorageService;
        }
    }

    navigateTolistCatfacts() {
        this.router.navigate(['/list-catfacts', {}]);
    }

    navigateToMailForm(parameter: number) {
        this.router.navigate(['/mail-form', {itemId: parameter}]);
    }

    loadSingleCatfact() {
        this.catImage = this.localStorageService.itemList[this.itemId].img;
        this.catfactText = this.localStorageService.itemList[this.itemId].catfact;
        this.catfactTitle = this.localStorageService.itemList[this.itemId].title;
        this.savedRating = this.localStorageService.itemList[this.itemId].rating;
    }

    getBlobFromService() {
        this.showProgressBarHideImg();
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
        this.hideProgressBarShowImg();
    }

    getNextImage() {
        this.getBlobFromService();
    }

    // getHttpResponseObjectFromService() {
    //     this.isCatFactLoading = true;
    //     this.catfactService.getCatFact(this.catFactsUrl).subscribe(data => {
    //         this.createStringFromHttpResponseObject(data);
    //         this.isCatFactLoading = false;
    //     }, error => {
    //         this.isCatFactLoading = false;
    //         console.log(error);
    //     });
    // }
    //
    // createStringFromHttpResponseObject(response: HttpResponse<any>) {
    //     this.catfactText = response.body.fact;
    // }

    getNextCatFactText() {
        //   this.getHttpResponseObjectFromService();
    }

    showProgressBarHideImg() {
        this.catImage = null;
        this.showLoader = true;
    }

    hideProgressBarShowImg() {
        this.showLoader = false;
    }

    deleteArrayElement() {
        this.localStorage.deleteItem(this.itemId);
        this.presentDeleteToast().then(value => this.navigateTolistCatfacts());
    }

    async presentDeleteElementAlert() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Delete Cat Fact?',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: 'secondary',
                    handler: (blah) => {
                        console.log('Confirm Cancel: blah');
                    }
                }, {
                    text: 'Delete',
                    handler: () => {
                        this.deleteArrayElement();
                    }
                }
            ]
        });
        await alert.present();
    }

    async presentDeleteToast() {
        const toast = await this.toastController.create({
            message: 'Cat Fact deleted.',
            duration: 1000,
            position: 'top',
            color: 'primary',
        });
        toast.present();
    }

    saveCatFact() {
        this.localStorage.updateItem(this.itemId, this.catfactTitle, this.catImage, this.catfactText, this.updatedRating);
        this.presentSaveToast();
    }

    async presentSaveToast() {
        const toast = await this.toastController.create({
            message: 'Cat Fact saved.',
            duration: 1000,
            position: 'top',
            color: 'primary',
        });
        toast.present();
    }

    rate(index: number) {
        this.updatedRating = index;
        this.ratingChange.emit(this.updatedRating);
    }

    isAboveRating(index: number): boolean {
        return index > this.updatedRating;
    }

    getSavedColor(rating: number) {
        if (this.isAboveRating(rating)) {
            return COLORS.GREY;
        }
        switch (this.savedRating) {
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

    getUpdatedColor(rating: number) {
        if (this.isAboveRating(rating)) {
            return COLORS.GREY;
        }
        switch (this.updatedRating) {
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

    updateRating() {
        this.isUpdatingRating = true;
        this.updatedRating = 0;
    }

    ngOnInit() {
        this.localStorage.readStorage().then((value) => {
            this.loadSingleCatfact();
        });
    }
}
