import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from '../services/local-storage.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-mail-form',
    templateUrl: './mail-form.page.html',
    styleUrls: ['./mail-form.page.scss'],
})
export class MailFormPage implements OnInit {

    localStorage: LocalStorageService;
    form: FormGroup;
    itemId: number;
    catImage: any;
    catfactTitle: string;
    catfactText: string;

    constructor(private formBuilder: FormBuilder, public localStorageService: LocalStorageService, private route: ActivatedRoute,
                private router: Router) {
        this.form = this.formBuilder.group({
            'to': ['', Validators.required],
            'cc': ['', Validators.required],
            'bcc': ['', Validators.required],
            'subject': ['', Validators.required],
            'message': ['', Validators.required]
        });
        if (this.route.snapshot.paramMap.get('itemId')) {
            this.itemId = Number(this.route.snapshot.paramMap.get('itemId'));
            this.localStorage = localStorageService;
        }
    }

    loadSingleCatfact() {
        this.catImage = this.localStorageService.itemList[this.itemId].img;
        this.catfactText = this.localStorageService.itemList[this.itemId].catfact;
        this.catfactTitle = this.localStorageService.itemList[this.itemId].title;
    }

    navigateToUpdateCatfact(parameter: number) {
        this.router.navigate(['/update-catfact', {itemId: parameter}]);
        console.log(this.itemId);
    }

    sendMail() {
    }
    
    ngOnInit() {
        this.localStorage.readStorage().then((value) => {
            this.loadSingleCatfact();
        });
    }
}
