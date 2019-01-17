import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {HasherService} from '../../_services/hasher.service';
import {DbService} from '../../_services/db.service';
import {ModelRelojService} from '../../_services/model-reloj.service';
import {Subscription} from 'rxjs';
import {MSelectComponent} from '../m-select/m-select.component';
import {ToolsService} from '../../_services/tools.service';
import {NgxSmartModalComponent} from 'ngx-smart-modal';
import {ModelCajasService} from '../../model-cajas.service';

class Rmodel {
  diametro: string;
  lote: number;
  caja: number;
  tipo: string;
  materiales: any[];
  coleccion: string;
  modelo: string;
}

class Est {
  features: {};
  metadata: {};
  case: {};
}


@Component({
  selector: 'app-nuevo-ingreso-reloj',
  templateUrl: './nuevo-ingreso-reloj.component.html',
  styleUrls: ['./nuevo-ingreso-reloj.component.css']
})
export class NuevoIngresoRelojComponent implements OnInit {
  pr = true;
  lote: any = '';
  est: ModelRelojService;
  colecciones: any;
  colecciones_del_modelo_selected: any[] = [];
  private _colecc_del_modelo_selected: any[];
  opciones_por_ver: any[];
  @ViewChildren(MSelectComponent) selects: QueryList<MSelectComponent>;
  @ViewChild('modal') modal: NgxSmartModalComponent;
  obj: any = [];
  private _current_reg: Subscription;
  info_lotes: any = {};
  registrable: any = false;
  registrado = false;
  relojReg: {} = {};
  watch_img: File;
  bodyText: string;
  validando = false;
  ver_opciones_caja = false;
  private current_opciones: any = [];
  salts = {modelo: '', coleccion: ''};
//////////////////////////////////////////////////////////////////
  current_reloj: Rmodel = new Rmodel();
  private _sus_relojes_disponibles: Subscription;
  ver_opciones_reloj = false;

  seleccionarModelo(item_modelo_seleccionado: any) {
    // TODO buscar la manera de eliminar el [0] al final de la linea

    const est_modelo_selected = this.estructura.modelos.filter(value => value.id === item_modelo_seleccionado.id)[0];
    this._colecc_del_modelo_selected = est_modelo_selected.colecciones;
    const todas_colecciones = this.estructura.colecciones;

    // console.log('Selecciona modelo ' + _modelo_seleccionado.id + ' ' + _modelo_seleccionado.name);
    this.colecciones_del_modelo_selected = todas_colecciones.filter(_colec => {
      const oo = this._colecc_del_modelo_selected.find(value => {
        return value.id_coleccion === _colec.id;
      });
      return oo != null;
    });

    this.opciones_por_ver = [];
    this.current_reloj.modelo = item_modelo_seleccionado.name;
    this.salts.modelo = item_modelo_seleccionado.salt;

    this.current_opciones.opciones_materiales_del_modelo = this.cajaEst.traerMateriales(item_modelo_seleccionado);
    this.current_opciones.materiales = [this.current_opciones.opciones_materiales_del_modelo.length];
    this.current_reloj.modelo = item_modelo_seleccionado.name;

  }

  constructor(private estructura: ModelRelojService, private hasher: HasherService, private cajaEst: ModelCajasService,
              public db: DbService, private tools: ToolsService) {
    this.est = estructura;
  }

  ngOnInit() {

    // todo buscar info del lote actual si este existe, en cado se que no, iniciar nuevo lote
    this.buscarCurrentLote();
    this.bodyText = 'This text can be updated in modal 1';
  }


  buscarCurrentLote() {
    console.log('iniciando busqueda de registro');
    this._current_reg = this.db.get_info_current_lote().subscribe(_info_lotes => {
      console.log('Buscando datos lote...');
      this.info_lotes = _info_lotes;
      console.log(this.info_lotes);

      // ¿Existe algún dato en la db?
      if (this.info_lotes === null) {
        console.log('Primera vez que se utiliza la db, iniciando lote 0');
        this.info_lotes = {};
        this.info_lotes = {finalizados: 0};
        this.info_lotes = {num_nuevo_lote: this.info_lotes.finalizados + 1};
      } else {

        // ¿ese lote ya está lleno?
        if (this.info_lotes.current.item_actual >= this.info_lotes.current.cantidad_por_lote) {
          console.log('LOTE FINALIZADO !');
          this.registrable = false;
          const s = +this.info_lotes.finalizados++;
          this.info_lotes.finalizados = s;
          this.info_lotes.num_nuevo_lote = s + 1;
        } else {
          console.log('Lote sin llenar');
          this.registrable = true;
          this.info_lotes.current.item_actual++;
        }
      }
    });
    // aquí se buscará la información del lote y el numero de registro.
  }


