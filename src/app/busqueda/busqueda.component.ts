import {Component, OnInit} from '@angular/core';
import {DbService} from '../services/db.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit {
  rj: any;

  /*
  En teoría, siempre se llegará a esta página cuando ya se halla encontrado un reloj, y deba proyectarse, el objeto buscado está en db
  TODO buscar una manera más opptima sin tener que guardarlo y traerlo de db.
   */
  constructor(public db: DbService) {
  }

  ngOnInit() {
    this.rj = this.db.relojBuscado;

  }

}
