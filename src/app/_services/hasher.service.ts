import {Injectable} from '@angular/core';
import Hash from 'hashids';
import {DbManagerFirestoreService} from '../db-manager-firestore.service';


@Injectable({
  providedIn: 'root'
})
export class HasherService {
  constructor(afs: DbManagerFirestoreService) {
  }

  encriptarSerial(serial: any, lote: number, num_lote: number): string {
    // console.log('se intenta encriptar');
    const hashids = new Hash('M89-A7iFhVtuM0ejwHXIsSLj', 5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789');
    return hashids.encode(lote, num_lote);
  }
}
