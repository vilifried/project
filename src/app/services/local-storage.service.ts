import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    myCatfactListList: Array<{ img: any, catfact: string }>;

    constructor(private storage: Storage) {
    }

    async readStorage() {
        await this.storage.get('localCatfactList').then((val) => {
            this.myCatfactListList = val;
            if (this.myCatfactListList === null) {
                this.myCatfactListList = [];
                this.storage.set('localCatfactList', this.myCatfactListList);
            }
        });
        return this.myCatfactListList;
    }

    addItem(imgToAdd: any, catfactToAdd: string) {
        this.myCatfactListList.push({img: imgToAdd, catfact: catfactToAdd});
        this.storage.set('localCatfactList', this.myCatfactListList);
    }

    editItem(itemId: number, imgToEdit: any, catfactToEdit: string) {
        this.myCatfactListList[itemId].img = imgToEdit;
        this.myCatfactListList[itemId].catfact = catfactToEdit;
        this.storage.set('localCatfactList', this.myCatfactListList);
    }


    clearList() {
        this.storage.clear().then(r => console.log(r + 'cleared'));
        this.readStorage();
    }
}
