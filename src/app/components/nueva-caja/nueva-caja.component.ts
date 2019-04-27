import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {DbMainService, MCaja, MetaLote} from '../../services/routes/db-main.service';
import {DbManagerService} from '../../services/db-manager.service';
import {SettingsService} from '../../services/settings.service';
import {CajaM, ModelsSevice} from '../../services/models/model-cajas.service';
import {MetadataAttr} from '../../models/clockModel';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-nueva-caja',
  templateUrl: './nueva-caja.component.html',
  styleUrls: ['./nueva-caja.component.scss']
})
export class NuevaCajaComponent implements OnInit, OnDestroy {
  lote_iniciado = false;
  // nuevo_lote = new LoteCajaModel();
  current_opciones_caja_modelo: CajaM = new CajaM();

  currentLote: any = {};
  // currentLote: MLote = new MLote();
  imagenesProcesadas: any[] = [];
  imas_selected = false;
  msg_img = 'Presiona en esta área para seleccionar las imagenes';
  imagenes_finalizadas = false;
  stat = '';
  @ViewChild('modalAlert') modalAlert: NgxSmartModalComponent;
  @ViewChild('modalSubiendo') modalSubiendo: NgxSmartModalComponent;
  @ViewChild('modalResult') modalResult: NgxSmartModalComponent;
  porcentaje_registro: any = 0;
  private _info_material: Subscription;

  constructor(public estructura: ModelsSevice, public db: DbManagerService,
              private tools: SettingsService, public fs: DbMainService) {
    this.currentLote.numeroDeLote = 0;
    this.tools.top_tittle = 'Nueva caja';
  }

  ngOnInit() {
    this.tools.tituloTopbar = 'Nueva Caja';
    this.currentLote.sales = ['', '', ''];
  }

  buscarLoteActual() {
    this._info_material =
      this.db.buscar_info_lote(this.currentLote.modelo).subscribe(value => {
        if (value) {
          console.log('si hay numeroDeLote ;)');
          this.currentLote.numeroDeLote = +value['numeroDeLote'] + 1; // TODO revisar cómo reconocer numeroDeLote en value
        } else {
          console.log('no existe información de esa busqueda');
          // se inicia la primera información
          const meta = new MetadataAttr();
          meta.fechaRegistro = Date();
          meta.numeroDeLote = 0;
          meta.idUltimoLote = 'null';
          console.log(meta);
          this.db.set_informacion(this.currentLote.modelo, meta);
        }
      });
  }

  seleccionarDiametroInterno(itemSeleccionado: any) {
    this.currentLote.diametroInterno = itemSeleccionado.name;
    this.buscarLoteActual();
    this.currentLote.sales[2] = itemSeleccionado.salt;
    console.log(this.currentLote.sales);
  }

  iniciarRegistro() {
    console.log('iniciando registro de nueva caja');
    // interacción con los alerts
    this.modalAlert.close();
    this.modalSubiendo.open();
    //
    const salesBase = this.currentLote.sales.join('');
    const salesMateriales = this.currentLote.salesMateriales.join('');
    //
    this.porcentaje_registro = 5;
    //
    this.currentLote.id = this.fs.getNewKey();
    this.currentLote.cajasTotales = this.imagenesProcesadas.length;
    this.currentLote.idsCajas = [];
    this.currentLote.fechaCreacion = new Date();
    this.currentLote.fechaUltimaModificacion = new Date();
    this.currentLote.serial = this.currentLote.sales.join('') + '-' + this.currentLote.salesMateriales.join('');
    this.currentLote.serialMaterial = this.currentLote.salesMateriales.join('');
    //
    this.currentLote.serialUltimoLote = this.currentLote.sales.join('') + '-' + this.currentLote.salesMateriales.join('');
    // crea las cajas
    console.log('inicia subida de cajas');
    // primero actualizo la información del lote.
    // this.currentLote.serialesCajas = serialesCajas;
    this.porcentaje_registro = 10;
    this.currentLote.fechaCreacion = new Date();
    this.currentLote.fechaUltimaModificacion = new Date();
    console.log(this.currentLote.sales.join(''));
    //
    const metaLote: MetaLote = {
      idUltimoEmpleado: this.tools.gUser.uid,
      fechaUltimoRegistro: new Date(),
      // serialUltimoLote: this.currentLote.serial,
      lotesTotales: 0, // se buscará el correspondiente y se remplazará
      cajasTotales: this.currentLote.cajasTotales
    };
    this.porcentaje_registro = 20;
// ACTUALIZO LA METADATA DEL LOTE PARA OBTENER EL CONTADOR
    const serialesCajas = [];
    const contadorFinalizados = [];
    this.fs.updateMetadataLote(salesBase, salesMateriales, metaLote, (metadataLote) => {
      this.porcentaje_registro = 25;
      this.currentLote.serial += '-' + metadataLote.lotesTotales;

      for (let i = 0; i < this.currentLote.cajasTotales; i++) {
        // INICIO SUBIENDO LA IMAGEN DE CADA CAJA...
        const serialCaja = (this.currentLote.serial + '-' + (i + 1));
        serialesCajas.push(serialCaja);
        this.fs.pushImage(this.imagenesProcesadas[i], 'cajas/' + serialCaja, url => {
          // se crea modelo  de cada caja
          console.log('se completa subida de imagen');
          this.porcentaje_registro += 35 / this.currentLote.cajasTotales;
          //
          const caja: MCaja = {
            numeroDeCaja: i + 1,
            numeroDeLote: metadataLote.lotesTotales,
            modelo: this.currentLote.modelo,
            estado: this.estructura.ESTADOS_CAJA.DISPONIBLE,
            materiales: this.currentLote.materiales,
            diametroInterno: this.currentLote.diametroInterno,
            diametroExterno: this.currentLote.diametroExterno,
            fechaCreacion: new Date(),
            fechaUltimaModificacion: new Date(),
            serial: serialCaja,
            serialLote: this.currentLote.serial,
            serialMaterial: this.currentLote.serialMaterial,
            urlImagen: url,
          };
          // se inicia subiendo las imagenes de cada caja
          console.log('se inicia subida de caja');
          this.fs.pushCaja(caja.serial, caja).then((value) => {
            console.log('se sube información caja');
            contadorFinalizados.push(true);
            if (contadorFinalizados.length === this.imagenesProcesadas.length) {
              this.porcentaje_registro += 35 / this.currentLote.cajasTotales;
              // Ha finalizado todas las cajas :D
              // FINALMENTE SUBO EL REGISTRO DEL LOTE
              this.currentLote.serialesCaja = serialesCajas;
              this.fs.pushLote(this.currentLote.serial, this.currentLote).then(value1 => {
                this.porcentaje_registro = 100;
                setTimeout(() => {
                  this.modalSubiendo.close();
                  this.modalResult.open();
                }, 1000);
              });
            }
          });
        });
      }
    });
  }

