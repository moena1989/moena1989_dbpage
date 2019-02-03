import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {HasherService} from '../../_services/hasher.service';
import {DbManagerService} from '../../_services/db-manager.service';
import {ModelRelojService} from '../../_services/model-reloj.service';
import {MSelectComponent} from '../m-select/m-select.component';
import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {CajaM, ModelCajasService} from '../../model-cajas.service';
import {ToolsService} from '../../_services/tools.service';
import {DbManagerFirestoreService, MCaja, MFiltro, MReloj} from '../../db-manager-firestore.service';

class Rmodel {
  diametroExterno: string;
  diametroInterno: string;
  numeroDeLote: number;
  caja: number;
  materiales: any[];
  coleccion: string;
  modelo: string;
  colorMaquinaria: any;
  tipoPulso: any;
  colorPulso: any;
  idCaja: string;
  numeroDeCaja: number;
  serialCaja: number;
}

@Component({
  selector: 'app-nuevo-reloj',
  templateUrl: './nuevo-reloj.component.html',
  styleUrls: ['./nuevo-reloj.component.css']
})
export class NuevoRelojComponent implements OnInit {
  pr = true;
  opciones_por_ver: any[];
  @ViewChildren(MSelectComponent) selects: QueryList<MSelectComponent>;
  @ViewChild('modal') modal: NgxSmartModalComponent;
  obj: any = [];
  watch_img: File;
  validando = false;
  ver_opciones_caja = false;
  current_opciones: any = {colecciones: [], opciones_materiales_del_modelo: CajaM};
  salts = {modelo: '', coleccion: ''};
//////////////////////////////////////////////////////////////////
  current_reloj: Rmodel = new Rmodel();
  ver_opciones_reloj = false;
  cajasFiltradas: any[] = undefined;
  modelo_seleccionado: any;
  subida_completa = false;
  photoUrl = '';
  filtrosCaja: MFiltro = {diametroExterno: '', diametroInterno: '', modelo: ''};
  @ViewChild('modalAlert') modalAlert: NgxSmartModalComponent;
  @ViewChild('modalSubiendo') modalSubiendo: NgxSmartModalComponent;
  @ViewChild('modalResult') modalResult: NgxSmartModalComponent;
  porcentaje_registro = 0;
  cajaSeleccionada: MCaja;
  msjCajas = '';

  constructor(
    public estructura: ModelRelojService,
    public hasher: HasherService,
    public estructuras: ModelCajasService,
    public db: DbManagerService,
    public tools: ToolsService,
    public fs: DbManagerFirestoreService
  ) {
  }

  ngOnInit() {
    this.tools.top_tittle = 'Nuevo Reloj';
  }


  seleccionarColeccion(coleccion_selected: any) {
    this.opciones_por_ver = [];
    this.current_reloj.coleccion = coleccion_selected.name;
    this.current_opciones.opciones_reloj = coleccion_selected.opciones_reloj;
    console.log(coleccion_selected.opciones_reloj);
    this.salts.coleccion = coleccion_selected.salt;
    // console.log(this.salt);
    this.current_reloj.materiales = new Array(this.current_opciones.opciones_caja.materiales.length);
  }

  seleccionarLote(lote_selected: any) {
    this.current_reloj.numeroDeLote = +lote_selected.name;
    this.current_opciones.cajas = lote_selected.items;
    // console.log(this.current_opciones_caja_modelo.cajas);
  }

  iniciarRegistro() {
    this.modalAlert.close();
    this.modalSubiendo.open();
    this.validando = true;
// primero, subo la imagen...
    this.porcentaje_registro = 50;

    this.fs.pushImage(this.watch_img, 'front', 'watches/' + 'asdasd', url => {
      // const serial = this.hasher.encriptarSerial('aquí irán un serial chingón',
      //    Math.round(Math.random() * 500), Math.round(Math.random() * 500));
      const relojFinal: MReloj = {
        coleccion: this.current_reloj.coleccion,
        modelo: this.current_reloj.modelo,
        colorMaquinaria: this.current_reloj.colorMaquinaria,
        pulso: this.current_reloj.tipoPulso,
        diamtroExterno: this.current_reloj.diametroExterno,
        diametroInterno: this.current_reloj.diametroInterno,
        serial: '', // se hacae en la database.
        fechaCreacion: new Date(),
        fechaUltimaModificacion: new Date(),
        urlImagen: url,
        salts: [this.salts.modelo, this.salts.coleccion],
        numeroDeCaja: this.cajaSeleccionada.numeroDeCaja,
        numeroDeLote: this.cajaSeleccionada.numeroDeLote,
        estado: this.estructuras.ESTADOS_RELOJ.DISPONIBLE,
      };

      this.fs.getNuevoSerialReloj(relojFinal, serialModeloUnico => {
        console.log('seee inntenta crear el serial ', serialModeloUnico);
        relojFinal.serial = serialModeloUnico;
        this.fs.pushReloj(relojFinal.serial, relojFinal).then(value => {
          this.cajaSeleccionada.estado = this.estructuras.ESTADOS_CAJA.ARMADO;
          this.fs.pushCaja(this.cajaSeleccionada.serial, this.cajaSeleccionada).then(value1 => {
            console.log(value);
            this.subida_completa = true;
            this.porcentaje_registro = 100;
            setTimeout(() => {
              this.modalSubiendo.close();
              this.modalResult.open();
            }, 1000);
          });
        });
      });
    });
  }

