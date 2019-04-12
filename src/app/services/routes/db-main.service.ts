import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {HasherService} from '../hasher.service';
import {ModelsSevice} from '../models/model-cajas.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {environment} from '../../environment/dbs';


export interface MCaja {
  numeroDeLote: number;
  numeroDeCaja: number;
  diametroInterno: string;
  diametroExterno: string;
  fechaCreacion: Date;
  fechaUltimaModificacion: Date;
  modelo: string;
  materiales: string[];
  /////////
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
export class DbMainService {
  private afs: AngularFirestoreDocument<any>;
  private dbMain: AngularFirestore;
  private mainStorage: AngularFireStorage;
  // private afs: AngularFirestoreDocument<any>;
  // private mainAfs: AngularFirestore;

  constructor(private hasher: HasherService, private est: ModelsSevice, private storage: AngularFireStorage, zone: NgZone) {
    this.dbMain = new AngularFirestore(environment.main, 'main',
      false, null, null, zone, null);

    this.mainStorage = new AngularFireStorage(environment.main, 'main',
      'moena-1989.appspot.com', null, zone);

  }

  getNewKey() {
    return this.dbMain.createId();
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

  // TODO sé que este metodo se puede hacer muchisisisisimo mejor...   Done B)
  pushImage(img: File, route: any, alFinalizar: (url: string) => void) {
    const key = this.getNewKey();
    const array = img.name.split('.');
    const l = array.length;
    const ext = array[l - 1];
    const finalRoute = route + '/' + key + '.' + ext;
    this.mainStorage.upload(finalRoute, img).then(a => {
      console.log('se subió');
      console.log(a);
      this.mainStorage.ref(finalRoute).getDownloadURL().toPromise().then(value => {
        alFinalizar(value);
      });
    });
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
      });
    });
  }


  cargarModeloColeccion(tipoProducto: string, nombreTendencia: string) {
    return this.dbMain.collection(tipoProducto).doc('tendencias').collection(nombreTendencia).valueChanges();
  }

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::  UPDATE


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


  agregarMetadata(obj: any) {
    console.log(this.dbMain.createId());
    obj['metadata'] = {
      key: this.dbMain.createId(),
      fechaCreacion: new Date(),
      idUsuario: 'sda',
    };
    return obj;
  }

  getItems(tipoItem: string) {
    return this.dbMain.collection('datosProductos/' + 'relojes/' + tipoItem).valueChanges();
  }

  getItem(tipoItem: string, keyItem: string) {
    return this.dbMain.collection('datosProductos/' + 'relojes/' + tipoItem).doc(keyItem).valueChanges();
  }

  setItem(tipoProducto: string, item: any) {
    item = this.agregarMetadata(item);
    return this.dbMain.collection('datosProductos/' + 'relojes/' + tipoProducto).doc(item.metadata.key).set(item);
  }

  updateItem(tipoProducto: string, tipoItem: string, item: any) {
    return this.dbMain.collection('datosProductos/' + 'relojes/' + tipoItem).doc(item.metadata.key).set(item);
  }

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::  DELETES
  deleteImg(downloadUrl) {
    return this.storage.ref('').child(downloadUrl).delete();
  }

  deleteSpecificModel(tipoModel: string, nombreModel: string) {
    return this.dbMain.collection('relojes').doc('modelos').collection(tipoModel).doc(nombreModel).delete();
  }


}

