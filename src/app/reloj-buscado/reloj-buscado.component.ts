import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-reloj-buscado',
  templateUrl: './reloj-buscado.component.html',
  styleUrls: ['./reloj-buscado.component.css']
})
export class RelojBuscadoComponent implements OnInit {
  @Input() dataReloj: any;

  constructor() {
  }

  ngOnInit() {
    console.log('Se inicio el reloj buscado');
    console.log(this.dataReloj);
  }

}
