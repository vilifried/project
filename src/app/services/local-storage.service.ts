import {Injectable} from '@angular/core';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

@Injectable({
    providedIn: 'root'
})
export class LocalStorageService {

    _itemList: Array<{ title: string, img: any, catfact: string, rating: number }>;

    constructor(private nativeStorage: NativeStorage) {
    }

    async readStorage() {
        await this.nativeStorage.getItem('localCatfactList').then(val => {
            this._itemList = val;
            if (this._itemList === null) {
                this._itemList = [];
                this.nativeStorage.setItem('localCatfactList', this._itemList);
            }
            return this._itemList;
        });
    }

    addItem(titleToAdd: string, imgToAdd: any, catfactToAdd: string, ratingToAdd: number) {
        console.log('PUSHED' + titleToAdd + catfactToAdd + ratingToAdd);
        this._itemList.push({title: titleToAdd, img: imgToAdd, catfact: catfactToAdd, rating: ratingToAdd});

        this.nativeStorage.setItem('localCatfactList', this._itemList).then(
            (data) => console.log('Item stored', data),
            error => console.error('Error storing item', error)
        );
    }

    updateItem(itemId: number, title: string, image: any, catfact: string, rating) {
        this._itemList[itemId].title = title;
        this._itemList[itemId].img = image;
        this._itemList[itemId].catfact = catfact;
        this._itemList[itemId].rating = rating;
        this.nativeStorage.setItem('localCatfactList', this._itemList).then(
            (data) => console.log('Item Stored', data),
            error => console.error('Error storing item', error)
        );
    }

    deleteItem(itemId: number) {
        const index: number = itemId;
        if (index !== -1) {
            this._itemList.splice(index, 1);
        }
        this.nativeStorage.setItem('localCatfactList', this._itemList).then(
            (data) => console.log('Item Stored', data),
            error => console.error('Error storing item', error)
        );
    }

    get itemList(): Array<{ title: string; img: any; catfact: string; rating: number }> {
        return this._itemList;
    }

    clearList() {
        this.nativeStorage.clear().then(r => console.log(r + 'cleared'));
        this.readStorage();
    }
}
