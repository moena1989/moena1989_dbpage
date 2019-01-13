import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';
import * as firebase from 'firebase';
import {ClockModel, LoteCajaModel, MetadataAttr} from '../_models/clockModel';


@Injectable({
  providedIn: 'root'
})
export class DbService {

  /*
  Servicio encargado de traer, y organizar los datos para la creación de cada reloj, contiene la estructura de cada uno de los registros.
   */
  /// TODO buscar una manera mas organizada de manejar, los objetos de las páginas routiadas.
  relojBuscado: any;

  authState = null;
  userLogueado: any = {};

  constructor(public db: AngularFireDatabase, private afStorage: AngularFireStorage,
              private firebaseAuth: AngularFireAuth, private router: Router) {

    this.firebaseAuth.authState.subscribe(value => {
      console.log('Comprobando auth fiirebase...');

      this.authState = value;
    });
  }


  push_nuevo_lote_de_material_y_diametro(com: any) {
    // Registro a los lotes generales
    const k = this.db.list('/data/full_regs/lots/').push(com).key;
  }

  push_nueva_caja(nueva_caja: any) {
    // Se guarda registro general
    this.db.object('data/full_regs/cases/').set(nueva_caja);
    // guardo registro ordenado
    this.db.list('data/cases/' + nueva_caja.material + '/' + nueva_caja.diametro + '/availables/').push(nueva_caja);
  }

  // ________________________BUSQUEDAS
  buscar_cajas_disponibles(material: any, diametro: any, lote: number) {
    this.db.list('data/cases/' + material + '/' + diametro + '/availables',
      ref => ref.orderByChild('lote').equalTo(lote)).valueChanges().subscribe(value => {
      console.log('probando seriales');
      console.log(value);
      return value;
    });
  }

  buscar_info_lote(material: string, diameter: number) {
    return this.db.object('data/cases/' + material + '/' + diameter + '/metadata').valueChanges();
  }

  set_informacion(material: string, diameter: number, loteData: MetadataAttr) {
    return this.db.object('data/cases/' + material + '/' + diameter + '/metadata').set(loteData);
  }

  buscarDatosUsuarios(uid: string, ff: () => void) {
    console.log(uid);
    this.db.object('workers/' + uid).valueChanges().subscribe(value => {
      this.userLogueado = value;
      console.log('se trae la info del usuario');
      console.log(this.userLogueado);
      ff();
    });
  }

  buscarReloj(serial: string, callback: (result: any) => any) {
    this.db.object('relojes/seriales/' + serial).valueChanges().subscribe(value => {
      console.log('SI EXISTE SERIAL');

      this.db.object('relojes/data/' + value).valueChanges().subscribe(datosReloj => {
        // significa que el serial si existe en la base, ahora se busca la info de ese puntualmente
        callback(datosReloj);
      });
    });
  }

  logIn(email: string, pass: string, result: (ho: any) => any) {
// TODO no REGRESAR any, buscar el objeto puntual
    this.firebaseAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(auth => {
          console.log(auth.user.uid);
          this.buscarDatosUsuarios(auth.user.uid, () => {
            result(auth.user.uid);
          });
        }
      )
      .catch(err => {
        console.log(err);
        result(null);
      });
  }

  logOut() {
    this.firebaseAuth
      .auth
      .signOut();
    this.authState = null;
  }

  get_info_current_lote(): Observable<any | null> {
    return this.db.object('general_info/lots').valueChanges();
  }

  private pushAllNewUserInfo(user: any, uid: string) {
    const itemRef = this.db.object('workers/' + uid);
    itemRef.set({
      email: user.email,
      name: user.name,
      last_name: user.last_name,
      sex: 'asd',
      cargo: user.cargo
    });
    this.router.navigate(['/logIn']);
  }

  get authenticated(): boolean {
    return (this.authState !== null);
  }


  updateCurrentLote(current_lot: any) {
    this.db.object('general_info/lots/current').update(current_lot);
  }

  updateLotesRegistrados(com: any) {
    this.db.object('general_info/lots/finalizados').set(com);
  }

  updateLoteN(com: any) {
    this.db.object('general_info/lots/num_nuevo_lote').set(com);
  }

  // ________________________PUSHESS
  pushNuevoUsuario(usr: any, pass: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(usr.email, pass)
      .then(value => {
        console.log('Registro exitoso__');
        console.log(value);
        this.pushAllNewUserInfo(usr, value.user.uid);
        this.router.navigate(['/logIn']);
      })
      .catch(err => {
        if (err) {
        } else {
          console.log('Something went wrong:');
        }
      });
  }

  pushReloj(reloj: ClockModel, img_clock: File, alFinalizar: (url: string) => void): void {
    const key = this.db.list('relojes/data').push(reloj).key;
    this.db.object('relojes/seriales/' + reloj.metadata.serial_def).set(key);

    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child('clocks_imgs/' + key).put(img_clock);
    console.log('se inicia subida');
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
      },
      (error) => {
        console.log(error);
      },
      () => {
        firebase.storage().ref('clocks_imgs/' + key).getDownloadURL().then(url => {
          console.log('la url es:' + url);
          this.db.object('relojes/data/' + key + '/metadata/img_url').set(url);
          // agrego la url al objeto de acá. la img, es lo único que funciona de forma distinta.
          alFinalizar(url);
        });
      }
    );
  }
}
