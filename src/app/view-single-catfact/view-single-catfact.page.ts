import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';
import {AlertController, PopoverController, ToastController} from '@ionic/angular';
import {CatfactService} from '../services/catfact.service';
import {ImageService} from '../services/image.service';


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

    loadSingleCatfact() {
        this.catImage = this.localStorage.myCatfactList[this.itemId].img;
        this.catfactText = this.localStorage.myCatfactList[this.itemId].catfact;
        this.catfactTitle = this.localStorage.myCatfactList[this.itemId].title;
    }

    navigateToUpdatecatfact() {
        this.router.navigate(['/update-catfact', {itemId: this.itemId}]);
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

    showProgressBarHideImg() {
        this.catImage = null;
        this.showLoader = true;
    }

    hideProgressBarShowImg() {
        this.showLoader = false;
    }

    ngOnInit() {
        this.localStorage.readStorage().then((value) => {
            this.loadSingleCatfact();
        });
    }

    clearText() {
        this.catfactText = '';
    }

}

