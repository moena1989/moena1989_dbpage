import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {HasherService} from '../hasher.service';
import {ModelsSevice} from '../models/model-cajas.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {DBS} from '../../../environments/environment';
import * as firebase from 'firebase';
import {take} from 'rxjs/operators';

export interface MCaja {
  numeroDeLote: number;
  numeroDeCaja: number;
  diametroInterno: string;
  diametroExterno: string;
  fechaCreacion: Date;
  fechaUltimaModificacion: Date;
  modelo: string;
  materiales: string[];
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
  private mainDb: AngularFirestore;
  private mainStorage: AngularFireStorage;
  // private afs: AngularFirestoreDocument<any>;
  // private mainAfs: AngularFirestore;

  constructor(private hasher: HasherService, private est: ModelsSevice, private storage: AngularFireStorage, zone: NgZone) {
    this.mainDb = new AngularFirestore(DBS.main, 'main',
      false, null, null, zone, null);
    this.mainStorage = new AngularFireStorage(DBS.main, 'main',
      'moena-1989.appspot.com', null, zone);
  }

  getNewid() {
    return this.mainDb.createId();
  }

  getUserData(uid: string) {
    return this.mainDb.collection('users').doc(uid).valueChanges();
  }

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::  PUSHES
  pushCaja(serialCaja: string, caja: MCaja) {
    return this.afs.collection('cases').doc(serialCaja).set(caja);
  }

  pushLote(serialLote: string, lote: MLote) {
    return this.afs.collection<MLote>('lots').doc(serialLote).set(lote);
  }

  pushReloj(serial: string, reloj: MReloj) {
    // aquí se hará el proceso de generación de nuevo serial;
    return this.afs.collection('watches').doc(serial).set(reloj);
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
    return this.afs.collection<MReloj>('watches').doc(serial).get();
  }

  // todo ELIMINAR TODO LUGAR DONDE SE USA ESTE METODO Y REMPLAZARLO POR SetNewImage
  pushImage(img: File, route: any, alFinalizar: (url: string) => void) {
    const id = this.getNewid();
    const array = img.name.split('.');
    const l = array.length;
    const extension = array[l - 1];
    const finalRoute = route + '/' + id + '.' + extension;
    this.mainStorage.upload(finalRoute, img).then(a => {
      console.log('se subió');
      console.log(a);
      this.mainStorage.ref(finalRoute).getDownloadURL().toPromise().then(value => {
        alFinalizar(value);
      });
    });
  }

  setNewImage(img: File, route: any): Promise<any> {
    return new Promise(resolve => {
      const id = this.mainDb.createId();
      const array = img.name.split('.');
      const l = array.length;
      const ext = array[l - 1];
      const finalRoute = route + '/' + id + '.' + ext;
      this.mainStorage.upload(finalRoute, img).then(a => {
        this.mainStorage.ref(finalRoute).getDownloadURL().toPromise().then(value => {
          resolve({
            url: value,
            extension: ext,
            id: id
          });
        });
      });
    });
  }

  deleteImage(route: any, imgData: any) {
    const finalRoute = route + '/' + imgData.id + '.' + imgData.extension;
    return this.mainStorage.ref(finalRoute).delete();
  }

