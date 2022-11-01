import {AfterViewInit, Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class SettingsService{

  showAmps = true;
  showWatts = true;
  showVolts = true;
  showVoltAmps = true;
  showKiloVolts = true;
  collapseRows = true;

  constructor(private storage: Storage) {
    this.restoreSettings();
  }


  async updateUnits(unit, value){
    switch(unit){
      case 'Amps': this.showAmps = value; break;
      case 'Watts': this.showWatts = value; break;
      case 'Volts': this.showVolts = value; break;
      case 'VoltAmps': this.showVoltAmps = value; break;
      case 'KiloVolts': this.showKiloVolts = value; break;
      case 'CollapseRows': this.collapseRows = value; break;
      default: break;
    }

  }
  async saveSettings(){
    await this.storage.set('amps', Boolean(this.showAmps).toString());
    await this.storage.set('watts', Boolean(this.showWatts).toString());
    await this.storage.set('volts', Boolean(this.showVolts).toString());
    await this.storage.set('voltAmps', Boolean(this.showVoltAmps).toString());
    await this.storage.set('kiloVolts', Boolean(this.showKiloVolts).toString());
    await this.storage.set('collapseRows', Boolean(this.collapseRows).toString());

  }
  async restoreSettings(){
    this.showAmps =  await this.storage.get('amps');
    // @ts-ignore
    this.showAmps = (this.showAmps === 'true');

    this.showWatts =  await this.storage.get('watts');
    // @ts-ignore
    this.showWatts = (this.showWatts === 'true');

    this.showVolts = await this.storage.get('volts');
    // @ts-ignore
    this.showVolts = (this.showVolts === 'true');

    this.showVoltAmps = await this.storage.get('voltAmps');
    // @ts-ignore
    this.showVoltAmps = (this.showVoltAmps === 'true');

    this.showKiloVolts =  await this.storage.get('kiloVolts');
    // @ts-ignore
    this.showKiloVolts = (this.showKiloVolts === 'true');

    this.collapseRows =  await this.storage.get('collapseRows');
    // @ts-ignore
    this.collapseRows = (this.collapseRows === 'true');
  }

}
