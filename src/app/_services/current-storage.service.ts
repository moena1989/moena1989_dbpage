import {Injectable} from '@angular/core';
import {ClockModel} from '../uploads/shared/clockModel';

@Injectable({
  providedIn: 'root'
})
export class CurrentStorageService {

  relojDisponible: ClockModel;

  constructor() {
  }
}