  seleccionarColeccion(coleccion_selected: any) {
    this.opciones_por_ver = [];
    const coleccion_selecteds: any = this._colecc_del_modelo_selected.filter(value => value.id_coleccion === coleccion_selected.id)[0];
    // console.log('coleccion seleccionada ' + raw_colecc_select.name);

    const nOptions: any[] = coleccion_selecteds.opciones;
    this.estructura.opciones.forEach(_opc => {

        const oo = nOptions.find(value => {
          return value.id_opc === _opc.id;
        });
        // AQUI SE DEBEN REMOVER LOS OBJETOS DEL
        if (oo != null) {
          const c: any[] = oo.ids;

          // contiene las opciones qie deben ser visibles [1,2,3]...
          const opciones_visibles: any[] = oo.id_opc;

          _opc.ops = _opc.ops.filter(valu => {
            return valu.id === c.find(val => valu.id === val);
          });
          // console.log('las opciones a ver son :');
          // console.log(_opc);
          this.opciones_por_ver.push(_opc);
        }
      }
    );
    this.ver_opciones_caja = true;
    this.current_reloj.coleccion = coleccion_selected.name;
    this.current_opciones.tipo = this.cajaEst.materiales;
    this.salts.coleccion = coleccion_selected.salt;
  }

  seleccionarTotalCajas(itemSeleccionado: any) {
    // this.nuevo_lote.total_cajas = itemSeleccionado;
  }

  seleccionarTipo_(tipo_selected: any) {
    console.log('se seleccionna un tipo de material');
    // this.nuevo_lote.tipo = itemSeleccionado.name;
    console.log(tipo_selected.items);
    this.current_opciones.material = tipo_selected.items;
    this.current_reloj.tipo = tipo_selected.name;
  }

  seleccionarTipo(tipo_selected: any, i: any) {
    // this.current_reloj.materiales[i] = {Tipo: tipo_selected.name};
    this.current_opciones.materiales[i] = tipo_selected.items;
  }

  seleccionarLote(lote_selected: any) {
    this.current_reloj.lote = +lote_selected.name;
    this.current_opciones.cajas = lote_selected.items;
    // console.log(this.current_opciones.cajas);
  }

  finalizarNuevoRegistro() {
    const serial = this.hasher.encriptarSerial('aquí irán un serial chingón', 20, 10);
    // console.log(Object.keys(this.current_reloj));
    const reloj_final = {
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
      reloj_final.metadata['image_url'] = url;
      this.db.push_reloj(reloj_final);
      this.validando = false;
      this.modal.close();
    });
    // console.log(this.current_reloj);
  }

  obtenerNombreCaracteristica(th: any): any {
    return this.estructura.opciones.find(value => value.id === th);
  }

  selectCaracteristica(opcion_seleccionada: any, id_caracteristica_selected: number, nombreCaracteristica: string) {
    opcion_seleccionada['id_caracteristica'] = id_caracteristica_selected;
    this.current_reloj[nombreCaracteristica] = opcion_seleccionada.name;
  }

  IniciarNuevoLote(cantidad_por_lote) {
    // console.log(cantidad_por_lote);
    // Se crea la estructura del nuevo lote a llenar
    const currentLote = {
      lote_num: this.info_lotes.num_nuevo_lote,
      fecha_inicio: Date.now(),
      fecha_ultimo_reg: Date.now(),
      cantidad_por_lote: +cantidad_por_lote,
      item_actual: 0
    };

    this.db.updateCurrentLote(currentLote);
    this.db.updateLotesRegistrados(this.info_lotes.num_nuevo_lote);
    this.db.updateLoteN(this.info_lotes.num_nuevo_lote);
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

  seleccionarDiametro(diametro_selected: any) {
    this.current_reloj.diametro = diametro_selected.name;
    this.buscarLotesDisponibles();
  }

  private buscarLotesDisponibles() {

    this.current_opciones.lote = [{name: 'Buscando...'}];
    this.db.buscar_relojes_disponibles(this.current_reloj.material, this.current_reloj.diametro).subscribe(relojes => {
// AQUÍ LLEGAN TODOS LAS CAJAS DISPONIBLES PARA REGISTRARA
      // obtener solo los lotes
      this.current_opciones.lote = [];
      console.log(relojes);

      relojes.forEach(reloj => {
        this.current_opciones.lote.push({name: reloj['lote'], items: []});
      });

      // se filtran lotes repetidos TODO ¿Cómo funciona esto? EMs6
      this.current_opciones.lote = this.current_opciones.lote.filter((item, index, self) =>
        index === self.findIndex((t) => (t.name === item.name)));
      relojes.forEach(reloj => {
        this.current_opciones.lote.find(item => item.name === reloj['lote']).items.push({name: reloj['id_caja']});
      });
    });
  }

  seleccionarCaja(caja_selected: any) {
    this.ver_opciones_reloj = true;
    this.current_reloj.caja = caja_selected.name;
  }

  seleccinarMaterial($event: any, i: number) {
  }
}
