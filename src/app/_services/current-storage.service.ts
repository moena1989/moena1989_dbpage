import {Injectable} from '@angular/core';
import {ClockModel} from '../_models/clockModel';

@Injectable({
  providedIn: 'root'
})
export class CurrentStorageService {

  relojDisponible: ClockModel;

  constructor() {
  }
}
