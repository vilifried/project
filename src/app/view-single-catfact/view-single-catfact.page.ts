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

    myCatfactList: Array<{ title: string, img: any, catfact: string }>;

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
        }
    }

    loadSingleCatfact() {
        this.localStorageService.readStorage().then((value) => {
            this.myCatfactList = value;
            this.catImage = value[this.itemId].img;
            this.catfactText = value[this.itemId].catfact;
            this.catfactTitle = value[this.itemId].title;
        });
    }

    ngOnInit() {
        this.localStorageService.readStorage().then((value) => {
            this.myCatfactList = value;
            this.loadSingleCatfact();
        });
    }

    navigateToUpdatecatfact() {
        this.router.navigate(['/update-catfact', {itemId: this.itemId}]);
    }
}
