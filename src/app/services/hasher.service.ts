import {Injectable} from '@angular/core';
import Hash from 'hashids';


@Injectable({
  providedIn: 'root'
})
export class HasherService {
  constructor() {
  }

  static createWatchCode(salt: string, uniqWatchCounter: any, numberOfLot: number, numerOfCase: number): string {
    const hashids = new Hash('M89-' + salt, 5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789');
    return hashids.encode(uniqWatchCounter, numberOfLot, numerOfCase);
  }

  static createUserCode(uniqueUserCounters: any): string {
    const hashids = new Hash('M89-USERS', 5, '0123456789cfhistuCFHISTU');
    return hashids.encode(uniqueUserCounters);
  }
}
