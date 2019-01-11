import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {HasherService} from '../services/hasher.service';
import {DbService} from '../services/db.service';
import {formatDate} from '@angular/common';
import {ModelsService} from '../_services/models.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {MSelectComponent} from '../m-select/m-select.component';
import {ToolsService} from '../_services/tools.service';
import {Base, Caracteristica, ClockModel, Metadata} from '../uploads/shared/clockModel';
import {NgxSmartModalComponent} from 'ngx-smart-modal';

@Component({
  selector: 'app-nuevo-ingreso-reloj',
  templateUrl: './nuevo-ingreso-reloj.component.html',
  styleUrls: ['./nuevo-ingreso-reloj.component.css']
})
export class NuevoIngresoRelojComponent implements OnInit {
  pr = true;
  lote: any = '';

  serial_raw: string;
  serial_hash: string;
  est: ModelsService;
  colecciones: any;
  colecciones_del_modelo_selected: any[];
  private _colecc_del_modelo_selected: any[];
  opciones_por_ver: any[];

  @ViewChildren(MSelectComponent) selects: QueryList<MSelectComponent>;
  @ViewChild('modal') modal: NgxSmartModalComponent;

  obj: any = [];
  _caracteristicas: any[] = [];
  private ob_final: ClockModel;
  private serial_salt: string;
  serial_def: string;
  private num_en_lote: number;
  private _current_reg: Subscription;
  private _info_lote: Subscription;
  info_lotes: any = {};
  registrable: any = false;
  ultimo_item = false;
  registrado = false;
  relojReg: {} = {};
  img_clock_front: File;
  // img_clock_der: File;
  // img_clock_izq: File;
  bodyText: string;
  validando = false;

  constructor(private estructura: ModelsService, private hasher: HasherService,
              public db: DbService, private _router: Router, private tools: ToolsService) {
    this.est = estructura;
  }

  ngOnInit() {

    // todo buscar info del lote actual si este existe, en cado se que no, iniciar nuevo lote
    this.buscarCurrentLote();

    this.bodyText = 'This text can be updated in modal 1';
  }


