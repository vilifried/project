import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {StatusBar} from '@ionic-native/status-bar/ngx';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(private route: ActivatedRoute,
                private router: Router,
                private statusBar: StatusBar) {
        // let status bar not overlay webview
        this.statusBar.overlaysWebView(false);
        // set status bar to blue
        this.statusBar.backgroundColorByHexString('#3880ff');
    }

    navigateToCreateCatfact() {
        this.router.navigate(['/create-catfact', {}]);
    }
    navigateTolistCatfacts() {
        this.router.navigate(['/list-catfacts', {}]);
    }
}
