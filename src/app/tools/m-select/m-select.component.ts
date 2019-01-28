import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-m-select',
  templateUrl: './m-select.component.html',
  styleUrls: ['./m-select.component.css']
})
export class MSelectComponent implements OnInit {
  @Input() ttl = 'titulín';
  @Input() disable = false;
  current_opciones = [];
  m = 'sd';
  seleccionado = false;
  private _original_ops: any[];

  @Input() set opciones(opciones: any[]) {
// mostrar solo si existe
    this.current_opciones.length = 0;
    this._datoSeleccionado = undefined;
    this._original_ops = opciones;

    // console.log('cambian los valores');
    // console.log(opciones.length);
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

  @Output() alSeleccionar: EventEmitter<any> = new EventEmitter();

  @Input() set _datoSeleccionado(value: any) {
    if (value !== undefined) {
      console.error('sdkasdv000');
      console.log(value);
      this.seleccionado = true;
      // console.log('se selecciona una opción');
      this.alSeleccionar.emit(value);
      this.current_opciones = this._original_ops;
    } else {
      this.seleccionado = false;
    }
  }

  constructor() {
  }

  ngOnInit() {
  }
}
