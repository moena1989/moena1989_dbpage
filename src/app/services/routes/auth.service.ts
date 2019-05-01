import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {SettingsService} from '../settings.service';
import {HttpClient} from '@angular/common/http';
import {AngularFirestore} from '@angular/fire/firestore';
import {environment} from '../../environment/dbs';
import {CurrentStorageService} from '../current-storage.service';

@Injectable()
export class AuthService {
  userDetails: firebase.User = null;
  uri = 'http://localhost:4000/auth';
  private user: Observable<firebase.User>;
  private dbMain: AngularFirestore;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router,
              tools: SettingsService, private http: HttpClient, zone: NgZone, private current: CurrentStorageService) {
    this.dbMain = new AngularFirestore(environment.main, 'main',
      false, null, null, zone, null);
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.traerDatosUsuario(user.uid).subscribe(datosUsuario => {
            this.current.datosUsuario = datosUsuario;
            console.log(this.current.datosUsuario);
          });
          this.userDetails = user;
          tools.gUser = this.userDetails;
        } else {
          this.userDetails = null;
        }
      }
    );
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  signInWithEmail(user, pass) {
    return new Promise(resolve => {
      this._firebaseAuth.auth.signInWithEmailAndPassword(user, pass).then(value => {
        if (value) {
          // this.pushDevData(value.user.uid);
          this.traerDatosUsuario(value.user.uid).subscribe(datosUsuario => {
            this.current.datosUsuario = datosUsuario;
            resolve(true);
            console.log(this.current.datosUsuario);
          });
        } else {
          resolve(false);
        }
      }).catch(reason => {
        resolve(false);
      });
    });
  }

  signInWithZoho() {// jsonplaceholder.typicode.com/todos/1
    this.http.get('api/').subscribe(value => {
      console.log('se intenta login zoho');
      console.log(value);
    });
  }

  isLoggedIn() {
    return this.userDetails !== null;
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }

  traerDatosUsuario(uid: string) {
    return this.dbMain.collection('usuarios').doc(uid).valueChanges();
  }

  private pushDevData(uid: string) {
    const user = {
      uid: uid,
      correo: 'anfgc01@gmail.com',
      apellidos: 'González Castro',
      nombre: 'Andrés Fernando',
      tipoDocumento: 'Andrés Fernando',
      cargo: 'Administrador Supremo',
      documento: 'Andrés Fernando',
      sexo: 'Masculino',
      fechaCreacion: new Date(),
    };
    this.dbMain.collection('usuarios').doc(uid).set(user);
  }
}
