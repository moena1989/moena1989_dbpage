import {Component, OnInit} from '@angular/core';
import {HasherService} from '../services/hasher.service';
import {DbService} from '../services/db.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-nuevo-ingreso-reloj',
  templateUrl: './nuevo-ingreso-reloj.component.html',
  styleUrls: ['./nuevo-ingreso-reloj.component.css']
})
export class NuevoIngresoRelojComponent implements OnInit {
  /*/
  variables de seleccion
   */

  modelo: any = '';
  coleccion: any = '';
  material: any = '';
  maquinaria: any = '';
  color_maq: any = '';
  mat_pulso: any = '';
  madera: any = '';
  color_pulso: any = '';
  manos: any = '';
  lote: any = '';
  piezas: any = '';
  serial_raw: string;
  serial_md5: string;

  constructor(private hasher: HasherService, public db: DbService) {
  }

  ngOnInit() {
  }

  iniciarNuevoRegistro() {

    // se confirma que todos los datos fueron ingresados
    if (this.comprobarCampos()) {
      this.gestinarDatos();
    } else {
      console.log('Revisa todos los campos para poder continuar!');
    }
  }

  comprobarCampos(): boolean {
    console.log('Se comprueban los campos');
    if (this.modelo === null) {
      return false;
    }

    if (this.coleccion === '') {
      return false;
    }

    if (this.material === '') {
      return false;
    }

    if (this.maquinaria === '') {
      return false;
    }

    if (this.color_maq === '') {
      return false;
    }

    if (this.mat_pulso === '') {
      return false;
    }

    if (this.madera === '') {
      return false;
    }
    if (this.color_pulso === '') {
      return false;
    }
    return true;
  }

  private gestinarDatos() {
    this.serial_raw =
      this.manos.salt +
      this.lote.salt +
      this.piezas.salt +

      Math.round(Math.random() * 1000) +
      '-'
      +
      this.modelo.salt +
      this.coleccion.salt +
      this.material.salt +
      this.maquinaria.salt +
      this.color_maq.salt +
      this.mat_pulso.salt +
      this.madera.salt;

    // this.serial_md5 = this.hasher.encriptarSerial(this.serial_raw);
    console.log(this.serial_raw);
    this.serial_md5 = 'Pruebas  ';

    const date = formatDate(Date.now(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '-500');

    const relojData = {
      serial: this.serial_raw,
      ref_md: this.serial_md5,
      modelo: this.modelo.name,
      coleccion: this.coleccion.name,
      material_principal: this.material.name,
      maquinaria: this.maquinaria.name,
      color_maquinaria: this.color_maq.name,
      material_pulso: this.mat_pulso.name,
      madera: this.madera.name,
      fecha: date,
      lote: this.lote.name,
      piezas: this.piezas.name,
      manos: this.manos.name
    };

    console.log(relojData);
    this.db.subirNuevoRegistroReloj(relojData);
    console.log('probando en fb');
  }
}
