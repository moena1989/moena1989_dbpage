import {Component, Input, OnInit, QueryList, ViewChildren} from '@angular/core';
import {HasherService} from '../services/hasher.service';
import {DbService} from '../services/db.service';
import {formatDate} from '@angular/common';
import {ModelsService} from '../models.service';
import {Subscription} from 'rxjs';
import {NavigationEnd, Router} from '@angular/router';
import {MSelectComponent} from '../m-select/m-select.component';
import {ToolsService} from '../tools.service';

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

  obj: any = [];
  _caracteristicas: any[] = [];
  private ob_final: {};
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

  constructor(private estructura: ModelsService, private hasher: HasherService, public db: DbService, private _router: Router, private tools: ToolsService) {
    this.est = estructura;
  }


  ngOnInit() {

    // todo buscar info del lote actual si este existe, en cado se que no, iniciar nuevo lote
    this.buscarCurrentLote();


  }


  buscarCurrentLote() {
    console.log('iniciando busqueda de registro');
    this._current_reg = this.db.info_current_lote().subscribe(info_lotes => {
      console.log(this.info_lotes.current);
      this.info_lotes = info_lotes;
      if (this.info_lotes.current === undefined) {
        console.log('no existe ningun lote por completar');
        this.registrable = false;
        this.info_lotes.finalizados++;
      } else {
        console.log(this.info_lotes);
        this.registrable = true;

        if (this.info_lotes.current.item_actual >= this.info_lotes.current.cantidad_por_lote) {
          // es hora de iniciar un nuevo lote
          this.registrable = false;
          var s = +this.info_lotes.finalizados++;
          console.log(s);
          console.log(s);
          this.info_lotes.finalizados++;
        }
        // AUMENTARÉ DE UNA VEZ EL NUMERO DEL REGISTRO AQUÍ
        this.info_lotes.current.item_actual++;
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


  validarRegistro() {
    var validado = true;

    for (var i = 0; i < this.selects.length; i++) {
      // if (this.selects[i] === false) {
      //   validado = false;
      //   break;
      // }
      console.log(this.selects[i]);
    }


    this.finalizarRegistro();
    this.tools.snack.show('Registro exitoso :)');

    // if (validado) {
    // } else {
    // }


  }


  finalizarRegistro() {
    const caracteristicas_seleccionadas = [];

    this.serial_raw = '';
    this.ob_final = {};
    this.serial_salt = '';
    this._caracteristicas.forEach((caracteristicass, index) => {
      if (caracteristicass) {
        const nombre_caracteristica = this.obtenerNombreCaracteristica(caracteristicass.id_caracteristica).nombre;
        const id_caracteristica = this.obtenerNombreCaracteristica(caracteristicass.id_caracteristica).id;
        const id_opcion = caracteristicass.id;
        const name_opcion = caracteristicass.name;

        caracteristicas_seleccionadas.push({
          nombre_caracteristica: nombre_caracteristica,
          id_caracteristica: id_caracteristica,
          id_opcion: id_opcion,
          nombre_opcion: name_opcion
        });
        this.serial_salt += caracteristicass.salt;
      }
    });
    this.lote = this.info_lotes.current.lote_num;
    this.num_en_lote = this.info_lotes.current.cantidad_por_lote;
    // TODO #lote, #product, #tam
    this.serial_raw = this.obj['coleccion_salt'] + this.obj['Modelo_salt'] + '-' + this.lote + '-' + this.num_en_lote + '-' + this.serial_salt;
    this.serial_hash = this.hasher.encriptarSerial(this.serial_raw, this.lote, this.num_en_lote);
    this.serial_def = this.obj['coleccion_salt'] + this.obj['Modelo_salt'] + '-' + this.serial_hash;

    this.ob_final['caracteristicas'] = caracteristicas_seleccionadas;
    this.ob_final['base'] = [{
      nombre_base: 'Colección',
      id_base: '',
      id_seleccion: '',
      nombre_seleccion: this.obj['Colección']
    }, {
      nombre_base: 'Modelo',
      id_base: '',
      id_seleccion: '',
      nombre_seleccion: this.obj['Modelo']
    }];
    const date = formatDate(Date.now(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '-500');
    this.ob_final['metadata'] = {
      'fecha': date,
      'serial_raw': this.serial_raw,
      'serial_def': this.serial_def
    };


    // actualizo al registroo del lote actual
    var currentLote = {
      fecha_ultimo_reg: Date.now(),
      item_actual: this.info_lotes.current.item_actual
    };

    this.db.actualizarCurrentLote(currentLote);

    console.log(this.ob_final);
    this.db.pushReloj(this.ob_final);
    this.relojReg = this.ob_final;
    this.ob_final = {};
    this.obj = [];

    if (this.info_lotes.current.item_actual === this.info_lotes.current.cantidad_por_lote) {
      console.log('Reloj registrado corresponde al último del lote');
      this.db.updateLotesRegistrados(this.info_lotes.current.lote_num);
    }

    this.registrado = true;
    this.tools.snack.show('Registro exitoso');

  }

  obtenerNombreCaracteristica(th: any): any {
    return this.estructura.opciones.find(value => value.id === th);
  }

  selectCaracteristica(op: any, id_caracteristica: number) {
    // console.log('se selecciona la siguiente caracteristica: ');
    // console.log(op);
    op['id_caracteristica'] = id_caracteristica;
    this._caracteristicas.push(op);
  }

  IniciarNuevoLote(cantidad_por_lote) {
    console.log(cantidad_por_lote);

    var currentLote = {
      lote_num: this.info_lotes.finalizados,
      fecha_inicio: Date.now(),
      fecha_ultimo_reg: Date.now(),
      cantidad_por_lote: +cantidad_por_lote,
      item_actual: 0
    };

    this.db.actualizarCurrentLote(currentLote);
  }


  iniciarNuevoRegistro() {
    // se reinicia
    // this.registrado = false;
    window.location.reload();
  }
}
