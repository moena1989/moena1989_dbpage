import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-m-select',
  templateUrl: './m-select.component.html',
  styleUrls: ['./m-select.component.css']
})
export class MSelectComponent implements OnInit {
  @Input() ttl = 'titulín';
  @Input() disable = false;
  default = {nombre: '------'};
  current_opciones = [];
  m = 'sd';
  seleccionado = false;
  @Output() alSeleccionar: EventEmitter<any> = new EventEmitter();
  private _original_ops: any[];

  constructor() {
  }

  @Input() set items(opciones: any[]) {
    this.current_opciones.length = 0;
    this._original_ops = [];
    if (opciones !== undefined) { // existe data
      this.current_opciones = opciones;
      // si solamente tiene una selección entonces que sea la predeterminada
      if (opciones.length === 1) {
        // console.log('se selecciona autamaticamente');
        this.seleccionado = true;
        this.alSeleccionar.emit(opciones[0]);
      }
    }
  }


  @Input() set itemSeleccionado(value: any) {
    if (value !== undefined) {
      this.seleccionado = true;
      this.alSeleccionar.emit(value);
      this.default = value;
      // this.current_opciones = this._original_ops;
    } else {
      this.seleccionado = false;
    }
  }

  ngOnInit() {
  }
}
