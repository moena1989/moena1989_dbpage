import {Injectable} from '@angular/core';
import {ClockModel} from '../models/clockModel';
import {DbMainService} from './routes/db-main.service';
import {DBPublicService} from './routes/d-b-public.service';

@Injectable({
  providedIn: 'root'
})
export class CurrentStorageService {
  /*CLASE ENCARGADA DE TENER TODAS LAS VARIABLES IMPORTANTES SIEMPRE ACTUALIZADAS */
  // about Watches
  partes: any = {};
  public modelos = [];
  public hebillas = [];
  public coronas = [];
  public caja = [];
  public maquinarias = [];
  public tapas = [];
  //
  public opcsEstadosTendencias = {publica: {nombre: 'Pública'}, privada: {nombre: 'Privada'}};
  relojDisponible: ClockModel;
  public cristales = [];
  public pulsos = [];
  public idiomas: any[];
  public cajas: any[];

  constructor(private dbMain: DbMainService, private dbPublic: DBPublicService) {
    // this.iniciar();
  }

  iniciar() {
    this.getModelos();
    this.getCoronas();
    this.getCristales();
    this.getHebillas();
    this.getPulsos();
    this.getTapas();
    this.getCajas();
    this.getMaquinarias();
    this.getIdiomas();
  }

  getModelos() {
    this.dbMain.getItems('modelos').subscribe(value => {
      this.modelos = value;
      console.log('modelo', this.modelos);
    });
  }

  getIdiomas() {
    this.dbPublic.getIdiomas().subscribe(value => {
      this.idiomas = value;
    });
  }

  getHebillas() {
    this.dbMain.getItems('hebillas').subscribe(value => {
      this.hebillas = value;
    });
  }

  getCoronas() {
    this.dbMain.getItems('coronas').subscribe(value => {
      this.coronas = value;
    });
  }

  getMaquinarias() {
    this.dbMain.getItems('maquinarias').subscribe(value => {
      this.maquinarias = value;
    });
  }

  getTapas() {
    this.dbMain.getItems('tapas').subscribe(value => {
      this.tapas = value;
    });
  }

  getCajas() {
    this.dbMain.getItems('cajas').subscribe(value => {
      this.cajas = value;
    });
  }


  getCristales() {
    this.dbMain.getItems('cristales').subscribe(value => {
      this.cristales = value;
    });
  }

  getPulsos() {
    this.dbMain.getItems('pulsos').subscribe(value => {
      this.pulsos = value;
    });
  }
}
