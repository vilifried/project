import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage.service';

@Component({
    selector: 'app-update-catfact',
    templateUrl: './update-catfact.page.html',
    styleUrls: ['./update-catfact.page.scss'],
})
export class UpdateCatfactPage implements OnInit {

    itemId: number;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private localStorageService: LocalStorageService) {
        if (this.route.snapshot.paramMap.get('itemId')) {
            this.itemId = Number(this.route.snapshot.paramMap.get('itemId'));
        }
    }

    navigateToViewCatfact(parameter: number) {
        this.router.navigate(['/view-single-catfact', {itemId: parameter}]);
    }

    ngOnInit() {
    }

}
