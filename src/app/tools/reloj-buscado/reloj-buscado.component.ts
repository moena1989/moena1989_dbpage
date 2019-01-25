import {Component, Input, OnInit} from '@angular/core';
import {ClockModel} from '../../_models/clockModel';

@Component({
  selector: 'app-reloj-buscado',
  templateUrl: './reloj-buscado.component.html',
  styleUrls: ['./reloj-buscado.component.css']
})
export class RelojBuscadoComponent implements OnInit {
  titles: string[] = [];
  reloj: any = {};
  url = '';

  // @Input() dataReloj ;
  @Input() set dataReloj(reloj: any) {
    console.log('i');
    console.log(reloj);
    this.titles = Object.keys(reloj['features']);
    this.reloj = reloj;
  }

  constructor() {

  }

  ngOnInit() {
    // console.log('Se inicio el reloj buscado');
    // console.log(this.dataReloj);
  }
}