  updateImage(img: any, route: any, id: string) {
    return new Promise(resolve => {
      const array = img.name.split('.');
      const l = array.length;
      const ext = array[l - 1];
      const finalRoute = route + '/' + id + '.' + ext;
      this.mainStorage.upload(finalRoute, img).then(a => {
        this.mainStorage.ref(finalRoute).getDownloadURL().toPromise().then(value => {
          resolve({
            url: value,
            extension: ext,
            id: id
          });
        });
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
    return this.mainDb.collection(tipoProducto).doc('tendencias').collection(nombreTendencia).valueChanges();
  }

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::  UPDATE


  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::  GETS

  // getCajasDisponibles(filtros: MFiltro[]) {
  //   return this.afs.collection('cases', ref => {
  //     let item = ref;
  //     filtros.forEach(value => {
  //       // @ts-ignore
  //       item = item.where(value.nombrePropiedad, '==', value.valor);
  //     });
  //     return item;
  //   }).get();
  // }

  getCajasDisponibles(filtroCaja: MFiltro) {
    return this.afs.collection<MCaja>('cases', ref => {
      return ref
        .where('estado', '==', this.est.ESTADOS_CAJA.DISPONIBLE)
        .where('modelo', '==', filtroCaja.modelo)
        .where('diametroInterno', '==', filtroCaja.diametroInterno)
        .where('diametroExterno', '==', filtroCaja.diametroExterno);
    }).get();
  }

  addMeta(obj: any) {
    // SI EL OBJETO TIENE METADATA, ES PORQUE YA EXISTE EN LA BASE DE DATOS.
    obj['metadata'] = {
      id: this.mainDb.createId(),
      creationDate: new Date(),
      lastModificationDate: new Date(),
      by: {}
    };
    // id: this.currentData.userData.id,
    // name: this.currentData.userData.name,
    // lastname: this.currentData.userData.lastname,
    return obj;
  }

  getItems(productType: string, category: string, itemType: string) {
    return this.mainDb.collection(productType + '/' + category + '/' + itemType).valueChanges();
  }

  // ${key}
  getCaseByFilters(itemType: string, modelId: any, externalDiameter: any) {
    return this.mainDb.collection('productsData/' + 'watches/' + itemType, ref => {
      // TODO: revisar externalDiameters, pues no es la forma definitiva...
      return ref
        .where('model.metadata.id', '==', modelId)
        .where('externalDiameter.name', '==', externalDiameter);
    }).valueChanges();
  }

// TODO: SI O SI ARRAY FILTER ES DE (3)
  getItemsByWhereFilters(itemType: string, whereFilters: any[]) {
    return this.mainDb.collection('watches/' + 'structures/' + itemType, ref => {
      // TODO: revisar externalDiameters, pues no es la forma definitiva...
      let s = ref;
      whereFilters.forEach(value => {
        s = s.where(value.a, value.b, value.c);
      });
      return s;
    }).valueChanges();
  }

  getGeneralItemsByWhereFilters(typeProduct: string, category: string, itemType: string, whereFilters: any[]) {
    return this.mainDb.collection(typeProduct + '/' + category + '/' + itemType, ref => {
      // TODO: revisar externalDiameters, pues no es la forma definitiva...
      let s = ref;
      whereFilters.forEach(value => {
        s = s.where(value.a, value.b, value.c);
      });
      return s;
    }).valueChanges();
  }

  pushItem(productType: string, itemType: string, partType: string, item: any) {
    item = this.addMeta(item);
    return new Promise(resolve => {
      this.mainDb.collection(productType + '/' + itemType + '/' + partType).doc(item.metadata.id).set(item).then(value => {
        resolve(item);
      });
    });
  }

  updateItemV2(productType: string, category: string, itemType: string, item: any) {
    console.log('actualizando', productType + '/' + category + '/' + itemType);
    return this.mainDb.collection(productType + '/' + category + '/' + itemType).doc(item.metadata.id).set(item);
  }

  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::  DELETES
  deleteItemV2(productType: string, category: string, itemType: string, item: any) {
    return this.mainDb.collection(productType + '/' + category + '/' + itemType).doc(item.metadata.id).delete();
  }

  setUserData(uid: string, user: any) {
    return this.mainDb.collection('users').doc(uid).set(user);
  }

  regNewIncrement(productType: string, category: string, itemType: string, currrentCode: any) {
    return new Promise(resolve => {
      console.log('aqui');
      const s = this.mainDb.doc(productType + '/' + category + '/' + itemType + '/' + currrentCode)
        .valueChanges().pipe(take(1)).subscribe(value => {
          let counter = 0;
          if (value !== undefined) {
            counter = value['numberOfLots'];
            this.mainDb.collection(productType + '/' + category + '/' + itemType).doc(currrentCode)
              .update({numberOfLots: firebase.firestore.FieldValue.increment(1)}).then(value1 => {
              console.log(value);
              s.unsubscribe();
              resolve(counter + 1);
            });
          } else {
            console.log('PRIMER REGISTRO DE:' + currrentCode);
            this.mainDb.collection(productType + '/' + category + '/' + itemType).doc(currrentCode)
              .set({numberOfLots: firebase.firestore.FieldValue.increment(1)}).then(value1 => {
              console.log(value);
              s.unsubscribe();
              resolve(counter + 1);
            });
          }
        });
    });

  }
}

