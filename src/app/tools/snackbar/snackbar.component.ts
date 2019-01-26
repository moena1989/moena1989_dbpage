import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {
  msg = 'Bienvenido Andrés ;)';
  minimal_time = 3000;
  snacktive = false;
  color = {};
  tipo = 'adv';
  tittle: string;

  TIPO_SNACK = {
    DISPONIBLE: 'adv',
    ARMADO: 'ok',
    DAÑADO: 'error',
  };


  constructor() {
  }

  /*
  TODO Agregagr color dinamico, para identificar un mensaje positivo de uno negativo
   */

  ngOnInit() {
  }

  show(tittle: string, msg: string, type: string) {
    this.msg = msg;
    this.snacktive = true;
    this.tittle = tittle;
    this.tipo = type;

    //TODO OBLIGAR QUE EL TIPO SEA UNO DE LOS DISPONIBLES
    setTimeout(() => {
      this.snacktive = !this.snacktive;
      this.tipo = '';
      this.tittle = '';
      this.msg = '';
    }, 2000);
  }
}
