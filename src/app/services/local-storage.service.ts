import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    private _itemList: Array<{ title: string, img: any, catfact: string, rating: number }>;

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

    addItem(titleToAdd: string, imgToAdd: any, catfactToAdd: string, ratingToAdd) {
        this._itemList.push({title: titleToAdd, img: imgToAdd, catfact: catfactToAdd, rating: ratingToAdd});
        this.storage.set('localCatfactList', this._itemList);
    }

    updateItem(itemId: number, title: string, image: any, catfact: string, rating) {
        this._itemList[itemId].title = title;
        this._itemList[itemId].img = image;
        this._itemList[itemId].catfact = catfact;
        this._itemList[itemId].rating = rating;
        this.storage.set('localCatfactList', this._itemList);
    }

    deleteItem(itemId: number) {
        const index: number = itemId;
        if (index !== -1) {
            this._itemList.splice(index, 1);
        }
        this.storage.set('localCatfactList', this._itemList);
    }

    get itemList(): Array<{ title: string; img: any; catfact: string; rating: number }> {
        return this._itemList;
    }

    clearList() {
        this.storage.clear().then(r => console.log(r + 'cleared'));
        this.readStorage();
    }
}
