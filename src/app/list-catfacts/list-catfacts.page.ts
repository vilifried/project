import {Component, OnInit} from '@angular/core';
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
    selector: 'app-list-catfacts',
    templateUrl: './list-catfacts.page.html',
    styleUrls: ['./list-catfacts.page.scss'],
})
export class ListCatfactsPage implements OnInit {

    localStorage: LocalStorageService;
    isAvatarList = true;
    starRatingArray = Array;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private localStorageService: LocalStorageService,
                private alertController: AlertController,
                private toastController: ToastController) {
        this.localStorage = localStorageService;
    }

    clearList() {
        this.localStorage.clearList();
        this.localStorage.readStorage();
        this.presentClearListToast();
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

    async presentClearListToast() {
        const toast = await this.toastController.create({
            message: 'List successfully deleted.',
            duration: 500,
            color: 'primary',
            position: 'top'
        });
        toast.present();
    }

    navigateToUpdateCatfact(parameter: number) {
        this.router.navigate(['/update-catfact', {itemId: parameter}]);
    }

    deleteArrayElement(itemId) {
        this.localStorage.deleteItem(itemId);
        this.presentDeleteToast();
    }

    async presentDeleteElementAlert(itemId) {
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
                        this.deleteArrayElement(itemId);
                    }
                }
            ]
        });
        await alert.present();
    }

    async presentDeleteToast() {
        const toast = await this.toastController.create({
            message: 'Cat Fact deleted.',
            duration: 500,
            position: 'top',
            color: 'primary'
        });
        toast.present();
    }

    switchListView() {
        this.isAvatarList = !this.isAvatarList;
    }


    getColor(rating: number) {
        switch (rating) {
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
        this.localStorage.readStorage();
    }
}

