import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {HasherService} from './_services/hasher.service';
import {ModelCajasService} from './model-cajas.service';

export interface MCaja {
  numeroDeLote: number;
  numeroDeCaja: number;
  diametroInterno: string;
  diametroExterno: string;
  fechaCreacion: Date;
  fechaUltimaModificacion: Date;
  modelo: string;
  materiales: string[];
  //////////
  estado: string;
  urlImagen: string;
  serial: string;
  serialMaterial: string;
  serialLote: string;
}


export interface MetaLote {
  idUltimoEmpleado: string;
  fechaUltimoRegistro: Date;
  lotesTotales: number;
  cajasTotales: number;
}

export interface MLote {
  numeroDeLote: number;
  diametroInterno: string;
  fechaCreacion: Date;
  fechaUltimaModificacion: Date;
  modelo: string;
  cajasTotales: number;
  materiales: string[];
  id: string;
  diametroExterno: string;
}

export interface MReloj {
  estado: string;
  coleccion: string;
  modelo: string;
  colorMaquinaria: string;
  pulso: string;
  diamtroExterno: string;
  diametroInterno: string;
  serial: string;
  urlImagen: string;
  fechaCreacion: Date;
  fechaUltimaModificacion: Date;
  numeroDeLote: number;
  numeroDeCaja: number;
  salts: string[];
}

// export class MReloj {
//   coleccion: string;
//   modelo: string;
//   colorMaquinaria: string;
//   pulso: string;
//   idCaja: string;
//   diamtroExterno: string;
//   diametroInterno: string;
//   serial: string;
//   fechaCreacion: Date;
//   fechaUltimaModificacion: Date;
//   urlImagen: string;
//   id: string;
// }


export interface MFiltro {
  modelo: string;
  diametroInterno: string;
  diametroExterno: string;
}

@Injectable({
  providedIn: 'root'
})
export class DbManagerFirestoreService {
  private afs: AngularFirestoreDocument<any>;
  private mainAfs: AngularFirestore;

  constructor(private _afs: AngularFirestore, private hasher: HasherService, private est: ModelCajasService) {
    this.afs = this._afs.collection('main').doc('private');
    this.mainAfs = _afs;
  }

  getUniqId() {
    return this.mainAfs.createId();
  }

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::  PUSHES
  pushCaja(serialCaja: string, caja: MCaja) {
    return this.afs.collection('cajas').doc(serialCaja).set(caja);
  }

  pushLote(serialLote: string, lote: MLote) {
    return this.afs.collection<MLote>('lotes').doc(serialLote).set(lote);
  }

  pushReloj(serial: string, reloj: MReloj) {
    // aquí se hará el proceso de generación de nuevo serial;
    return this.afs.collection('relojes').doc(serial).set(reloj);
  }

// ::::::::::::::::::::::::::::::: METODO IMPORTANTISIMO E INTOCABLE UNA VEZ EN PRODUCCIÓN.
  getNuevoSerialReloj(reloj: MReloj, resutlt: (serialModeloUnico: string) => void) {
    const serialModelo = reloj.salts.join('');
    this.afs.collection('entorno').doc('intocable')
      .collection('contadoresSerialesRelojeria').doc(serialModelo).get().subscribe(value => {
      let data = value.data();
      if (data) {
        data = {
          numeroUnico: +value.data().numeroUnico + 1,
          fechaUltimoRegistro: new Date(),
          idEmpleado: '',
          nombreEmpleado: ''
        };
      } else {
        data = {
          numeroUnico: 0,
          fechaUltimoRegistro: new Date(),
          idEmpleado: '',
          nombreEmpleado: ''
        };
      }
      console.log(reloj.numeroDeCaja);
      const serial = serialModelo + '-' +
        this.hasher.encriptarSerial(serialModelo, data.numeroUnico, reloj.numeroDeLote, reloj.numeroDeCaja);
      this.afs.collection<MLote>('entorno').doc('intocable')
        .collection('contadoresSerialesRelojeria').doc(reloj.salts.join('')).set(data).then(value1 => {
        ////// aquí se completa todo....
        resutlt(serial);
      });
    });
  }

  getReloj(serial: string) {
    return this.afs.collection<MReloj>('relojes').doc(serial).get();
  }

  // TODO sé que este metodo se puede hacer muchisisisisimo mejor...
  pushImage(img: File, name: any, route: any, alFinalizar: (url: string) => void) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(route + '/' + name + '.jpg').put(img);
    console.log('se inicia subida de imagen ;)');
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
      },
      (error) => {
        console.log(error);
      },
      () => {
        firebase.storage().ref(route + '/' + name + '.jpg').getDownloadURL().then(url => {
          // console.log('la url es ' + url);
          alFinalizar(url);
        });
      }
    );
  }

// hay que buscar una manera mas optima de organizar los contadores,
// no sé como pasar el subSubscripción, por ende, lo resolveré por callback
  updateMetadataLote(salesBase: string, salesMateriales, metaLote: MetaLote, callback: (meta: MetaLote) => void) {
    this.afs.collection<MLote>('entorno').doc('contadores')
      .collection('lotesCaja').doc(salesBase + '-' + salesMateriales).get().subscribe(value => {
      console.log('////////////////////////////////////////////////////////////////');
      if (value.data()) {
        metaLote.lotesTotales = 1 + (+value.data().lotesTotales);
        metaLote.cajasTotales = metaLote.cajasTotales + (+value.data().cajasTotales);
      } else {
        metaLote.lotesTotales = 1;
        console.log('noExisto', metaLote.lotesTotales);
      }
      // metaLote.serialUltimoLote += '-' + metaLote.lotesTotales;
      callback(metaLote);
      this.afs.collection<MLote>('entorno').doc('contadores')
        .collection('lotesCaja').doc(salesBase + '-' + salesMateriales).set(metaLote).then(value1 => {
        // se solucionó contador
        console.log('se intenta counter');
        ////// aquí se completa todo....
      });
    });
  }

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::  UPDATE

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::  REMOVES

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::  GETS
  // getCajasDisponibles(filtros: MFiltro[]) {
  //   return this.afs.collection('cajas', ref => {
  //     let item = ref;
  //     filtros.forEach(value => {
  //       // @ts-ignore
  //       item = item.where(value.nombrePropiedad, '==', value.valor);
  //     });
  //     return item;
  //   }).get();
  // }

  getCajasDisponibles(filtroCaja: MFiltro) {
    return this.afs.collection<MCaja>('cajas', ref => {
      return ref
        .where('estado', '==', this.est.ESTADOS_CAJA.DISPONIBLE)
        .where('modelo', '==', filtroCaja.modelo)
        .where('diametroInterno', '==', filtroCaja.diametroInterno)
        .where('diametroExterno', '==', filtroCaja.diametroExterno);
    }).get();
  }
}

