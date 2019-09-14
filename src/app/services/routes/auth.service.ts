import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClient} from '@angular/common/http';
import {DbMainService} from './db-main.service';
import {CurrentStorageService} from '../current-storage.service';
import {DBS} from '../../../environments/environment';
import {HasherService} from '../hasher.service';

@Injectable()
export class AuthService {
  userDetails: firebase.User = null;
  uri = 'http://localhost:4000/auth';
  private user: Observable<firebase.User>;
  private mn: firebase.app.App;

  constructor(private _firebaseAuth: AngularFireAuth,
              private router: Router, private http: HttpClient,
              zone: NgZone, private  dbMain: DbMainService, private current: CurrentStorageService) {

    this.mn = firebase.initializeApp(DBS.main, 'Secondary');
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
          const d = this.dbMain.getGeneralItemsByWhereFilters('system', 'private', 'users', [{
            a: 'uid',
            b: '==',
            c: value.user.uid
          }]).subscribe(value1 => {
            console.log(value1);
            if (value1[0]) {
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
    return new Promise(resolve => {
      this.mn.auth().createUserWithEmailAndPassword(email, pass).then(value => {
        if (value) {
          this.dbMain.incrementV2('dashboard', 'users', 'counters', 'internalUsers').then(counter => {
            console.log('el numero: ', counter);
            console.log('el code: ', HasherService.createUserCode(counter));
            console.log(HasherService.createUserCode(1));
            console.log(HasherService.createUserCode(2));
            console.log(HasherService.createUserCode(3));
            console.log(HasherService.createUserCode(5));
            console.log(HasherService.createUserCode(7));
            const t = {
              uid: value.user.uid,
              codeId: HasherService.createUserCode(counter)
            };
            resolve(t);
          });
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
      this.mn.auth().createUserWithEmailAndPassword(email, pass).then(value => {
        if (value) {// usuario creado con éxito
          this.pushDevData(value.user.uid).then(finalDataUser => {// se sube la información base del usuario.
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
    // this._firebaseAuth.cha
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }

  private pushDevData(uid: string) {
    // este es el borrador de nuevo usuario
    // todo: Buscar toda la información que se debe tener de un empleado real, es irla anexando aquí para ir pprobando.
    const user = {
      uid: uid,
      email: 'anfgc01@gmail.com',
      lastname: 'González Castro',
      name: 'Andrés Fernando',
      docType: 'Cédula',
      bussinesPosition: 'Administrador Supremo',
      document: '65564594598',
      sex: 'Masculino',
      _d: true,
      creationDate: new Date()
    };
    console.log('se inteta push dev data');
    return this.dbMain.setUserData(uid, user);
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
