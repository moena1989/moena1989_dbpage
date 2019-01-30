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
  registrado = false;
  watch_img: File;
  validando = false;
  ver_opciones_caja = false;
  current_opciones: any = {colecciones: [], opciones_materiales_del_modelo: CajaM};
  salts = {modelo: '', coleccion: ''};
//////////////////////////////////////////////////////////////////
  current_reloj: Rmodel = new Rmodel();
  ver_opciones_reloj = false;
  cajas_disponibles: any[];
  cajasFiltradas: any[] = undefined;
  modelo_seleccionado: any;
  subida_completa = false;
  currentReloj: any = {};
  photoUrl = '';
  filtrosCaja: MFiltro = {diametroExterno: '', diametroInterno: '', modelo: ''};
  @ViewChild('modalAlert') modalAlert: NgxSmartModalComponent;
  @ViewChild('modalSubiendo') modalSubiendo: NgxSmartModalComponent;
  @ViewChild('modalResult') modalResult: NgxSmartModalComponent;
  porcentaje_registro = 0;

  constructor(
    public estructura: ModelRelojService,
    public hasher: HasherService,
    public cajaEst: ModelCajasService,
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
      const serial = this.hasher.encriptarSerial('aquí irán un serial chingón',
        Math.round(Math.random() * 500), Math.round(Math.random() * 500));
      const relojFinal: MReloj = {
        coleccion: this.current_reloj.coleccion,
        modelo: this.current_reloj.modelo,
        colorMaquinaria: this.current_reloj.colorMaquinaria,
        colorPulso: this.current_reloj.colorPulso,
        idCaja: this.current_reloj.idCaja,
        diamtroExterno: this.current_reloj.diametroExterno,
        diametroInterno: this.current_reloj.diametroInterno,
        serial: serial,
        fechaCreacion: new Date(),
        fechaUltimaModificacion: new Date(),
        urlImagen: url,
        id: this.fs.getUniqId()
      };

      this.fs.pushReloj(relojFinal.id, relojFinal).then(value => {
        this.subida_completa = true;
        this.porcentaje_registro = 100;
        setTimeout(() => {
          this.modalSubiendo.close();
          this.modalResult.open();
        }, 1000);
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

  seleccionarCaja(caja_selected: any) {
    console.error('se selecciona la caja!');
    console.log(caja_selected);

    if (caja_selected.obj !== undefined) {
      this.ver_opciones_reloj = true;
      this.current_reloj.caja = caja_selected.name;
      this.current_reloj.idCaja = caja_selected.obj.my_key;
      this.photoUrl = caja_selected.obj.urlImagen;
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

  seleccionarMaterial(material: any, i: number) {
    this.current_reloj.materiales[i] = material.name;
    // this.filtrar();
  }

  seleccionarColorMaquinaria(maq: any) {
    this.current_reloj.colorMaquinaria = maq.name;
  }

  seleccionarTipoPulso(tipo_pulso: any) {
    this.current_opciones.opciones_reloj.pulsos = tipo_pulso.items;
    this.current_reloj.tipoPulso = tipo_pulso.name;

  }

  seleccionarColorPulso(color_p: any) {
    this.current_reloj.colorPulso = color_p.name;
  }

  private filtrarCajas() {
    console.log('probando filtros Firestore');
    this.fs.getCajasDisponibles(this.filtrosCaja).subscribe(cajas => {

      if (cajas.empty) {
        console.log('no se encontraron cajas con la configuración actual');
        return;
      }
      this.cajasFiltradas = [];
      cajas.docs.forEach(caja => {
        this.cajasFiltradas.push(caja.data());
      });
      console.log(this.cajasFiltradas);
      const opcs_lote = [];
      this.cajasFiltradas.forEach(cj => {
        let exist = false;
        for (let i = 0; i < opcs_lote.length; i++) {
          if (opcs_lote[i].name === cj.numeroDeLote) {
            opcs_lote[i].items.push({name: cj.numeroDeCaja, obj: cj});
            exist = true;
            break;
          }
        }
        if (!exist) {
          opcs_lote.push({name: cj.numeroDeLote, items: [{name: cj.numeroDeCaja, obj: cj}]});
        }
      });
      this.ver_opciones_caja = true;
      this.current_opciones.lotes = opcs_lote;
      console.log(opcs_lote);
    });
  }
}