  buscarCurrentLote() {
    console.log('iniciando busqueda de registro');
    this._current_reg = this.db.info_current_lote().subscribe(_info_lotes => {
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

  selectModel(_modelo_seleccionado: any) {
    // TODO buscar la manera de eliminar el [0] al final de la linea
    const est_modelo_selected = this.estructura.modelos.filter(value => value.id === _modelo_seleccionado.id)[0];
    this._colecc_del_modelo_selected = est_modelo_selected.colecciones;
    const todas_colecciones = this.estructura.colecciones;

    // console.log('Selecciona modelo ' + _modelo_seleccionado.id + ' ' + _modelo_seleccionado.name);
    this.colecciones_del_modelo_selected = todas_colecciones.filter(_colec => {
      const oo = this._colecc_del_modelo_selected.find(value => {
        return value.id_coleccion === _colec.id;
      });
      return oo != null;
    });
    this.obj = [];
    this.obj['Colección'] = _modelo_seleccionado.name;
    this.obj['coleccion_id'] = _modelo_seleccionado.name;
    this.obj['coleccion_salt'] = _modelo_seleccionado.salt;
    this.opciones_por_ver = [];
  }

  seleccionarColeccion(raw_colecc_select: any) {
    this.opciones_por_ver = [];
    const coleccion_selected: any = this._colecc_del_modelo_selected.filter(value => value.id_coleccion === raw_colecc_select.id)[0];
    // console.log('coleccion seleccionada ' + raw_colecc_select.name);

    const nOptions: any[] = coleccion_selected.opciones;
    this.estructura.opciones.forEach(_opc => {

        const oo = nOptions.find(value => {
          return value.id_opc === _opc.id;
        });
        // AQUI SE DEBEN REMOVER LOS OBJETOS DEL
        if (oo != null) {
          const c: any[] = oo.ids;

          // contiene las opciones qie deben ser visibles [1,2,3]...
          const oopps: any[] = oo.id_opc;

          _opc.ops = _opc.ops.filter(valu => {
            return valu.id === c.find(val => valu.id === val);
          });
          // console.log('las opciones a ver son :');
          // console.log(_opc);
          this.opciones_por_ver.push(_opc);
        }
      }
    );

    this.obj['Modelo'] = raw_colecc_select.name;
    this.obj['Modelo_id'] = raw_colecc_select.id;
    this.obj['Modelo_salt'] = raw_colecc_select.salt;
  }

  finalizarNuevoRegistro() {
    const caracteristicas_seleccionadas = [];
    this.serial_raw = '';
    this.ob_final = new ClockModel();
    this.serial_salt = '';
    this.validando = true;
    this._caracteristicas.forEach((caracteristicass, index) => {
      if (caracteristicass) {
        const nombre_caracteristica = this.obtenerNombreCaracteristica(caracteristicass.id_caracteristica).nombre;
        const id_caracteristica = this.obtenerNombreCaracteristica(caracteristicass.id_caracteristica).id;

        const id_opcion = caracteristicass.id;
        const name_opcion = caracteristicass.name;
        const c = new Caracteristica(id_caracteristica, id_opcion, nombre_caracteristica, name_opcion);

        caracteristicas_seleccionadas.push(c);
        this.serial_salt += caracteristicass.salt;
      }
    });

    this.lote = this.info_lotes.current.lote_num;
    this.num_en_lote = this.info_lotes.current.item_actual;
    const nSalt = Math.round(Math.random() * 10000);

    this.serial_raw = this.obj['coleccion_salt'] + this.obj['Modelo_salt'] +
      '-' + this.lote + '-' + this.info_lotes.current.item_actual + '-' + this.serial_salt + nSalt;
    this.serial_hash = this.hasher.encriptarSerial(this.serial_raw, this.lote, this.info_lotes.current.item_actual);
    this.serial_def = this.obj['coleccion_salt'] + this.obj['Modelo_salt'] + '-' + this.serial_hash;

    this.ob_final['caracteristicas'] = caracteristicas_seleccionadas;
    this.ob_final['base'] = [

      new Base('Colección', this.obj['Colección'], '', ''),
      new Base('Modelo', this.obj['Modelo'], '', '')];

    const date = formatDate(Date.now(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '-500');
    // 'user_key': this.db.authState,
    this.ob_final.metadata = new Metadata(date, this.serial_def, this.serial_raw);

    // actualizo al registroo del lote actual
    const currentLote = {
      fecha_ultimo_reg: Date.now(),
      item_actual: this.info_lotes.current.item_actual
    };
    this.db.actualizarCurrentLote(currentLote);
    console.log('aquí empieza a subir');

    this.db.pushReloj(this.ob_final, this.img_clock_front, (url) => {
      this.registrado = true;
      this.tools.snack.show('Registro exitoso');
      this.ob_final.metadata.img_url = url;
      this.relojReg = this.ob_final;

      this.ob_final = new ClockModel();
      this.obj = [];

      if (this.info_lotes.current.item_actual === this.info_lotes.current.cantidad_por_lote) {
        console.log('Reloj registrado corresponde al último del lote');
        this.db.updateLotesRegistrados(this.info_lotes.current.lote_num);
      }
      // se cierra modal
      this.modal.close();
      // this.validando = false;
    });
  }

  obtenerNombreCaracteristica(th: any): any {
    return this.estructura.opciones.find(value => value.id === th);
  }

  selectCaracteristica(opcion_seleccionada: any, id_caracteristica_selected: number) {
    // console.log('::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
    // console.log(opcion_seleccionada);
    // console.log(id_caracteristica_selected);
    opcion_seleccionada['id_caracteristica'] = id_caracteristica_selected;

    var exist = false;
    for (var i = 0; i < this._caracteristicas.length; i++) {
      // console.log(this._caracteristicas[i]);
      if (this._caracteristicas[i].id_caracteristica === id_caracteristica_selected) {
        console.log('se encontró repetido, intentando remplazar');
        this._caracteristicas[i] = opcion_seleccionada;
        exist = true;
        break;
      }
    }

    if (!exist) {
      this._caracteristicas.push(opcion_seleccionada);
    }

    console.log(this._caracteristicas);
  }

  IniciarNuevoLote(cantidad_por_lote) {
    console.log(cantidad_por_lote);
    // Se crea la estructura del nuevo lote a llenar
    const currentLote = {
      lote_num: this.info_lotes.num_nuevo_lote,
      fecha_inicio: Date.now(),
      fecha_ultimo_reg: Date.now(),
      cantidad_por_lote: +cantidad_por_lote,
      item_actual: 0
    };

    this.db.actualizarCurrentLote(currentLote);
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
        this.img_clock_front = evnt;
        console.log('frontal');
        break;

      // case 'lateral_der':
      //   console.log('der');
      //   this.img_clock_der = evnt;
      //
      //   break;
      // case 'lateral_izq':
      //   console.log('izq');
      //   this.img_clock_izq = evnt;
      //   break;
    }
  }
}
