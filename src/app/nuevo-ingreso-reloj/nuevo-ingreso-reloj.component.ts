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
  /*/
  variables de seleccion
   */

  pr = true;
  modelo: any = '';
  coleccion: any = '';
  material: any = '';
  maquinaria: any = '';
  color_maq: any = '';
  mat_pulso: any = '';
  madera: any = '';
  color_pulso: any = '';
  manos: any = '';
  lote: any = '';
  piezas: any = '';
  serial_raw: string;
  serial_md5: string;
  est: ModelsService;
  colecciones: any;
  colecciones_del_modelos: any[];
  est_modelo_selected: any;
  colecciones_del_modelo_selected: any[];
  private _colecc_del_modelo_selected: any[];
  opciones_por_ver: any[];


  obj: any[] = [];
  opcionesFiltradas: any[];


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
    // var obj = {};
    console.log(this.obj);
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


    this.obj[raw_colecc_select.name] = '';
    this.obj['Modelo'] = raw_colecc_select.name;
  }


  iniciarNuevoRegistro() {
    // se confirma que todos los datos fueron ingresados
    // if (this.comprobarCampos()) {
    //   this.gestinarDatos();
    // } else {
    //   console.log('Revisa todos los campos para poder continuar!');
    // }
  }


  // comprobarCampos(): boolean {
  //   console.log('Se comprueban los campos');
  //   this.pr = true;
  //   if (this.modelo === null) {
  //     console.log(1);
  //
  //     this.pr = false;
  //   }
  //
  //   if (this.coleccion === '') {
  //     console.log(2);
  //     this.pr = false;
  //   }
  //
  //   if (this.material === '') {
  //     console.log(3);
  //     this.pr = false;
  //   }
  //
  //   if (this.maquinaria === '') {
  //     console.log(4);
  //     this.pr = false;
  //   }
  //
  //   if (this.color_maq === '') {
  //     console.log(5);
  //     this.pr = false;
  //   }
  //
  //   if (this.mat_pulso === '') {
  //     console.log(6);
  //     this.pr = false;
  //   }
  //
  //   if (this.madera === '') {
  //     console.log(7);
  //     this.pr = false;
  //   }
  //   if (this.color_pulso === '') {
  //     console.log(8);
  //     this.pr = false;
  //   }
  //   console.log(this.piezas);
  //   return this.pr;
  // }

  private gestinarDatos() {
    this.serial_raw =
      this.manos.salt +
      this.lote.salt +
      this.piezas.salt +

      Math.round(Math.random() * 1000) +
      '-'
      +
      this.modelo.salt +
      this.coleccion.salt +
      this.material.salt +
      this.maquinaria.salt +
      this.color_maq.salt +
      this.mat_pulso.salt +
      this.madera.salt;

    this.serial_md5 = this.hasher.encriptarSerial(this.serial_raw);
    console.log(this.serial_raw);
    // this.serial_md5 = 'Pruebas  ';

    const date = formatDate(Date.now(), 'dd-MM-yyyy hh:mm:ss a', 'en-US', '-500');

    const relojData = {
      serial: this.serial_raw,
      ref_md: this.serial_md5,
      modelo: this.modelo.name,
      coleccion: this.coleccion.name,
      material_principal: this.material.name,
      maquinaria: this.maquinaria.name,
      color_maquinaria: this.color_maq.name,
      material_pulso: this.mat_pulso.name,
      madera: this.madera.name,
      fecha: date,
      lote: this.lote.name,
      piezas: this.piezas.name,
      manos: this.manos.name
    };

    console.log(relojData);
    this.db.subirNuevoRegistroReloj(relojData);
    console.log('probando en fb');
  }

  traerColecciones() {

  }

  private buscarOpciones() {
    console.log('se buscan las opciones');
  }


  rdas() {
    console.log(this.obj);
  }
}
