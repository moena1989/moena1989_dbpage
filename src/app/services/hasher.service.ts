import {Injectable} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';
import Hash from 'hashids';


@Injectable({
  providedIn: 'root'
})
export class HasherService {
  constructor() {
  }

  encriptarSerial(serial: string, lote: number, num_lote: number): string {
    console.log('se intenta encriptar');
    const hashids = new Hash(serial, 4, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789');
    const id = hashids.encode(lote, num_lote);
    return id;
  }
}
