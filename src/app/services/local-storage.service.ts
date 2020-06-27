import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private _itemList: Array<{ title: string, img: any, catfact: string }>;

    constructor(private storage: Storage) {
    }

    async readStorage() {
        await this.storage.get('localCatfactList').then((val) => {
            this._itemList = val;
            if (this._itemList === null) {
                this._itemList = [];
                this.storage.set('localCatfactList', this._itemList);
            }
            return this._itemList;
        });
    }

    addItem(titleToAdd: string, imgToAdd: any, catfactToAdd: string) {
        this._itemList.push({title: titleToAdd, img: imgToAdd, catfact: catfactToAdd});
        this.storage.set('localCatfactList', this._itemList);
    }

    editItem(itemId: number, titleToEdit: string, imgToEdit: any, catfactToEdit: string) {
        this._itemList[itemId].title = titleToEdit;
        this._itemList[itemId].img = imgToEdit;
        this._itemList[itemId].catfact = catfactToEdit;
        this.storage.set('localCatfactList', this._itemList);
    }

    deleteItem(itemId: number) {
        const index: number = itemId;
        if (index !== -1) {
            this._itemList.splice(index, 1);
        }
        this.storage.set('localCatfactList', this._itemList);
    }

    get itemList(): Array<{ title: string; img: any; catfact: string }> {
        return this._itemList;
    }

    clearList() {
        this.storage.clear().then(r => console.log(r + 'cleared'));
        this.readStorage();
    }
}
