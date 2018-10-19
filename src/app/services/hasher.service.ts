import {Injectable} from '@angular/core';
import {Md5} from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class HasherService {


  constructor() {
  }

  encriptarSerial(serial: string): string {

    return String(Md5.hashStr(serial));
  }
}
