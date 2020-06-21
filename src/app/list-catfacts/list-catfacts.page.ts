import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AlertController, ToastController} from '@ionic/angular';

@Component({
    selector: 'app-list-catfacts',
    templateUrl: './list-catfacts.page.html',
    styleUrls: ['./list-catfacts.page.scss'],
})
export class ListCatfactsPage implements OnInit {

    myCatfactList: Array<{ title: string, img: any, catfact: string }>;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private localStorageService: LocalStorageService,
                private alertController: AlertController,
                private toastController: ToastController) {
    }

    clearList() {
        this.localStorageService.clearList();
        this.localStorageService.readStorage().then((value) => {
            this.myCatfactList = value;
        });
        this.presentToast();
    }

    async presentAlert() {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Delete all Cat Facts?',
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
                        this.clearList();
                    }
                }
            ]
        });
        await alert.present();
    }

    async presentToast() {
        const toast = await this.toastController.create({
            message: 'List successfully deleted.',
            duration: 2000
        });
        toast.present();
    }

    navigateToUpdateCatfact(parameter: number) {
        this.router.navigate(['/update-catfact', {itemId: parameter}]);
    }

    navigateToViewCatfact(parameter: number) {
        this.router.navigate(['/view-single-catfact', {itemId: parameter}]);
    }

    ngOnInit() {
        this.localStorageService.readStorage().then((value) => {
            this.myCatfactList = value;
        });
    }
}

