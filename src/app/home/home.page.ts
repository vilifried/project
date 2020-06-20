import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private route: ActivatedRoute, private router: Router) {
    }

    navigateToCreateCatfact() {
        this.router.navigate(['/create-catfact', {}]);
    }

    navigateTolistCatfacts() {
        this.router.navigate(['/list-catfacts', {}]);
    }
}
