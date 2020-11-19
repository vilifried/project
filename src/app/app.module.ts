import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';

import {HttpClientModule} from '@angular/common/http';
import {LocalStorageService} from './services/local-storage.service';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {HTTP} from '@ionic-native/http/ngx';
import {NativeStorage} from '@ionic-native/native-storage/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
    providers: [
        StatusBar,
        SplashScreen,
        LocalStorageService,
        NativeStorage,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        EmailComposer,
        HTTP,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
