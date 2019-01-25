import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {HasherService} from '../../_services/hasher.service';
import {DbService} from '../../_services/db.service';
import {ModelRelojService} from '../../_services/model-reloj.service';
import {MSelectComponent} from '../m-select/m-select.component';
import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {Caja_m, ModelCajasService} from '../../model-cajas.service';

class Rmodel {
  diametro_externo: string;
  diametro_interno: string;
  num_lote: number;
  caja: number;
  materiales: any[];
  coleccion: string;
  modelo: string;
  color_maquinaria: any;
  tipo_pulso: any;
  color_pulso: any;
  key_caja: string;
}

@Component({
  selector: 'app-nuevo-ingreso-reloj',
  templateUrl: './nuevo-ingreso-reloj.component.html',
  styleUrls: ['./nuevo-ingreso-reloj.component.css']
})
export class NuevoIngresoRelojComponent implements OnInit {
  pr = true;
  opciones_por_ver: any[];
  @ViewChildren(MSelectComponent) selects: QueryList<MSelectComponent>;
  @ViewChild('modal') modal: NgxSmartModalComponent;
  obj: any = [];
  registrado = false;
  watch_img: File;
  validando = false;
  ver_opciones_caja = false;
  current_opciones: any = {colecciones: [], opciones_materiales_del_modelo: Caja_m};
  salts = {modelo: '', coleccion: ''};
//////////////////////////////////////////////////////////////////
  current_reloj: Rmodel = new Rmodel();
  ver_opciones_reloj = false;
  cajas_disponibles: any[];
  cajasFiltradas: any[] = undefined;
  modelo_seleccionado: any;
  cajasDisponibles = false;
  subida_completa = false;
  reloj_final: any = {};

  constructor(
    public estructura: ModelRelojService,
    public hasher: HasherService,
    public cajaEst: ModelCajasService,
    public db: DbService) {
  }

  ngOnInit() {
  }

  seleccionarColeccion(coleccion_selected: any) {
    this.opciones_por_ver = [];
    this.current_reloj.coleccion = coleccion_selected.name;
    this.current_opciones.opciones_reloj = coleccion_selected.opciones_reloj;
    console.log(coleccion_selected.opciones_reloj);
    this.salts.coleccion = coleccion_selected.salt;
    console.log(this.salts);
    this.current_reloj.materiales = new Array(this.current_opciones.opciones_caja.materiales.length);
  }

  seleccionarLote(lote_selected: any) {
    this.current_reloj.num_lote = +lote_selected.name;
    this.current_opciones.cajas = lote_selected.items;
    // console.log(this.current_opciones_caja_modelo.cajas);
  }

  subir_nuevo_registro() {
    const serial = this.hasher.encriptarSerial('aquí irán un serial chingón', 20, 10);
    // console.log(Object.keys(this.current_reloj));
    this.reloj_final = {
      metadata: {
        date: Date.now(),
        serial: serial,
        salts: this.salts.modelo + '/' + this.salts.coleccion
      },
      features: this.current_reloj
    };
    this.validando = true;
// primero, subo la imagen...
    this.db.push_image(this.watch_img, 'front', 'watches/' + serial, url => {
      this.reloj_final.metadata['image_url'] = url;
      this.db.push_reloj(this.reloj_final);
      // this.validando = false;
      // cambiar estado de la caja ya utilizada :D
      this.subida_completa = true;
      // this.modal.close();
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
    this.current_reloj.diametro_externo = diametro_selected.name;
  }

  private buscarCajasDisponibles() {
    this.current_opciones.lotes = [{name: 'Esperando...'}];
    this.current_opciones.cajas = [{name: 'Esperando...'}];

  }

  seleccionarCaja(caja_selected: any) {
    this.ver_opciones_reloj = true;
    this.current_reloj.caja = caja_selected.name;
    this.current_reloj.key_caja = caja_selected.obj.my_key;
  }

  seleccionarModelo(_modelo: any) {
    this.modelo_seleccionado = _modelo;
    this.current_opciones.colecciones = _modelo.items;
    this.current_opciones.opciones_caja = _modelo.opciones_caja;
    this.current_reloj.modelo = _modelo.name;
    this.salts.modelo = _modelo.salt;
    this.buscarCajasDisponibles();
  }

  seleccionarDiametroInterno(_diametro_interno: any) {
    this.current_reloj.diametro_interno = _diametro_interno.name;
    // this.filtrar();

  }

  seleccionarMaterial(material: any, i: number) {
    this.current_reloj.materiales[i] = material.name;
    // this.filtrar();
  }

  seleccionarColorMaquinaria(maq: any) {
    this.current_reloj.color_maquinaria = maq.name;
  }

  seleccionarTipoPulso(tipo_pulso: any) {
    this.current_opciones.opciones_reloj.pulsos = tipo_pulso.items;
    this.current_reloj.tipo_pulso = tipo_pulso.name;

  }

  seleccionarColorPulso(color_p: any) {
    this.current_reloj.color_pulso = color_p.name;
  }

  private filtrarCajas() {
    this.db.buscar_cajas_por_registrar(this.current_reloj.modelo)
      .subscribe(cajas => {
        this.cajas_disponibles = cajas;
        console.log(cajas);

        // FILTRO DISEÑADO ESPECIFICAMENTE PARA LAS CARACTERISTICAS DE LA CAJA, NO USAR EN OTRO LUGAR
        this.cajasFiltradas = this.cajas_disponibles;
        if (this.current_reloj.materiales && this.current_reloj.diametro_interno && this.current_reloj.diametro_externo) {
          console.log('intentando filtrar ');
          this.cajasFiltradas = this.cajasFiltradas.filter(cj => {
            if (cj.materiales.length === this.current_reloj.materiales.length) {
              for (let i = 0; i < cj.materiales.length; i++) {
                if (cj.materiales[i] !== this.current_reloj.materiales[i]) {
                  return false;
                }
              }
            } else {
              return false;
            }
            return cj.diametro_externo === this.current_reloj.diametro_externo && cj.diametro_interno === this.current_reloj.diametro_interno;
          });
        }
        if (this.cajasFiltradas.length > 0) {
          this.ver_opciones_caja = true;
        }
        console.log(this.cajasFiltradas);
        // TODO BUSCAR LOTES Y CAJAS DE CADA UNO
        const opcs_lote = [];
        this.cajasFiltradas.forEach(cj => {
          let exist = false;
          for (let i = 0; i < opcs_lote.length; i++) {
            if (opcs_lote[i].name === cj.num_lote) {
              opcs_lote[i].items.push({name: cj.num_caja, obj: cj});
              exist = true;
              break;
            }
          }
          if (!exist) {
            opcs_lote.push({name: cj.num_lote, items: [{name: cj.num_caja, obj: cj}]});
          }
        });
        this.current_opciones.lotes = opcs_lote;
        console.log(opcs_lote);
      });
  }
}
