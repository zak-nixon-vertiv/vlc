import {AfterContentInit, AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CameraPreview, CameraPreviewOptions, CameraPreviewPictureOptions} from '@capacitor-community/camera-preview';
import * as cv from '@techstark/opencv-js';

import * as Tesseract from 'tesseract.js';
// import * as Caman from 'caman';
//declare var Caman: any;
import {Router} from '@angular/router';
import {ResultsService} from '../services/results.service';
import {ScanBreakerEntry, ScanResult, ScanResultEntry} from '../entities/scanresult';
import {createWorker} from 'tesseract.js';
import {DecoderService} from '../services/decoder.service';
import {Platform} from '@ionic/angular';
//import Blur from 'gaussian-blur';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.page.html',
  styleUrls: ['./scanner.page.scss'],
})
export class ScannerPage implements OnInit, AfterViewInit {
  @ViewChild('imageCanvas') imageCanvas: ElementRef<HTMLCanvasElement>;

  language = 'lets';
  // language = 'letsgodigital';
  // language = '7seg';
  // language = 'ssd';
  //language = 'a';
  image = 'assets/0002_inverted.png';
  // image = 'assets/0300.jpeg';
  // image = 'assets/07A0_inverted.png';

  //image = 'assets/C0A8.png'; // 6088
  //image = 'assets/CEA3.png'; // 6683

  worker: Tesseract.Worker;

  cameraPreviewOpts: CameraPreviewOptions = {
    x: 0,
    y:  0,
    width: window.screen.width,
    height: window.screen.height,
    className:'preview',
    parent:'preview',
    enableHighResolution: true
  };
  imagePath;
  alteredImage;

  currentBrightnessValue = 1.0;
  filtersNeedApplying = true;
  workerReady = false;

  tesseract;

  public context: CanvasRenderingContext2D;
  private alteredImagePath: string;

  constructor(private router: Router,
              private resultsService: ResultsService,
              private decoderService: DecoderService,
              private platform: Platform) {
    this.imagePath = this.image;
    // this.loadWorker();


  }

  // async loadWorker(){
  //
  //   this.worker = Tesseract.createWorker({
  //     logger: progress => {
  //       // console.log(progress);
  //     },
  //     // langPath:'../lang-data'
  //
  //   });
  //
  //   await this.worker.load();
  //   await this.worker.loadLanguage('letsgodigital');
  //   //
  //   await this.worker.initialize('letsgodigital');
  //   await this.worker.setParameters({
  //     // eslint-disable-next-line @typescript-eslint/naming-convention
  //     tessedit_char_whitelist:'0123456789'
  //   });
  //   this.workerReady = true;
  // }
  ngAfterViewInit() {
    this.context = this.imageCanvas.nativeElement.getContext('2d');

    const imageFromCamera = new Image();
    this.imagePath = this.image;
    imageFromCamera.src = this.imagePath;
    this.alteredImagePath = this.imagePath;


    //blur.draw(2);
    // this.applyFiltersToImage(imageFromCamera);
    // imageFromCamera.onload = () => {
    //   const result = this.worker.recognize(imageFromCamera);
    //   console.log('Supposed to be recognizing something....');
    //   result.then(r => {
    //     console.log('Recognized something maybe..');
    //     const text = r.data;
    //     console.log(text);
    //   });

      // Tesseract.recognize(imageFromCamera,'eng',{
      //   langPath:'../lang-data'
      // }).then(result => {
      //   console.log('Result:' + result.data.text);
      // });
    // };


    const cameraPreviewPictureOptions: CameraPreviewPictureOptions = {
      quality: 100
    };

    // eslint-disable-next-line prefer-arrow/prefer-arrow-functions

    setInterval(() => {
      // CameraPreview.capture(cameraPreviewPictureOptions).then(pic => {
      //     console.log('Capturing image from camera..');
      //
      //
      //
      //
      //
      // });
      const imageToRecognize = new Image();
      imageToRecognize.src = this.alteredImagePath;

      //const blur = new Blur(this.imageCanvas.nativeElement, imageToRecognize);

      // let host = window.location.protocol + '//'
      //   + window.location.hostname
      //   + (window.location.port ? ':' + window.location.port : '')
      //   + '/';
      // host = '/';
      //
      // const workerPath = host + 'assets/lib/tesseract/v1/worker.js';
      // const corePath = host + 'assets/lib/tesseract/v1/tesseract-index.js';
      // const langPath = host + 'assets/lib/lang-data/tesseract-';
      // const tesseract = Tesseract.create({
      //   workerPath,
      //   corePath,
      //   langPath
      // });

      const path = this.path();

      console.log('Hello OcrProvider', path + 'assets/lib/tesseract.js-');

      this.tesseract = Tesseract.create({
        langPath: path + 'assets/lib/tesseract.js-',
        corePath: path + 'assets/lib/tesseract.js-core_0.1.0.js',
        workerPath: path + 'assets/lib/tesseract.js-worker_1.0.10.js',
      });

      // console.log("worker path:" + workerPath);
      // console.log("core path:" + corePath);
      // console.log("lang path:" + langPath);

      this.tesseract.recognize(imageToRecognize,this.language)
      .then(result => {
        console.log('Result:' + result.text);
        //cv.erode()
        const imgClone = imageToRecognize;
       // const eroded=  cv.erode(imageToRecognize,imageToRecognize)

      });
    }, 5000);

    // TEST FOR THE DECODER.
    const readings = ['HE30','1123'];
    const entry = this.decoderService.decode(readings);
    this.resultsService.storeResults(entry);

  }

