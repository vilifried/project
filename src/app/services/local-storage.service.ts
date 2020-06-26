import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private _myCatfactList: Array<{ title: string, img: any, catfact: string }>;

    constructor(private storage: Storage) {
    }

    async readStorage() {
        await this.storage.get('localCatfactList').then((val) => {
            this._myCatfactList = val;
            if (this._myCatfactList === null) {
                this._myCatfactList = [];
                this.storage.set('localCatfactList', this._myCatfactList);
            }
            return this._myCatfactList;
        });
    }

    addItem(titleToAdd: string, imgToAdd: any, catfactToAdd: string) {
        this._myCatfactList.push({title: titleToAdd, img: imgToAdd, catfact: catfactToAdd});
        this.storage.set('localCatfactList', this._myCatfactList);
    }

    editItem(itemId: number, titleToEdit: string, imgToEdit: any, catfactToEdit: string) {
        this._myCatfactList[itemId].title = titleToEdit;
        this._myCatfactList[itemId].img = imgToEdit;
        this._myCatfactList[itemId].catfact = catfactToEdit;
        this.storage.set('localCatfactList', this._myCatfactList);
    }

    clearList() {
        this.storage.clear().then(r => console.log(r + 'cleared'));
        this.readStorage();
    }

    get myCatfactList(): Array<{ title: string; img: any; catfact: string }> {
        return this._myCatfactList;
    }

    deleteArrayElement(itemId: number) {
        const index: number = itemId;
        if (index !== -1) {
            this._myCatfactList.splice(index, 1);
        }
        this.storage.set('localCatfactList', this._myCatfactList);
    }
}
