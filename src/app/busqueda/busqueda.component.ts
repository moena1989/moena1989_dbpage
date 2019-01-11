import {Component, OnInit} from '@angular/core';
import {DbService} from '../services/db.service';
import {ToolsService} from '../_services/tools.service';
import {CurrentStorageService} from '../_services/current-storage.service';
import {Route, Router} from '@angular/router';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  act = false;

  /*
  En teoría, siempre se llegará a esta página cuando ya se halla encontrado un reloj, y deba proyectarse, el objeto buscado está en db
  TODO buscar una manera más opptima sin tener que guardarlo y traerlo de db.
   */
  constructor(public db: DbService, private tool: ToolsService, private currentStorage: CurrentStorageService, private router: Router) {
    console.log(this.currentStorage.relojDisponible);
    if (this.currentStorage.relojDisponible === undefined) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
  }

  cerrar() {
    this.currentStorage.relojDisponible = null;
  }
}
