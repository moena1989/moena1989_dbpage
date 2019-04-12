import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {ToolsService} from '../../../services/tools.service';
import {DBPublic} from '../../../services/routes/d-b-public.service';
import {CurrentStorageService} from '../../../services/current-storage.service';

@Component({
  selector: 'app-tipos-tendencias-page',
  templateUrl: './temporadas-reloj.component.html',
  styleUrls: ['./temporadas-reloj.component.scss']
})
export class TemporadasRelojComponent implements OnInit {
  @ViewChild('mdNuevaTendencia') modalTendencia: NgxSmartModalComponent;
  @ViewChild('mdNuevaColeccion') modalColeccion: NgxSmartModalComponent;
  @ViewChild('mdNuevaConfiguracion') modalConfiguraciones: NgxSmartModalComponent;
  public esEditable = true;
  tendenciaSeleccionada = undefined;
  //
  nuevaColeccion: any = {};
  nuevaTendencia: any = {};
  nuevaConfiguracion: any = {};
  //
  public tendencias: any[] = [];
  public colecciones: any[] = [];
  public tipoProducto = 'relojes';
  public coleccionSeleccionada: any;
  private configuraciones: any[] = [];
  private modelos: any[] = [];
  private relojData: CurrentStorageService;
  private _tendenciaSeleccionada: any = {};
  private _coleccionSeleccionada: any = {};

  constructor(private route: ActivatedRoute,
              private db: DBPublic, private tools: ToolsService, public currentStorageService: CurrentStorageService) {
    route.params.subscribe(params => {
      this.tipoProducto = params.tipoProductoSeleccionado;
      this.relojData = currentStorageService;
      console.log(this.relojData.modelos);
    });
  }


  ngOnInit() {
    this.tools.tituloTopbar = 'Temporadas';
    this.getTendencias();
  }

  getTendencias() {
    this.db.getTemporadas(this.tipoProducto).subscribe(value => {
      this.tendencias = [];
      if (value !== undefined) {
        value.forEach(result => {
          this.tendencias.push(result);
        });
        console.log('y pos aja');
        console.log(this.tendencias);
        // selecciono la primera de forma predeterminada
        this.seleccionarTendencia(this.tendencias[0]);
      } else {
        console.log('no existen tendencias');
      }
    });
  }

  getConfiguraciones(tipoProducto: string) {
    // this.db.getTemporadas(tipoProducto)
    //   .subscribe(value => {
    //     this.tendencias = [];
    //     // console.log(value);
    //     if (value !== undefined) {
    //       value['tendencias'].forEach(result => {
    //           this.tendencias.push({nombre: result.nombre});
    //         }
    //       );
    //     }
    //   });
  }


  seleccionarColeccion(coleccionSeleccionada) {
    this.coleccionSeleccionada = coleccionSeleccionada;
    this._coleccionSeleccionada = Object.assign({}, coleccionSeleccionada);
    // console.log(coleccionSeleccionada);
    this.db.getConfiguracionesReloj(this.tipoProducto, this.tendenciaSeleccionada, this.coleccionSeleccionada).subscribe(value => {
        this.configuraciones = value;
        console.log(value);
      }
    );
  }

  seleccionarTendencia(tendenciaSeleccionada: any) {
    this.tendenciaSeleccionada = tendenciaSeleccionada;
    this._tendenciaSeleccionada = Object.assign({}, tendenciaSeleccionada);
    this.configuraciones = [];
    this.colecciones = [];
    this.db.getColecciones(this.tipoProducto, tendenciaSeleccionada).subscribe(value => {
      this.colecciones = [];
      // console.log(this.tendenciaSeleccionada);
      if (value) {
        this.colecciones = value;
        this.seleccionarColeccion(value[0]);
      }
    });
  }

  pushNuevaConfiguracion() {
    this.db.setConfiguracionReloj(this.tipoProducto, this.tendenciaSeleccionada,
      this.coleccionSeleccionada, this.nuevaConfiguracion).then(value => {
      console.log('se sube configuración de reloj ;)');
      this.modalConfiguraciones.close();
    });
  }

  pushTemporada(tendencia: any) {
    this.db.setTemporada(this.tipoProducto, tendencia).then(value => {
      this.modalTendencia.close();
    });
    this.getTendencias();
  }

  actualizarTemporada(tendencia: any) {
    this.db.updateTemporada(this.tipoProducto, tendencia).then(value => {
      this.modalTendencia.close();
    });
    this.getTendencias();
  }

  pushNuevaColeccion() {
    this.db.setColeccion(this.tipoProducto, this.tendenciaSeleccionada, this.nuevaColeccion).then(value => {
      console.log('se sube colección ;)');
      this.modalColeccion.close();
    });
  }

  actualizarColeccion(coleccionSeleccionada: any) {
    this.db.updateColeccion(this.tipoProducto, this.tendenciaSeleccionada, coleccionSeleccionada).then(value => {
      console.log('colección actualizada');
    });
  }
}
