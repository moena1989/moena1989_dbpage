import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {ToolsService} from './_services/tools.service';
import {HttpClient} from '@angular/common/http';
import {dom} from '@fortawesome/fontawesome-svg-core';

@Injectable()
export class AuthService {
  private user: Observable<firebase.User>;
  userDetails: firebase.User = null;
  uri = 'http://localhost:4000/auth';

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router, tools: ToolsService, private http: HttpClient) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;

          //  comprobar el domino al que pertenece este nuevo login...


            tools.gUser = this.userDetails;
          console.log(this.userDetails);
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

  signInWithZoho() {// jsonplaceholder.typicode.com/todos/1
    this.http.get('api/').subscribe(value => {
      console.log('se intenta login zoho');
      console.log(value);
    });
  }

  isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }


}