  seleccionarTotalCajas(itemSeleccionado: string) {
    this.currentLote.cajasTotales = +itemSeleccionado;
  }

  ngOnDestroy(): void {
  }

  seleccionarModeloCaja(_modelo: any) {
    this.currentLote.modelo = _modelo.name;
    this.current_opciones_caja_modelo = _modelo.opciones_caja;
    this.current_opciones_caja_modelo = _modelo.opciones_caja;
    // inico el tam de los materiales, y lo reinició por si cambia de opción
    const arr = [];
    const arrs = [];
    this.current_opciones_caja_modelo.materiales.forEach(value => {
      arr.push('');
      arrs.push('');
    });
    this.currentLote.materiales = arrs;
    this.currentLote.salesMateriales = arr;
    this.currentLote.sales[0] = _modelo.salt;
  }

  seleccionarDiametroExterno(_diametro_interno: any) {
    this.currentLote.diametroExterno = _diametro_interno.name;
    this.currentLote.sales[1] = _diametro_interno.salt;
    console.log(this.currentLote.sales);
  }

  alSeleccionarImagenes(files: []) {
    this.msg_img = '...';
    const TOTAL_FILES = files.length;
    this.imagenesProcesadas = [];
    const finalizados = [];

    this.stat = 'loading';

    // se comprueba que el numero está escrito correctamente  y son las cantidades exactas requeridas
    if (TOTAL_FILES !== this.currentLote.cajasTotales) {
      console.error('las imagenes no son igual a las cajas por registrar');
      this.msg_img = 'Las imagenes no coinciden con la configuración establecida :/, presiona para intentarlo de nuevo';
      this.stat = 'error';
      return;
    }

    /// TODO comprobar que sean la misma cantidad de archivos que la de número de cajas
    for (let i = 0; i < TOTAL_FILES; i++) {
      const f: File = files[i];
      const n = Number(f.name.split('.')[0]);
      console.log('asv');
      if (isNaN(n)) {
        this.msg_img = 'La imagen ' + f.name + ' se encuentra en un mal formato :/ , presiona para intentarlo de nuevo';
        this.stat = 'error';
        console.error('la imagen ' + f.name + ' se encuentra mal escrita');
        return;
      } else {
        if (n !== (i + 1)) {
          this.stat = 'error';
          this.msg_img = 'La imagen ' + f.name + ' deberia ser la ' + (i + 1) + '.jpg';
          return;
        }
      }
    }
// exelente, ahora si miremos veamos que está sucendiendo
    this.msg_img = 'Procesando imagenes...';

    for (let i = 0; i < TOTAL_FILES; i++) {
      this.tools.comprimir(files[i], result => {
        console.log('Finalizar img ' + result.name);
        console.log(result);
        this.imagenesProcesadas[i] = result;
        finalizados.push(true);
        if (finalizados.length === files.length) {
          console.log('acabó Todo del todo');
          this.stat = 'ok';
          this.msg_img = 'Imagenes procesadas con exito ;)';
          this.imagenes_finalizadas = true;
        }
      });
    }
  }

  seleccionarMaterial(material_seleccionado: any, i: number) {
    console.log(material_seleccionado.name);
    this.currentLote.materiales[i] = material_seleccionado.name;
    this.currentLote.salesMateriales[i] = material_seleccionado.salt;
  }

  iniciarNuevoRegistro() {
    window.location.reload();
  }
}
