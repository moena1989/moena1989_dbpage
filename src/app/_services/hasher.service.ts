import {Injectable} from '@angular/core';
import Hash from 'hashids';
import {DbManagerFirestoreService} from '../db-manager-firestore.service';


@Injectable({
  providedIn: 'root'
})
export class HasherService {
  constructor() {
  }

  encriptarSerial(modelo: string, uniqNum: number, numeroLote: number, numeroDeCaja: number): string {
    // console.log('se intenta encriptar');
    const hashids = new Hash('M89-A7iFhVtuM0ejwHXIsSLj-' + modelo, 5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789');
    return hashids.encode(uniqNum, numeroLote, numeroDeCaja);
  }
}
