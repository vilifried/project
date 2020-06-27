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

    localStorage: LocalStorageService;
    isAvatarList = true;

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

    navigateToViewCatfact(parameter: number) {
        this.router.navigate(['/view-single-catfact', {itemId: parameter}]);
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

    ngOnInit() {
        this.localStorage.readStorage();
    }
}

