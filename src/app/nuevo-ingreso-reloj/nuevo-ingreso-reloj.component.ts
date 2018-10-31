import {Component, Input, OnInit} from '@angular/core';
import {HasherService} from '../services/hasher.service';
import {DbService} from '../services/db.service';
import {formatDate} from '@angular/common';
import {ModelsService} from '../models.service';

@Component({
  selector: 'app-nuevo-ingreso-reloj',
  templateUrl: './nuevo-ingreso-reloj.component.html',
  styleUrls: ['./nuevo-ingreso-reloj.component.css']
})
export class NuevoIngresoRelojComponent implements OnInit {
  pr = true;
  manos: any = '';
  lote: any = '';
  serial_raw: string;
  serial_md5: string;
  est: ModelsService;
  colecciones: any;
  colecciones_del_modelo_selected: any[];
  private _colecc_del_modelo_selected: any[];
  opciones_por_ver: any[];


  obj: any = [];
  _caracteristicas: any[] = [];
  opcionesFiltradas: any;
  private ob_final: {};
  private serial_salt: string;


  constructor(private estructura: ModelsService, private hasher: HasherService, public db: DbService) {
    this.est = estructura;
  }

  ngOnInit() {
  }


  @Input() set modelo_seleccionado(_modelo_seleccionado: any) {
    // TODO buscar la manera de eliminar el [0] al final de la linea
    const est_modelo_selected = this.estructura.modelos.filter(value => value.id === _modelo_seleccionado.id)[0];
    this._colecc_del_modelo_selected = est_modelo_selected.colecciones;
    const todas_colecciones = this.estructura.colecciones;

    console.log('Selecciona modelo ' + _modelo_seleccionado.id + ' ' + _modelo_seleccionado.name);

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

    // var obj = {};
    console.log(this.obj);
    console.log(_modelo_seleccionado);
  }

  @Input() set colecc_select(raw_colecc_select: any) {
    this.opciones_por_ver = [];
    const coleccion_selected: any = this._colecc_del_modelo_selected.filter(value => value.id_coleccion === raw_colecc_select.id)[0];
    console.log('coleccion seleccionada ' + raw_colecc_select.name);

    const nOptions: any[] = coleccion_selected.opciones;
    console.log('se selecciona colección: ');
    // console.log(coleccion_selected);
    const todas_opciones = this.estructura.opciones;

    this.estructura.opciones.forEach(_opc => {

        const oo = nOptions.find(value => {
          // console.log(value.id_coleccion === _colec.id);
          return value.id_opc === _opc.id;
        });
        // AQUI SE DEBEN REMOVER LOS OBJETOS DEL
        if (oo != null) {
          const c: any[] = oo.ids;
          console.log('holi');
          // contiene las opciones qie deben ser visibles [1,2,3]...
          const oopps: any[] = oo.id_opc;

          // console.log(c);
          // console.log(_opc);
          //
          _opc.ops = _opc.ops.filter(valu => {
            return valu.id === c.find(val => valu.id === val);
          });
          // ~removeIndex && array.splice(removeIndex, 1);
          // console.log('AHÁ');
          // console.log(_opc.ops);
          this.opciones_por_ver.push(_opc);
        }
      }
    );


    this.obj['Modelo'] = raw_colecc_select.name;
    this.obj['Modelo_id'] = raw_colecc_select.id;
    this.obj['Modelo_salt'] = raw_colecc_select.salt;
  }

  /* la idea seríai no enviar el nombre, sino sacarlo del id, pues esto permite separar la opción del idioma, sin embargo por facilidad de impresión al buscar, usaré esta
             */
  iniciarNuevoRegistro() {
    console.log('caracterizando');
    console.log(this._caracteristicas);
    const caracteristicas_seleccionadas = [];
    this.serial_raw = '';
    this.ob_final = {};
    this.serial_salt = '';
    this._caracteristicas.forEach((item, index) => {
      if (item) {
        const nombre_caracteristica = this.obtenerNombreCaracteristica(index).nombre;
        const id_caracteristica = this.obtenerNombreCaracteristica(index).id;
        const id_opcion = item.id;
        const name_opcion = item.name;

        caracteristicas_seleccionadas.push({
          nombre_caracteristica: nombre_caracteristica,
          id_caracteristica: id_caracteristica,
          id_opcion: id_opcion,
          nombre_opcion: name_opcion
        });
        this.serial_salt += item.salt;
      }
    });

    this.serial_raw = this.obj['coleccion_salt'] + this.obj['Modelo_salt'] + '-' + Math.round(Math.random() * 100) + '-' + this.serial_salt;
    this.serial_md5 = this.hasher.encriptarSerial(this.serial_raw);
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
      'serial_md5': this.serial_md5
    };

    this.db.pushReloj(this.ob_final);
    this.ob_final = {};
    this.obj = [];
    // this.col
    console.log(this.obj);
    console.log(this.ob_final);
  }

  obtenerNombreCaracteristica(th: any): any {
    return this.estructura.opciones.find(value => value.id === th);
  }
}
