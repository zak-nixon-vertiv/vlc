import {AfterViewInit, Component} from '@angular/core';
import {Router} from '@angular/router';
import {ResultsService} from '../services/results.service';
import {ScanBreakerEntry, ScanResult, ScanResultEntry} from '../entities/scanresult';
import {EmailService} from "../services/email.service";
import {AlertController} from "@ionic/angular";
import {SettingsService} from "../settings/settings.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements AfterViewInit{

  result: ScanResultEntry;

  shouldCollapseRows;
  showAmps;
  showVolts;
  showWatts;
  showVA;
  showKWH;

  constructor(private router: Router,
              private resultsService: ResultsService,
              private emailService: EmailService,
              private alertController: AlertController,
              private settingsService: SettingsService) {

    this.result = new ScanResultEntry();
    this.result.serialNumber = 'A3333';
    this.result.ipAddress = '192.168.3.3';
    this.result.date = new Date().toString();

    this.result.breakerEntries = [];

    let e = new ScanBreakerEntry();
    e.kiloWatts = 2;
    e.breakerNumber = 1;
    this.result.breakerEntries.push(e);

    e = new ScanBreakerEntry();
    e.kiloWatts = 1;
    e.breakerNumber = 2;
    this.result.breakerEntries.push(e);

    console.log(`Number of breaker entries: ${this.result.breakerEntries.length}`);

    this.shouldCollapseRows = this.settingsService.collapseRows;
    this.showAmps = this.settingsService.showAmps;
    this.showVolts = this.settingsService.showVolts;
    this.showWatts = this.settingsService.showWatts;
    this.showVA = this.settingsService.showVoltAmps;
    this.showKWH = this.settingsService.showKiloVolts;

  }

  ngAfterViewInit(){
    const scanResultEntry = new ScanResultEntry();

    this.resultsService.storeResults(scanResultEntry);
  }

  openSettings() {
    this.router.navigateByUrl('/settings');
  }

  exportResults(){
    this.resultsService.exportResults();
  }

  async deleteResults(){
    let handlerMessage = '';
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete these scan results?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { handlerMessage = 'Alert canceled'; }
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => { handlerMessage = 'Alert confirmed'; }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();

    if(role === 'confirm') {
      this.resultsService.deleteResults();

      const successAlert = await this.alertController.create({
        header: 'Scan results have been successfully deleted.',
        buttons: [
          {
            text: 'OK',
            role: 'confirm',
            handler: () => { handlerMessage = ''; }
          }
        ]
      });

      await successAlert.present();
    }
  }
}
