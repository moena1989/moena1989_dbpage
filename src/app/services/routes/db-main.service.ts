import {Injectable, NgZone} from '@angular/core';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {HasherService} from '../hasher.service';
import {ModelsSevice} from '../models/model-cajas.service';
import {AngularFireStorage} from '@angular/fire/storage';
import * as firebase from 'firebase';
import {take} from 'rxjs/operators';
import {DBS} from '../../../db/dbConfig';

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
  currentUser: any;
  await;
  private afs: AngularFirestoreDocument<any>;
  private mainDb: AngularFirestore;
  private mainStorage: AngularFireStorage;

  constructor(private hasher: HasherService, private est: ModelsSevice, private storage: AngularFireStorage, zone: NgZone) {
    this.mainDb = new AngularFirestore(DBS.main, 'main',
      false, null, null, zone, null);
    this.mainStorage = new AngularFireStorage(DBS.main, 'main',
      'moena-1989.appspot.com', null, zone);
  }

  getUserData(uid: string) {
    return this.mainDb.collection('dashboard/users/data', ref => {
      return ref.where('uid', '==', uid);
    }).valueChanges();
  }

  addMeta(obj: any) {
    console.log('meta:', this.currentUser);
    // SI EL OBJETO TIENE METADATA, ES PORQUE YA EXISTE EN LA BASE DE DATOS.
    obj['metadata'] = {
      id: this.mainDb.createId(),
      creationDate: firebase.firestore.Timestamp.fromDate(new Date()),
      lastModificationDate: firebase.firestore.Timestamp.fromDate(new Date()),
      creator: {
        name: this.currentUser.name,
        lastname: this.currentUser.lastname,
        uid: this.currentUser.uid
      }
    };
    return obj;
  }

  setSupportedCurrency(supportCurrencyItem: any) {
    supportCurrencyItem = this.addMeta(supportCurrencyItem);
    return this.mainDb.collection('currencies/').doc(supportCurrencyItem.metadata.id).set(supportCurrencyItem);
  }

  getItems(productType: string, category: string, itemType: string) {
    console.log('get: ', productType + '/' + category + '/' + itemType);
    return this.mainDb.collection(productType + '/' + category + '/' + itemType).valueChanges();
  }

  getItemsByWhereFilters(itemType: string, whereFilters: any[]) {
    return this.mainDb.collection('watches/' + 'structures/' + itemType, ref => {
      // TODO: revisar externalDiameters, pues no es la forma definitiva...
      let s = ref;
      whereFilters.forEach(value => {
        // @ts-ignore
        s = s.where(value.a, value.b, value.c);
      });
      return s;
    }).valueChanges();
  }


  getItemById(typeProduct: string, category: string, itemType: string, id: string) {
    // console.log('TESTING ITEM BY ID');
    return this.mainDb.doc(typeProduct + '/' + category + '/' + itemType + '/' + id).valueChanges();

  }

  getGeneralItemsByWhereFilters(typeProduct: string, category: string, itemType: string, whereFilters: any[]) {
    console.log('se filtra en: ', typeProduct + '/' + category + '/' + itemType, whereFilters);
    return this.mainDb.collection(typeProduct + '/' + category + '/' + itemType, ref => {
      // TODO: revisar externalDiameters, pues no es la forma definitiva...
      let s = ref;
      whereFilters.forEach(value => {
        // @ts-ignore
        s = s.where(value.a, value.b, value.c);
      });
      return s;
    }).valueChanges();
  }

  async pushItem(productType: string, itemType: string, partType: string, item: any) {
    item = this.addMeta(item);
    console.log('post: ', productType + '/' + itemType + '/' + partType);
    return new Promise(resolve => {
      this.mainDb.collection(productType + '/' + itemType + '/' + partType).doc(item.metadata.id).set(item).then(value => {
        resolve(item);
      });
    });
  }

  setUserData(uid: string, user: any) {
    return new Promise(resolve => {
      this.mainDb.collection('dashboard/private/users/').doc(uid).set(user).then(value => {
        resolve(user);
      });
    });
  }

  async increment(productType: string, category: string, itemType: string, counterId: any) {
    return new Promise(resolve => {
      // console.log('aqui');
      const s = this.mainDb.doc(productType + '/' + category + '/' + itemType + '/' + counterId)
        .valueChanges().pipe(take(1)).subscribe(value => {
          let counter = 0;
          if (value !== undefined) {
            counter = value['numberOfLots'];
            this.mainDb.collection(productType + '/' + category + '/' + itemType).doc(counterId)
              .update({numberOfLots: firebase.firestore.FieldValue.increment(1)}).then(value1 => {
              console.log(value);
              s.unsubscribe();
              resolve(counter + 1);
            });
          } else {
            console.log('PRIMER REGISTRO DE:' + counterId);
            this.mainDb.collection(productType + '/' + category + '/' + itemType).doc(counterId)
              .set({numberOfLots: firebase.firestore.FieldValue.increment(1)}).then(value1 => {
              console.log(value1);
              s.unsubscribe();
              resolve(counter + 1);
            });
          }
        });
    });
  }

  incrementV2(docPath: string, counterId: any) {
    return new Promise(resolve => {
      const s = this.mainDb.doc(docPath + '/' + counterId)
        .valueChanges().pipe(take(1)).subscribe(value => {
          let counter = 0;
          if (value !== undefined) {
            counter = value['counterVariable'];
            this.mainDb.collection(docPath).doc(counterId)
              .update({counterVariable: firebase.firestore.FieldValue.increment(1)}).then(value1 => {
              console.log(value);
              s.unsubscribe();
              resolve(counter + 1);
            });
          } else {
            this.mainDb.collection(docPath).doc(counterId)
              .set({counterVariable: firebase.firestore.FieldValue.increment(1)}).then(value1 => {
              console.log(value);
              s.unsubscribe();
              resolve(counter + 1);
            });
          }
        });
    });
  }
}

