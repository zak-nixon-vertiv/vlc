export class ScanResultEntry{
  serialNumber = 'TEMP SERIAL NUMBER';
  frameDef = 42;
  date = 'FAKE DATE';
  ipAddress = '0.0.0.0';
  breakerEntries: ScanBreakerEntry[];
  totalWatts = 0;
  totalVA = 0;
  totalkWh = 0;
}

export class ScanBreakerEntry{
  breakerNumber: number;
  volts: number;
  amps: number;
  watts: number;
  voltAmps: number;
  kiloWatts: number;
}

export class ScanResult{

  entries: ScanResultEntry[] = [];

  addEntry(entry){
    this.entries.push(entry);
    console.log(`Number of scan results:${this.entries.length}`);
  }

  clear(){
    this.entries = [];
  }

  getEntries(): ScanResultEntry[]{
    return this.entries;
  }

}
