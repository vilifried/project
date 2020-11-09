import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalStorageService} from '../services/local-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EmailComposer} from '@ionic-native/email-composer/ngx';

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

    constructor(private formBuilder: FormBuilder,
                public localStorageService: LocalStorageService,
                private route: ActivatedRoute,
                private router: Router,
                public composer: EmailComposer) {

        // Create a FormGroup object to implement validation on the template fields
        this.form = this.formBuilder.group({
            to: ['', Validators.required],
            cc: [''],
            bcc: [''],
            subject: ['', Validators.required],
            body: ['', Validators.required]
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
        // Retrieve the validated form fields
        const to: string = this.form.controls.to.value;
        const cc: string = this.form.controls.cc.value;
        const bcc: string = this.form.controls.cc.value;
        const subject: string = this.form.controls.subject.value;
        const body: string = this.form.controls.body.value;

        this.openEmailComposer(to, cc, bcc, subject, body);
    }

    openEmailComposer(to: string, cc: string, bcc: string, subject: string, body: string) {
        // Use the plugin isAvailable method to check whether
        // the user has configured an email account
        this.composer.isAvailable()
            .then((available: boolean) => {
                const email = {
                    to,
                    cc,
                    bcc: [bcc],
                    subject,
                    body,
                    isHtml: true
                };
                this.composer.open(email);
            }).catch((error: any) => {
            console.log('User does not appear to have device e-mail account');
            console.dir(error);
        });
    }

    ngOnInit() {
        this.localStorage.readStorage().then((value) => {
            this.loadSingleCatfact();
        });
    }
}
