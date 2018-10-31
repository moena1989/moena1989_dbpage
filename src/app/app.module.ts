import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NuevoIngresoRelojComponent} from './nuevo-ingreso-reloj/nuevo-ingreso-reloj.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule, Routes} from '@angular/router';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {BusquedaComponent} from './busqueda/busqueda.component';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {WorkerRegComponent} from './worker-reg/worker-reg.component';
import {SnackbarComponent} from './snackbar/snackbar.component';
import {AuthGuardService} from './auth-guard.service';
import {RegistroComponent} from './registro/registro.component';
import {RelojBuscadoComponent} from './reloj-buscado/reloj-buscado.component';


const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sign_up', component: WorkerRegComponent},
  {
    path: '', component: MainComponent, canActivate: [AuthGuardService], children: [
      {path: 'buscar', component: BusquedaComponent},
      {
        path: 'registro', component: RegistroComponent, children:
          [{path: 'reloj', component: NuevoIngresoRelojComponent}]
      },
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
    SnackbarComponent,
    RegistroComponent,
    RelojBuscadoComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
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