  iniciarNuevoRegistro() {
    window.location.reload();
  }

  onFileChanged(evnt: File, typeImage: string) {
    // aquí se escoge
    switch (typeImage) {
      case 'frontal':
        this.watch_img = evnt;
        break;
    }
  }

  seleccionarDiametroExterno(diametro_selected: any) {
    this.current_reloj.diametroExterno = diametro_selected.name;
    // const filtro.diametroExterno = diametro_selected.name;
    this.filtrosCaja.diametroExterno = diametro_selected.name;
  }

  private buscarCajasDisponibles() {
    this.current_opciones.lotes = [{name: 'Esperando...'}];
    this.current_opciones.cajas = [{name: 'Esperando...'}];

  }

  seleccionarCaja(_cajaSeleccionada: any) {
    console.error('se selecciona la caja!');
    console.log(_cajaSeleccionada);

    if (_cajaSeleccionada.obj !== undefined) {
      this.ver_opciones_reloj = true;
      this.cajaSeleccionada = _cajaSeleccionada.obj;
      this.current_reloj.caja = _cajaSeleccionada.name;
      this.current_reloj.idCaja = _cajaSeleccionada.obj.id;
      this.photoUrl = _cajaSeleccionada.obj.urlImagen;
      this.current_reloj.serialCaja = _cajaSeleccionada.obj.serial;
    }
  }

  seleccionarModelo(_modelo: any) {
    this.modelo_seleccionado = _modelo;
    this.current_opciones.colecciones = _modelo.items;
    this.current_opciones.opciones_caja = _modelo.opciones_caja;
    this.current_reloj.modelo = _modelo.name;
    this.filtrosCaja.modelo = _modelo.name;

    this.salts.modelo = _modelo.salt;
    this.buscarCajasDisponibles();
  }

  seleccionarDiametroInterno(_diametro_interno: any) {
    this.current_reloj.diametroInterno = _diametro_interno.name;
    this.filtrosCaja.diametroInterno = _diametro_interno.name;
    this.filtrarCajas();
  }

  seleccionarColorMaquinaria(maq: any) {
    this.current_reloj.colorMaquinaria = maq.name;
  }

  seleccionarTipoPulso(tipo_pulso: any) {
    this.current_opciones.opciones_reloj.pulsos = tipo_pulso.items;
    this.current_reloj.tipoPulso = tipo_pulso.name;

  }

  private filtrarCajas() {
    console.log('probando filtros Firestore');
    this.fs.getCajasDisponibles(this.filtrosCaja).subscribe(cajas => {
        this.msjCajas = '';
        if (cajas.empty) {
          console.log('no se encontraron cajas con la configuración actual');
          this.msjCajas = 'No existen cajas registradas con esas caracteristicas';
          return;
        } else {
          this.cajasFiltradas = [];
          cajas.docs.forEach(caja => {
            this.cajasFiltradas.push(caja.data());
          });
          console.log(this.cajasFiltradas);
          const opcs_lote = [];
          this.cajasFiltradas.forEach(cj => {
            let exist = false;
            for (let i = 0; i < opcs_lote.length; i++) {
              if (opcs_lote[i].name === cj.serialMaterial + '-' + cj.numeroDeLote) {
                opcs_lote[i].items.push({name: cj.numeroDeCaja, obj: cj});
                exist = true;
                break;
              }
            }
            if (!exist) {
              opcs_lote.push({name: cj.serialMaterial + '-' + cj.numeroDeLote, items: [{name: cj.numeroDeCaja, obj: cj}]});
            }
          });
          this.ver_opciones_caja = true;
          this.current_opciones.lotes = opcs_lote;
          console.log(opcs_lote);
        }
      }
    );
  }
}
