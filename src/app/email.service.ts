import {Injectable} from '@angular/core';
import {EmailComposer} from '@ionic-native/email-composer/ngx';

@Injectable({
    providedIn: 'root'
})
export class EmailService {

    constructor(private emailComposer: EmailComposer) {
    }

    sendEmail(to: string,
              cc: string,
              bcc: string,
              // attachment: string,
              subject: string,
              body: string): void {
        // Use the plugin isAvailable method to check whether
        // the user has configured an email account
        this.emailComposer.isAvailable()
            .then((available: boolean) => {

                // Check that plugin has been granted access permissions to
                // user's e-mail account
                this.emailComposer.hasPermission()
                    .then((isPermitted: boolean) => {

                        // Define an object containing the
                        // keys/values for populating the device
                        // default mail fields when a new message
                        // is created
                        let email: any = {
                            app: 'mailto',
                            to: to,
                            cc: cc,
                            bcc: bcc,
                            // attachments: [
                            //     attachment
                            // ],
                            subject: subject,
                            body: body
                        };

                        // Open the device e-mail client and create
                        // a new e-mail message populated with the
                        // object containing our message data
                        this.emailComposer.open(email);
                    })
                    .catch((error: any) => {
                        console.log('No access permission granted');
                        console.dir(error);
                    });
            })
            .catch((error: any) => {
                console.log('User does not appear to have device e-mail account');
                console.dir(error);
            });
    }

}

