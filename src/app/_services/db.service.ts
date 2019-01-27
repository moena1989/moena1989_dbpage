import {Injectable} from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import * as firebase from 'firebase';
import {MetadataAttr} from '../_models/clockModel';
import {ModelCajasService} from '../model-cajas.service';
import {auth} from 'firebase';


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
              private firebaseAuth: AngularFireAuth, private router: Router, private estructura: ModelCajasService) {
    this.firebaseAuth.authState.subscribe(value => {
      this.authState = value;
    });
  }

  get currentUser(): any {
    return this.authenticated ? this.authState.auth : null;
  }

// Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  login() {
    return this.firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

  // ________________________BUSQUEDAS
  buscar_cajas_disponibles(material: any, diametro: any, lote: number) {
    this.db.list('data/cases/' + material + '/' + diametro + '/availables',
      ref => ref.orderByChild('num_lote').equalTo(lote)).valueChanges().subscribe(value => {
      console.log('probando seriales');
      console.log(value);
      return value;
    });
  }

  buscar_info_lote(modelo: string) {
    return this.db.object('data/cases/' + modelo + '/metadata').valueChanges();
  }

  set_informacion(modelo: string, loteData: MetadataAttr) {
    this.db.object('data/cases/' + modelo + '/metadata').set(loteData);
  }

  buscarDatosUsuarios(uid: string, ff: () => void) {
    // console.log(uid);
    // this.db.object('workers/' + uid).valueChanges().subscribe(value => {
    //   this.userLogueado = value;
    //   console.log('se trae la info del usuario');
    //   console.log(this.userLogueado);
    //   ff();
    // });
  }

  buscarReloj(serial: string) {
    const serial_splitted = serial.split('-');
    const b = serial_splitted[0].split('');

    let base_s = '';

    b.forEach(value1 => base_s += value1 + '/');
    const last_route = 'data/relojes/' + base_s + serial_splitted[1];
    console.log(last_route);
    return this.db.object(last_route).valueChanges();
  }

//   logIn(email: string, pass: string, result: (ho: any) => any) {
// // TODO no REGRESAR any, buscar el objeto puntual
//     this.firebaseAuth.auth.signInWithEmailAndPassword(email, pass)
//       .then(auth => {
//           console.log(auth.user.uid);
//           this.buscarDatosUsuarios(auth.user.uid, () => {
//             result(auth.user.uid);
//           });
//         }
//       )
//       .catch(err => {
//         console.log(err);
//         result(null);
//       });
//   }

  logOut() {
    this.firebaseAuth.auth.signOut();
    this.authState = null;
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

  cambiar_estado_caja(modelo: any, key_caja: any, estado: any) {
    this.db.object('data/cases/' + modelo + '/cajas' + '/' + key_caja + '/estado')
      .set(estado);
  }


  push_nueva_caja(nueva_caja: any) {
    nueva_caja.my_key = this.db.list('data/cases/' + nueva_caja.modelo + '/cajas').push(nueva_caja).key;
    this.update_caja(nueva_caja);
    return nueva_caja.my_key;
  }

  update_caja(nueva_caja: any) {
    this.db.object('data/cases/' + nueva_caja.modelo + '/cajas/' + nueva_caja.my_key).update(nueva_caja);
  }

  push_reloj(reloj: any) {
    // busco la caja seleccionada y la elimino de las disponibles
    this.cambiar_estado_caja(reloj.features.modelo, reloj.features.key_caja, this.estructura.ESTADOS_CAJA.ARMADO);
    // pusheo reloj
    const key = this.db.object('data/relojes/' + reloj.metadata.salts + '/' + reloj.metadata.serial).set(reloj);
    reloj.metadata.key = key;
  }

  push_image(img: File, name: any, route: any, alFinalizar: (url: string) => void) {
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
          console.log('la url es ' + url);
          alFinalizar(url);
        });
      }
    );
  }

  buscar_cajas_por_registrar(modelo: string) {
    return this.db.list('data/cases/' + modelo + '/cajas',
      ref => ref.orderByChild('estado').equalTo(this.estructura.ESTADOS_CAJA.DISPONIBLE)).valueChanges();
  }

  push_nuevo_lote(current_lote: any) {
    const key = this.db.list('/data/lotes').push(current_lote).key;
    // actualizar numero del num_lote
    // TODO veeeeeeeerrr como resolver esta metadata de una forma un poco mas coqueta.
    const meta = new MetadataAttr();
    meta.last_date = Date();
    meta.num_lote = current_lote.num_lote;
    meta.ultimo_lote_key = key;
    this.set_informacion(current_lote.modelo, meta);

// this.set_lote()
    current_lote.my_key = key;
    this.set_lote(current_lote);
    return key;
  }


  set_lote(current_lote: any) {
    this.db.object('/data/lotes/' + current_lote.my_key).update(current_lote);
  }


  get_lote(key_lote: string) {
    this.db.object('/data/lotes/' + key_lote).valueChanges();
  }
}
