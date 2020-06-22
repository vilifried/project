import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-view-single-catfact',
    templateUrl: './view-single-catfact.page.html',
    styleUrls: ['./view-single-catfact.page.scss'],
})
export class ViewSingleCatfactPage implements OnInit {

    localStorage: LocalStorageService;

    itemId: number;
    catfactTitle: string;
    catfactText: string;
    catImage: any;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private localStorageService: LocalStorageService,
                private alertController: AlertController,
                private toastController: ToastController) {
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

    ngOnInit() {
        this.localStorage.readStorage().then((value) => {
            this.loadSingleCatfact();
        });
    }
}

