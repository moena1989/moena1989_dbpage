import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {SettingsService} from '../../../services/settings.service';
import {CurrentStorageService} from '../../../services/current-storage.service';
import {DbMainService} from '../../../services/routes/db-main.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  err_msg = '';
  reloj: any = {};
  mostrarBusqueda = false;
  serial_bs = 'GH-ZQ9U4';

  /*
  En teoría, siempre se llegará a esta página cuando ya se halla encontrado un reloj, y deba proyectarse, el objeto buscado está en db
  TODO buscar una manera más opptima sin tener que guardarlo y traerlo de db.
   */
  constructor(
    public fs: DbMainService, private tools: SettingsService,
    public currentStorage: CurrentStorageService, private router: Router) {
  }

  buscarBySerial(serialIngresado: any) {
    // console.log(serial_ingresado);

    if (serialIngresado !== '') {
      this.fs.getReloj(serialIngresado).subscribe(result => {
        if (!result.data()) {
          console.log('ese reloj no existe');
          this.err_msg = 'Ese tal reloj no existe';
        } else {
          console.log('reloj encontrado ;)');
          // console.log(result);
          this.reloj = result.data();
          this.mostrarBusqueda = true;
        }
      });
    } else {
      console.log('no se escribió ningun serial');
      this.err_msg = 'No se ha escrito ningun serial';
    }
  }

  ngOnInit() {
    this.tools.tituloTopbar = 'Búsqueda';
  }

  cerrar() {
    this.serial_bs = '';
    this.mostrarBusqueda = false;
    this.currentStorage.relojDisponible = null;
  }
}
