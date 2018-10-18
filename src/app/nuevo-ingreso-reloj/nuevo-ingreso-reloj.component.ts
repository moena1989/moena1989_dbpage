import {Component, OnInit} from '@angular/core';
import {HasherService} from '../services/hasher.service';
import {DbService} from '../services/db.service';

@Component({
  selector: 'app-nuevo-ingreso-reloj',
  templateUrl: './nuevo-ingreso-reloj.component.html',
  styleUrls: ['./nuevo-ingreso-reloj.component.css']
})
export class NuevoIngresoRelojComponent implements OnInit {
  /*/
  variables de seleccion
   */

  modelo: any[] = [];
  coleccion: any[] = [];
  material: any[] = [];
  maquinaria: any[] = [];
  color_maq: any[] = [];
  mat_pulso: any[] = [];
  madera: any[] = [];
  color_pulso: any[] = [];
  serial_raw: string;

  manos: any[] = [];
  lote: any[] = [];
  piezas: any[] = [];

  constructor(private hasher: HasherService, public db: DbService) {
  }

  ngOnInit() {
  }

  iniciarNuevoRegistro() {

    // se confirma que todos los datos fueron ingresados
    if (this.comprobarCampos()) {
      this.hasher.createHashReloj();


      this.serial_raw =
        this.manos.salt +
        this.lote.salt +
        this.piezas.salt + '-' +
        this.modelo.salt +
        this.coleccion.salt +
        this.material.salt +
        this.maquinaria.salt +
        this.color_maq.salt +
        this.mat_pulso.salt +
        this.madera.salt;

      console.log(this.serial_raw);

    } else {
      console.log('Revisa todos los campos para poder continuar!');
    }
  }

  comprobarCampos(): boolean {
    console.log('Se comprueban los campos');
    if (this.modelo === null) {
      return false;
    }

    if (this.coleccion === null) {
      return false;
    }

    if (this.material === null) {
      return false;
    }

    if (this.maquinaria === null) {
      return false;
    }

    if (this.color_maq === null) {
      return false;
    }

    if (this.mat_pulso === null) {
      return false;
    }

    if (this.madera === null) {
      return false;
    }
    if (this.color_pulso === null) {
      return false;
    }
    return true;
  }
}