  // erode() {
  //   let src = cv.matFromArray(this.image cv.CV_8UC4);
  //   cv.cvtColor(src, src, COLOR_RGBA2RGB.value);
  //
  //   var borderValue = cv.Scalar.all(Number.MAX_VALUE);
  //
  //   var erosion_type = cv.MORPH_RECT.value;
  //   var erosion_size = [2*1, 2*1];
  //   var element = cv.getStructuringElement(erosion_type, erosion_size, [-1, -1]);
  //   var dst = new cv.Mat();
  //   // cv.erode(src, dst, element, [-1, -1], 1, cv.BORDER_CONSTANT, borderValue);
  // }

  ngOnInit() {
    // CameraPreview.start(this.cameraPreviewOpts).then(pic => {
    // });
  }

  processResults(){
    const result = this.resultsService.getResults();

    const newEntry = new ScanResultEntry();
    newEntry.serialNumber = 'A3333';
    newEntry.ipAddress = '192.168.3.3';
    newEntry.date = new Date().toString();


    // Creating some circuit entries.
    newEntry.breakerEntries = [];

    const breakerEntry = new ScanBreakerEntry();
    breakerEntry.breakerNumber = 1;
    breakerEntry.kiloWatts = 10;
    newEntry.breakerEntries.push(breakerEntry);
    result.addEntry(newEntry);
    console.log('New scan entry was added.');
    this.router.navigate(['/results'], {state: {data:newEntry}});
  }

  applyFiltersToImage(image){
    this.context.filter = `brightness(${this.currentBrightnessValue/100.0})`;
    this.context.drawImage(image,0,0,this.imageCanvas.nativeElement.width,this.imageCanvas.nativeElement.height);
    // this.imagePath = this.imageCanvas.nativeElement.toDataURL('image/jpeg');
    this.alteredImagePath = this.imageCanvas.nativeElement.toDataURL('image/png');
  }

  updateBrightness(event){
    this.currentBrightnessValue = event.target.value;
    this.filtersNeedApplying = true;
    console.log(`Current brightness : ${this.currentBrightnessValue}`);
    const tempImage = new Image();
    tempImage.src = this.imagePath;
    this.applyFiltersToImage(tempImage);
  }

  private path(): string {
    if (this.platform.is('cordova')) {
      const href = window.location.href;

      const index1 = href.indexOf('#');

      const index2 = href.substr(0, index1).lastIndexOf('/');

      // This path works on iOS/Android native.
      return href.substr(0, index2 + 1);
    }

    // This path works in browser.
    return window.location.protocol + '//' + window.location.hostname
      + (window.location.port ? ':' + window.location.port : '')
      + '/';

    // This path works in simulator.
    // return '/android_assets/www/';
  }

}
