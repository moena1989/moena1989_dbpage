import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {DbService} from '../../_services/db.service';
import {ToolsService} from '../../_services/tools.service';
import {CurrentStorageService} from '../../_services/current-storage.service';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {

  /*
  En teoría, siempre se llegará a esta página cuando ya se halla encontrado un reloj, y deba proyectarse, el objeto buscado está en db
  TODO buscar una manera más opptima sin tener que guardarlo y traerlo de db.
   */
  constructor(public db: DbService, private tool: ToolsService, public currentStorage: CurrentStorageService, private router: Router) {
    // console.log(this.currentStorage.relojDisponible);
    // if (this.currentStorage.relojDisponible === undefined) {
    //   this.router.navigate(['/']);
    // }
    //
  }

  ngOnInit() {
  }

  cerrar() {
    this.currentStorage.relojDisponible = null;
  }
}
