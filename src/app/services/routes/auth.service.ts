import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DbMainService} from './db-main.service';
import {BeforeAppInitService} from '../before-app-init.service';
import {DbSelectorService} from '../../db-selector.service';
import {AngularFireAuth} from '@angular/fire/auth';
import {DBS} from '../../../db/dbConfig';

@Injectable()
export class AuthService {
  userDetails: firebase.User = null;
  uri = 'http://localhost:4000/auth';
  private user: Observable<firebase.User>;
  private secondary: firebase.app.App;
  private dbs_auth: AngularFireAuth;

  constructor(
    private router: Router,
    private http: HttpClient,
    zone: NgZone,
    private fbAuth: AngularFireAuth,
    private  dbMain: DbMainService,
    private dbs: DbSelectorService,
    private current: BeforeAppInitService) {
    this.secondary = firebase.initializeApp(DBS.main, 'Secondary');
    // definitivamente solo se puede hacer autoAuth con fbAuth, cargar manualmente desde dbs no funcina :/
    // todo: revisar esta mondá
    this.dbs_auth = fbAuth;
  }

  signInWithGoogle() {
    return this.dbs_auth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  signInWithEmail(user, pass) {
    return new Promise(resolve => {
      this.dbs_auth.auth.signInWithEmailAndPassword(user, pass).then(value => {
        console.log(value.user.uid);
        if (value.user.uid) {
          const d = this.dbs.getUserData(value.user.uid).subscribe(value1 => {
            // console.log(value1);
            if (value1) {
              this.current.userData = value1[0];
              resolve(true);
            }
            d.unsubscribe();
          });
        } else {
          resolve(false);
        }
      }).catch(reason => {
        resolve(false);
      });
    });
  }

  createInsideUser(email, pass) {
    // registra un nuevo usuario y lo cuenta :)
    // console.log('a');
    return new Promise(resolve => {
      this.secondary.auth().createUserWithEmailAndPassword(email, pass).then(value => {
        // console.log('b');
        if (value) {
          resolve(value.user.uid);
        } else {
          resolve(false);
        }
      }).catch(reason => {
        resolve(false);
      });
    });
  }

  createDevUser(email, pass) {
    return new Promise(resolve => {
      // 1.se crea la cuenta en firebase
      this.dbs_auth.auth.createUserWithEmailAndPassword(email, pass).then(value => {
        if (value) {// usuario creado con éxito
          this.pushDevData(value.user.uid, email).then(finalDataUser => {// se sube la información base del usuario.
            resolve(value.user.uid);
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
    return this.dbs_auth.auth.signOut();
  }

  private pushDevData(_uid: string, email: string) {
    // este es el borrador de nuevo usuario
    // todo: Buscar toda la información que se debe tener de un empleado real, es irla anexando aquí para ir pprobando.
    const user = {
      uid: _uid,
      email: 'anfgc01@gmail.com',
      lastname: 'González C',
      name: 'Andrés',
      docType: 'Cédula',
      m89id: email.split('@')[0],
      m89email: email,
      personalDocument: '65564594598',
      bussinesPosition: 'Administrador Supremo',
      sex: 'Masculino',
      _d: true,
      creationDate: new Date()
    };
    console.log('se inteta push dev data');
    return this.dbs.pushDocument(
      {iddb: 'main', path: 'dashboard/private/users'},
      user);
  }

  private organizeWorkerData(userData: any, uid: any) {
    // este es el borrador de nuevo usuario
    // todo: Buscar toda la información que se debe tener de un empleado real, es irla anexando aquí para ir pprobando.
    const user = {
      uid: uid,
      email: userData.email,
      lastname: userData.lastname,
      name: userData.name,
      bussinesPosition: userData.bussinesPosition,
      creationDate: new Date(),
      codeId: userData.codeId
    };
    return this.dbMain.setUserData(uid, user);
  }
}
