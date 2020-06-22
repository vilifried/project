import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
    selector: 'app-update-catfact',
    templateUrl: './update-catfact.page.html',
    styleUrls: ['./update-catfact.page.scss'],
})
export class UpdateCatfactPage implements OnInit {

    localStorage: LocalStorageService;
    itemId: number;
    catfactTitle: string;
    catfactText: string;
    catImage: any;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private localStorageService: LocalStorageService) {
        if (this.route.snapshot.paramMap.get('itemId')) {
            this.itemId = Number(this.route.snapshot.paramMap.get('itemId'));
            this.localStorage = localStorageService;
        }
    }

    loadSingleCatfact() {
        this.catImage = this.localStorage.myCatfactList[this.itemId].img;
        this.catfactText = this.localStorage.myCatfactList[this.itemId].catfact;
        this.catfactTitle = this.localStorage.myCatfactList[this.itemId].title;
    }

    navigateToViewCatfact(parameter: number) {
        this.router.navigate(['/view-single-catfact', {itemId: parameter}]);
    }

    ngOnInit() {
        this.localStorage.readStorage().then((value) => {
            this.loadSingleCatfact();
        });
    }
}
