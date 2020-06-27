import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';
import {AlertController, ToastController} from '@ionic/angular';
import {CatfactService} from '../services/catfact.service';
import {ImageService} from '../services/image.service';
import {HttpResponse} from '@angular/common/http';

@Component({
    selector: 'app-view-single-catfact',
    templateUrl: './view-single-catfact.page.html',
    styleUrls: ['./view-single-catfact.page.scss'],
})
export class ViewSingleCatfactPage implements OnInit {

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

    constructor(private route: ActivatedRoute,
                private router: Router,
                private localStorageService: LocalStorageService,
                private alertController: AlertController,
                private toastController: ToastController,
                private catfactService: CatfactService,
                private imageService: ImageService
    ) {
        if (this.route.snapshot.paramMap.get('itemId')) {
            this.itemId = Number(this.route.snapshot.paramMap.get('itemId'));
            this.localStorage = localStorageService;
        }
    }

    navigateTolistCatfacts() {
        this.router.navigate(['/list-catfacts', {}]);
    }

    loadSingleCatfact() {
        this.catImage = this.localStorage.itemList[this.itemId].img;
        this.catfactText = this.localStorage.itemList[this.itemId].catfact;
        this.catfactTitle = this.localStorage.itemList[this.itemId].title;
    }

    getBlobFromService() {
        this.showProgressBarHideImg();
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
        this.hideProgressBarShowImg();
    }

    getNextImage() {
        this.getBlobFromService();
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
        this.catfactText = response.body.fact;
    }

    getNextCatFactText() {
        this.getHttpResponseObjectFromService();
    }

    showProgressBarHideImg() {
        this.catImage = null;
        this.showLoader = true;
    }

    hideProgressBarShowImg() {
        this.showLoader = false;
    }

    clearText() {
        this.catfactText = '';
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
        this.localStorage.editItem(this.itemId, this.catfactTitle, this.catImage, this.catfactText);
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

    ngOnInit() {
        this.localStorage.readStorage().then((value) => {
            this.loadSingleCatfact();
        });
    }
}

