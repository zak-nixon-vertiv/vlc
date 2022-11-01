import {Injectable} from '@angular/core';
import {ScanResult} from '../entities/scanresult';
import {File} from '@awesome-cordova-plugins/file/ngx';
import {scan} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class CsvService {

  // eslint-disable-next-line @typescript-eslint/naming-convention
  CSV_FILE_NAME = 'temp.csv';

  // eslint-disable-next-line @typescript-eslint/naming-convention
  HEADERS;

  constructor(private file: File){
    this.constructHeaderCols();
  }
  constructHeaderCols(){
    this.HEADERS = ['Serial#','FrameDef','YYY-MM-DD-HH-MM-SS'];
    for(let i = 1; i < 7; i++){
      this.HEADERS.push(`${i} Volts`);
      this.HEADERS.push(`${i} Amps`);
      this.HEADERS.push(`${i} Watts`);
      this.HEADERS.push(`${i} VA`);
      this.HEADERS.push(`${i} kWh`);
    }
    for(let i = 1; i < 7; i++){
      this.HEADERS.push(`Breaker ${i}`);
    }
    this.HEADERS.push(`Total Watts`);
    this.HEADERS.push(`Total VA`);
    this.HEADERS.push(`Total kWh`);

  }

  constructCSVStr(scanResults: ScanResult){
    let csvStr = this.HEADERS.join(',');
    // add new line
    csvStr = csvStr.concat('\n');

    const lineData = [];
    scanResults.getEntries().map(entry => {
      lineData.push(entry.serialNumber);
      lineData.push(entry.frameDef);
      lineData.push(entry.date);
      lineData.push(entry.ipAddress);

      if(entry.breakerEntries) {
        entry.breakerEntries.map(breakerEntry => {
          lineData.push(breakerEntry.volts);
          lineData.push(breakerEntry.amps);
          lineData.push(breakerEntry.watts);
          lineData.push(breakerEntry.voltAmps);
          lineData.push(breakerEntry.kiloWatts);
        });
      }
      lineData.push(entry.totalWatts);
      lineData.push(entry.totalVA);
      lineData.push(entry.totalkWh);

      csvStr = csvStr.concat(lineData.join(','));
      csvStr = csvStr.concat('\n');
    });
    console.log(csvStr);
  }

  writeToCSV(scanResults: ScanResult): Promise<any>{
    return new Promise( (resolve,reject) => {
      const filePath = '';
      const csvStr = this.constructCSVStr(scanResults);
      resolve(csvStr);

      // this.file.writeFile(this.file.dataDirectory, this.CSV_FILE_NAME, csvStr, {replace: true}).then(result => {
      //   console.log('CSV has been written:' + result);
      //   resolve(result);
      // }).catch(err => {
      //   reject(err);
      // });
    });

  }

}
