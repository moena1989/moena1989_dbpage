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

  modelo = '';
  coleccion = '';
  material = '';
  maquinaria = '';
  color_maq = '';
  mat_pulso = '';
  madera = '';
  color_pulso = '';
  manos = '';
  lote = '';
  piezas = '';

  serial_raw: string;
  serial_md5: string;

  constructor(private hasher: HasherService, public db: DbService) {
  }

  ngOnInit() {
  }

  iniciarNuevoRegistro() {

    // se confirma que todos los datos fueron ingresados
    if (this.comprobarCampos()) {

      this.organizarData();


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

  private organizarData() {
    this.serial_raw =
      this.manos +
      this.lote +
      this.piezas + '-' +
      this.modelo +
      this.coleccion +
      this.material +
      this.maquinaria +
      this.color_maq +
      this.mat_pulso +
      this.madera;
    this.serial_md5 = this.hasher.encriptarSerial(this.serial_raw);
    console.log(this.serial_raw);
    console.log(formatDate(Date.now(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '-500'));
  }
}
