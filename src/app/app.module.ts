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
import {AuthGuardService} from './_services/auth-guard.service';
import {RegistroComponent} from './registro/registro.component';
import {RelojBuscadoComponent} from './reloj-buscado/reloj-buscado.component';
import {MSelectComponent} from './m-select/m-select.component';
import {TstComponent} from './tst/tst.component';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {VisualizerComponent} from './visualizer/visualizer.component';
import {NgxSmartModalModule, NgxSmartModalService} from 'ngx-smart-modal';
import {CurrentStorageService} from './_services/current-storage.service';
import {HomeComponent} from './home/home.component';

// import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// ng build --prod --base-href https://moena1989.github.io/moena_reg_page/
// npx ngh --dir=dist/moena1989

const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'tst', component: TstComponent},
  {path: 'sign_up', component: WorkerRegComponent},
  {
    path: '', component: MainComponent, canActivate: [AuthGuardService], children: [
      {path: '', component: HomeComponent},
      {path: 'busqueda', component: BusquedaComponent},
      {
        path: 'registro', component: RegistroComponent, children:
          [{path: 'reloj', component: NuevoIngresoRelojComponent}]
      },
    ]
  }
];


// REAL DATABASE
// const config = {
//   apiKey: 'AIzaSyAh48TUW_EdI6fI6om3EMRCdlCC4U3n9U8',
//   authDomain: 'moenamaindb.firebaseapp.com',
//   databaseURL: 'https://moenamaindb.firebaseio.com',
//   projectId: 'moenamaindb',
//   storageBucket: 'moenamaindb.appspot.com',
//   messagingSenderId: '427343243507'
// };

// TEST DATABASE
const config = {
  apiKey: 'AIzaSyD3mN3H_wzfhYtDsyzb0N4ToVI22Wdu4ME',
  authDomain: 'moenadbtst.firebaseapp.com',
  databaseURL: 'https://moenadbtst.firebaseio.com',
  projectId: 'moenadbtst',
  storageBucket: 'moenadbtst.appspot.com',
  messagingSenderId: '574556298528'
};

// var
// s
// s
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
    RelojBuscadoComponent,
    MSelectComponent, TstComponent, VisualizerComponent,HomeComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule, AngularFireStorageModule,
    BrowserModule, FormsModule, NgxSmartModalModule.forRoot()
  ],
  providers: [NgxSmartModalService, CurrentStorageService],
  bootstrap: [AppComponent]
})
export class AppModule {

}
