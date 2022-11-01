import {Injectable} from '@angular/core';
import {ScanResultEntry} from '../entities/scanresult';

@Injectable({
  providedIn: 'root',
})

export class DecoderService {

constructor() {

}


decode(readings: string[]): ScanResultEntry{
  const entry = new ScanResultEntry();


  return entry;
}


}
