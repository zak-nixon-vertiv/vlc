import {AfterViewInit, Component} from '@angular/core';
import {SettingsService} from './settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements AfterViewInit{

  showAmps = false;
  showWatts = false;
  showVolts = false;
  showVoltAmps = false;
  showKiloVolts = false;
  collapseRows =  false;

  constructor(private settingsService: SettingsService) {
  }

  ngAfterViewInit() {
    this.settingsService.restoreSettings().then(result => {
      this.showAmps = this.settingsService.showAmps;
      this.showWatts = this.settingsService.showWatts;
      this.showVolts = this.settingsService.showVolts;
      this.showVoltAmps = this.settingsService.showVoltAmps;
      this.showKiloVolts = this.settingsService.showKiloVolts;
      this.collapseRows = this.settingsService.collapseRows;
    });
  }

  updateUnits(event,unit){
    const val = event.target.checked;
    console.log(`Updating unit: ${unit} to ${event.target.checked}`);

    if(unit === 'Amps') {this.showAmps = val;}
    else if(unit === 'Watts') {this.showWatts = val;}
    else if(unit === 'Volts') {this.showVolts = val;}
    else if(unit === 'VoltAmps') {this.showVoltAmps = val;}
    else if(unit === 'KiloVolts') {this.showKiloVolts = val;}
    else if(unit === 'CollapseRows') {this.collapseRows = val;}

    this.settingsService.updateUnits(unit,val);
  }

  ionViewWillLeave(){
    console.log('Leaving the settings page.');

    this.settingsService.updateUnits('Amps',this.showAmps);
    this.settingsService.updateUnits('Watts',this.showWatts);
    this.settingsService.updateUnits('Volts',this.showVolts);
    this.settingsService.updateUnits('VoltAmps',this.showVoltAmps);
    this.settingsService.updateUnits('KiloVolts',this.showKiloVolts);
    this.settingsService.updateUnits('CollapseRows',this.collapseRows);

    this.settingsService.saveSettings();
  }

  ionViewWillEnter(){
    this.settingsService.restoreSettings().then(result => {
        this.showAmps = this.settingsService.showAmps;
        this.showWatts = this.settingsService.showWatts;
        this.showVolts = this.settingsService.showVolts;
        this.showVoltAmps = this.settingsService.showVoltAmps;
        this.showKiloVolts = this.settingsService.showKiloVolts;
        this.collapseRows = this.settingsService.collapseRows;
    });

  }

}
