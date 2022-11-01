import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {EmailComposer} from '@awesome-cordova-plugins/email-composer/ngx';
import {Camera} from '@awesome-cordova-plugins/camera/ngx';
import '@capacitor-community/camera-preview';
import {SettingsService} from './settings/settings.service';
import {IonicStorageModule} from '@ionic/storage-angular';
import {EmailService} from './services/email.service';
import {ResultsService} from './services/results.service';
import {File} from '@awesome-cordova-plugins/file/ngx';
import {CsvService} from './services/csv.service';
import {DecoderService} from './services/decoder.service';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(),
    IonicStorageModule.forRoot(),
    AppRoutingModule],
  providers: [{provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    EmailComposer,
    Camera,
    SettingsService,
    EmailService,
    ResultsService,
    File,
    CsvService,
    DecoderService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
