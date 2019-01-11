import {Component, Input, OnInit} from '@angular/core';
import {ClockModel} from '../uploads/shared/clockModel';

@Component({
  selector: 'app-reloj-buscado',
  templateUrl: './reloj-buscado.component.html',
  styleUrls: ['./reloj-buscado.component.css']
})
export class RelojBuscadoComponent implements OnInit {
  @Input() dataReloj: ClockModel;

  constructor() {
  }

  ngOnInit() {
    console.log('Se inicio el reloj buscado');
    console.log(this.dataReloj);
  }

}
