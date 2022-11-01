import { Component } from '@angular/core';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import {Router} from '@angular/router';
import {EmailService} from '../services/email.service';
import {ResultsService} from '../services/results.service';
import {CsvService} from '../services/csv.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private emailService: EmailService,
              private resultsService: ResultsService,
              private csvService: CsvService,
              private router: Router) {}

  exportData(){
    this.resultsService.exportResults();
  }
  startScan(){
    this.router.navigate(['/scanner']);
  }
}
