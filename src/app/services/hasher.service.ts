import {Injectable} from '@angular/core';
import Hash from 'hashids';


@Injectable({
  providedIn: 'root'
})
export class HasherService {
  constructor() {
  }

  encriptarSerial(salt: string, uniqWatchCounter: any, numberOfLot: number, numerOfCase: number): string {
    const hashids = new Hash('M89-' + salt, 5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789');
    return hashids.encode(uniqWatchCounter, numberOfLot, numerOfCase);
  }
}
