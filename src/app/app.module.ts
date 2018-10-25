import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NuevoIngresoRelojComponent} from './nuevo-ingreso-reloj/nuevo-ingreso-reloj.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {BusquedaComponent} from './busqueda/busqueda.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {WorkerRegComponent} from './worker-reg/worker-reg.component';
import {SnackbarComponent} from './snackbar/snackbar.component';
import {AuthGuardService} from './auth-guard.service';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sign_up', component: WorkerRegComponent},
  {
    path: '', component: MainComponent, canActivate: [AuthGuardService], children: [
      {path: 'busqueda', component: BusquedaComponent},
      {path: 'reg', component: NuevoIngresoRelojComponent},
    ]
  }
];

const config = {
  apiKey: 'AIzaSyAh48TUW_EdI6fI6om3EMRCdlCC4U3n9U8',
  authDomain: 'moenamaindb.firebaseapp.com',
  databaseURL: 'https://moenamaindb.firebaseio.com',
  projectId: 'moenamaindb',
  storageBucket: 'moenamaindb.appspot.com',
  messagingSenderId: '427343243507'
};

@NgModule({
  declarations: [
    AppComponent,
    NuevoIngresoRelojComponent,
    NavbarComponent,
    BusquedaComponent,
    LoginComponent,
    MainComponent,
    WorkerRegComponent,
    SnackbarComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {

}
