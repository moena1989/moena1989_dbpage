import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient} from '@angular/common/http';
import {DbMainService} from './db-main.service';
import {CurrentStorageService} from '../current-storage.service';

@Injectable()
export class AuthService {
  userDetails: firebase.User = null;
  uri = 'http://localhost:4000/auth';
  private user: Observable<firebase.User>;

  constructor(private _firebaseAuth: AngularFireAuth,
              private router: Router, private http: HttpClient,
              zone: NgZone, private  dbMain: DbMainService, private current: CurrentStorageService) {
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
          console.log(value);
          // this.pushDevData(value.user.uid);
          this.current.automaticAuth().then(value1 => {
            resolve(true);
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

  private pushDevData(uid: string) {
    // este es el borrador de nuevo usuario
    // todo: Buscar toda la información que se debe tener de un empleado real, es irla anexando aquí para ir pprobando.
    const user = {
      id: uid,
      email: 'anfgc01@gmail.com',
      lastname: 'González Castro',
      name: 'Andrés Fernando',
      docType: 'Cédula',
      bussinesPosition: 'Administrador Supremo',
      document: '65564594598',
      sex: 'Masculino',
      creationDate: new Date(),
    };
    this.dbMain.setUserData(uid, user);
  }
}
