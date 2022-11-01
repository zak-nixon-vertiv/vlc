import {Injectable} from '@angular/core';
import {ScanResult, ScanResultEntry} from '../entities/scanresult';
import {File} from '@awesome-cordova-plugins/file/ngx';
import {CsvService} from "./csv.service";
import {EmailService} from "./email.service";

@Injectable({
  providedIn: 'root',
})

export class ResultsService {
  scanResults: ScanResult = new ScanResult();

  constructor(private file: File,
              private csvService: CsvService,
              private emailService: EmailService) {
  }

  storeResults(entry: ScanResultEntry){
    console.log('Results stored....');
    this.scanResults.addEntry(entry);
  }
  getResults(): ScanResult{
    return this.scanResults;
  }
  deleteResults(){
    console.log('Deleting all results...');
    this.scanResults = new ScanResult();
  }

  exportResults(){


    // Write the current results to CSV.
    this.csvService.writeToCSV(this.scanResults).then(result => {
      this.emailService.sendResults('');
    });

  }
}
