import {Injectable} from '@angular/core';
import {EmailComposer} from '@awesome-cordova-plugins/email-composer/ngx';

@Injectable({
  providedIn: 'root',
})

export class EmailService {

  constructor(private emailComposer: EmailComposer){

  }

  sendResults(filePathOfResults: string){

    console.log('Sending email....');
    // Title is Vertiv-report-yy-mm-dd-hr-mm-sec.csv
    // Attaching a CSV file...
    const email = {
      to: '',
      attachments: [
        filePathOfResults
        // 'file://img/logo.png',
        // 'res://icon.png',
        // 'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        // 'file://README.pdf'
      ],
      subject: 'Vertiv Report',
      body: '',
      isHtml: true
    };
    this.emailComposer.open(email).then(result => {
      console.log('Message sent.');
    });
  }
}
