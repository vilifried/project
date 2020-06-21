import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    myCatfactList: Array<{ title: string, img: any, catfact: string }>;

    constructor(private storage: Storage) {
    }

    async readStorage() {
        await this.storage.get('localCatfactList').then((val) => {
            this.myCatfactList = val;
            if (this.myCatfactList === null) {
                this.myCatfactList = [];
                this.storage.set('localCatfactList', this.myCatfactList);
            }
        });
        return this.myCatfactList;
    }

    addItem(titleToAdd: string, imgToAdd: any, catfactToAdd: string) {
        this.myCatfactList.push({title: titleToAdd, img: imgToAdd, catfact: catfactToAdd});
        this.storage.set('localCatfactList', this.myCatfactList);
    }

    editItem(itemId: number, imgToEdit: any, catfactToEdit: string) {
        this.myCatfactList[itemId].img = imgToEdit;
        this.myCatfactList[itemId].catfact = catfactToEdit;
        this.storage.set('localCatfactList', this.myCatfactList);
    }

    clearList() {
        this.storage.clear().then(r => console.log(r + 'cleared'));
        this.readStorage();
    }
}
