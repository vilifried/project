import {Component, OnInit} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
    selector: 'app-list-catfacts',
    templateUrl: './list-catfacts.page.html',
    styleUrls: ['./list-catfacts.page.scss'],
})
export class ListCatfactsPage implements OnInit {

    myCatfactList: Array<{ img: any, catfact: string }>;

    constructor(private localStorageService: LocalStorageService) {
    }

    ngOnInit() {
        this.localStorageService.readStorage().then((value) => {
            this.myCatfactList = value;
        });
    }
}

