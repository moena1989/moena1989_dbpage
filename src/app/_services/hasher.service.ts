import {Injectable} from '@angular/core';
import Hash from 'hashids';


@Injectable({
  providedIn: 'root'
})
export class HasherService {
  constructor() {
  }

  encriptarSerial(serial: any, lote: number, num_lote: number): string {
    // console.log('se intenta encriptar');
    const hashids = new Hash(serial, 5, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789');
    const id = hashids.encode(lote, num_lote);
    return id;
  }

}
